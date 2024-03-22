/* eslint-disable consistent-return */
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import firebase from 'firebase';
import Cookies from 'js-cookie';
import { custDataNameCookie, expiredToken, features } from '@config';
import { useQuery, useReactiveVar } from '@apollo/client';

import { getAppEnv } from '@helpers/env';
import { getLastPathWithoutLogin, setLogin } from '@helper_auth';
import { getCartId, setCartId } from '@helper_cartid';
import { getCookies, setCookies } from '@helper_cookies';
import { regexEmail, regexPhone } from '@helper_regex';
import Layout from '@layout';

import {
    getCustomerCartId,
    getSigninMethodSocialLogin,
    getToken,
    getTokenOtp,
    getTokenPhoneEmail,
    mergeCart as mutationMergeCart,
    otpConfig as queryOtpConfig,
    removeToken as deleteToken,
    socialLogin,
    requestOtpLogin,
} from '@core_modules/login/services/graphql';
import { getCustomer } from '@core_modules/login/services/graphql/schema';
import { assignCompareListToCustomer } from '@core_modules/productcompare/service/graphql';
import { loginConfig } from '@services/graphql/repository/pwa_config';
import { localCompare } from '@services/graphql/schema/local';
import { priceVar } from '@core/services/graphql/cache';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const Message = dynamic(() => import('@common_toast'), { ssr: false });
const appEnv = getAppEnv();

const Login = (props) => {
    const {
        t, storeConfig, query, lastPathNoAuth, Content, pageConfig,
    } = props;
    const config = {
        ...pageConfig,
        title: t('login:login'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('login:login'),
        headerBackIcon: 'close',
        bottomNav: false,
        tagSelector: 'swift-page-login',
    };
    // state
    const [showOtp, setShowOtp] = React.useState(false);
    const [manySendOtp, setManySendOtp] = React.useState(0);
    const [time, setTime] = React.useState(0);

    const [isRevokeToken, setRevokeToken] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [cusIsLogin, setIsLogin] = React.useState(0);
    const [disabled, setDisabled] = React.useState(true);
    const [activeTabs, setActiveTabs] = React.useState(0);

    const [state, setState] = React.useState({
        toastMessage: {
            open: true,
            variant: 'error',
            text: t('validate:guest:wrong'),
        },
        backdropLoader: false,
    });

    const phonePassword = storeConfig.login_phone_password;
    const recaptchaRef = useRef();

    // gql
    const [deleteTokenGql] = deleteToken();
    const [getCustomerToken] = getToken();
    const [getCustomerTokenOtp] = getTokenOtp();
    const [getCustomerTokenPhoneEmail] = getTokenPhoneEmail();

    const cartData = getCustomerCartId({
        skip: !cusIsLogin,
    });
    const [mergeCart] = mutationMergeCart();
    const [mergeCompareProduct, { client }] = assignCompareListToCustomer();

    const [actSocialLogin] = socialLogin();

    // otp
    const [actRequestOtpLogin] = requestOtpLogin();

    // get login method social login
    const socialLoginMethod = getSigninMethodSocialLogin();
    const otpConfig = queryOtpConfig();
    const custData = useQuery(getCustomer, {
        context: {
            request: 'internal',
        },
        skip: !cusIsLogin,
        fetchPolicy: 'no-cache',
    });

    // cache price
    const cachePrice = useReactiveVar(priceVar);

    let cartId = '';
    const handleCloseMessage = () => {
        setState({
            ...state,
            toastMessage: {
                ...state.toastMessage,
                open: false,
            },
        });
    };
    let toastMessage = '';
    if (typeof window !== 'undefined') {
        const res = window.location.href.split('&');
        if (res[1]) {
            const error = res[1].split('error=');
            if (error[1]) {
                toastMessage = (
                    <Message
                        open={state.toastMessage.open}
                        variant={state.toastMessage.variant}
                        setOpen={handleCloseMessage}
                        message={state.toastMessage.text}
                    />
                );
            }
        }
    }
    let redirectLastPath = lastPathNoAuth;
    const expired = storeConfig?.oauth_access_token_lifetime_customer
        ? new Date(Date.now() + parseInt(storeConfig?.oauth_access_token_lifetime_customer, 10) * 3600000)
        : expiredToken;

    if (typeof window !== 'undefined') {
        cartId = getCartId();
        if (lastPathNoAuth === '' || !lastPathNoAuth) {
            redirectLastPath = getLastPathWithoutLogin();
        }
    }

    // enable recaptcha
    let enableRecaptcha = false;

    const { loading: loadingLoginConfig, data: dataLoginConfig } = loginConfig();
    if (!loadingLoginConfig && dataLoginConfig && dataLoginConfig.storeConfig && dataLoginConfig.storeConfig.pwa) {
        if (dataLoginConfig.storeConfig.pwa.recaptcha_login_enable !== null) {
            enableRecaptcha = storeConfig?.pwa?.recaptcha_enable && dataLoginConfig.storeConfig.pwa.recaptcha_login_enable;
        }
    }

    let socialLoginMethodData = [];
    if (
        socialLoginMethod.data
        && socialLoginMethod.data.getSigninMethodSocialLogin
        && socialLoginMethod.data.getSigninMethodSocialLogin.signin_method_allowed
        && socialLoginMethod.data.getSigninMethodSocialLogin.signin_method_allowed !== ''
    ) {
        socialLoginMethodData = socialLoginMethod.data.getSigninMethodSocialLogin.signin_method_allowed.split(',');
    }

    let sitekey;

    if (appEnv === 'local') {
        sitekey = dataLoginConfig?.storeConfig.pwa.recaptcha_site_key_local;
    } else if (appEnv === 'dev') {
        sitekey = dataLoginConfig?.storeConfig.pwa.recaptcha_site_key_dev;
    } else if (appEnv === 'stage') {
        sitekey = dataLoginConfig?.storeConfig.pwa.recaptcha_site_key_stage;
    } else if (appEnv === 'prod') {
        sitekey = dataLoginConfig?.storeConfig.pwa.recaptcha_site_key_prod;
    }

    const handleSend = (phoneNumber) => {
        const configSendOtp = {
            maxLength: otpConfig?.data?.otpConfig?.otp_length?.[0]?.length_otp_login || 4,
            maxTry: otpConfig?.data?.otpConfig?.otp_max_try?.[0]?.max_try_otp_login || 3,
            expired: otpConfig?.data?.otpConfig?.otp_expired_time?.[0]?.expired_time_otp_login || 60,
        };

        window.backdropLoader(true);
        actRequestOtpLogin({
            variables: {
                phoneNumber,
            },
        })
            .then(() => {
                setShowOtp(true);
                window.backdropLoader(false);
                setManySendOtp(manySendOtp + 1);
                // eslint-disable-next-line no-nested-ternary
                setTime(configSendOtp && configSendOtp.expired ? configSendOtp.expired : 60);
                window.toastMessage({
                    open: true,
                    text: t('otp:sendSuccess'),
                    variant: 'success',
                });
            })
            .catch((e) => {
                window.backdropLoader(false);
                if (e.message === 'phone number is already Registered') {
                    window.toastMessage({
                        open: true,
                        text: `${t('otp:registerOtpFailed', { phoneNumber })}`,
                        variant: 'error',
                    });
                } else if (e.message === 'Max retries exceeded') {
                    window.toastMessage({
                        open: true,
                        text: `${t('otp:registerOtpTooManyRetries', { phoneNumber })}`,
                        variant: 'error',
                    });
                } else {
                    window.toastMessage({
                        open: true,
                        text: e.message.split(':')[1] || t('otp:sendFailed'),
                        variant: 'error',
                    });
                }
            });
    };

    const handleSubmit = (formOtp, variables) => {
        let getTokenCustomer;
        if (formOtp === 'otp') {
            getTokenCustomer = getCustomerTokenOtp;
        } else if (formOtp === 'password') {
            getTokenCustomer = getCustomerToken;
        } else if (formOtp === 'phoneEmail') {
            getTokenCustomer = getCustomerTokenPhoneEmail;
        }
        setDisabled(true);
        setLoading(true);
        window.backdropLoader(true);
        const sendData = (data) => {
            getTokenCustomer({
                variables: data,
            })
                .then(async (res) => {
                    let is_login = false;
                    if (formOtp === 'otp') {
                        is_login = res.data.internalGenerateCustomerTokenOtp.is_login;
                    } else if (formOtp === 'password') {
                        is_login = res.data.internalGenerateCustomerToken.is_login;
                    } else if (formOtp === 'phoneEmail') {
                        is_login = res.data.internalGenerateCustomerTokenCustom.is_login;
                    }
                    if (is_login) {
                        setLogin(1, expired);
                        await setIsLogin(1);
                    } else {
                        setDisabled(false);
                        setLoading(false);
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: t('login:failed'),
                        });
                    }
                })
                .catch((e) => {
                    setDisabled(false);
                    setLoading(false);
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[0] || t('login:failed'),
                    });
                });
        };
        if (enableRecaptcha) {
            fetch('/captcha-validation', {
                method: 'post',
                body: JSON.stringify({
                    response: variables.captcha,
                }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((data) => data.json())
                .then((json) => {
                    if (json.success) {
                        sendData(variables);
                    } else {
                        setDisabled(false);
                        setLoading(false);
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: t('register:failed'),
                        });
                    }
                })
                .catch(() => {
                    setDisabled(false);
                    setLoading(false);
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: t('common:error:fetchError'),
                    });
                });

            recaptchaRef.current.reset();
        } else {
            sendData(variables);
        }
    };

    // validation schema
    const LoginSchema = Yup.object().shape({
        username: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        password: Yup.string().required(t('validate:password:required')),
        captcha: enableRecaptcha && Yup.string().required(t('validate:captcha:required')),
    });

    const LoginPhoneEmailSchema = Yup.object().shape({
        username:
            otpConfig.data && otpConfig.data.otpConfig.otp_enable && otpConfig.data.otpConfig.otp_enable[0].enable_otp_login
                ? Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required'))
                : Yup.string()
                    .required(t('validate:phoneEmail:required'))
                    .test('phoneEmail', t('validate:phoneEmail:wrong'), (value) => {
                        const emailRegex = regexEmail.test(value);
                        const phoneRegex = regexPhone.test(value);
                        if (!emailRegex && !phoneRegex) {
                            return false;
                        }
                        return true;
                    }),
        password: Yup.string().required(t('validate:password:required')),
        captcha: enableRecaptcha && Yup.string().required(t('validate:captcha:required')),
    });

    const LoginOtpSchema = Yup.object().shape({
        username: Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        otp: showOtp && Yup.number().required('Otp is required'),
        captcha: enableRecaptcha && Yup.string().required(t('validate:captcha:required')),
    });

    // formik
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            captcha: '',
        },
        validateOnMount: true,
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            const variables = {
                username: values.username,
                password: values.password,
                captcha: values.captcha,
            };
            handleSubmit('password', variables);
        },
    });

    const formikPhoneEmail = useFormik({
        initialValues: {
            username: '',
            password: '',
            captcha: '',
        },
        validateOnMount: true,
        validationSchema: LoginPhoneEmailSchema,
        onSubmit: (values) => {
            const variables = {
                username: values.username,
                password: values.password,
                captcha: values.captcha,
            };
            handleSubmit('phoneEmail', variables);
        },
    });

    const formikOtp = useFormik({
        initialValues: {
            username: '',
            otp: '',
            captcha: '',
        },
        validateOnMount: true,
        validationSchema: LoginOtpSchema,
        onSubmit: (values) => {
            const variables = {
                username: values.username,
                otp: values.otp,
                captcha: values.captcha,
            };
            if (showOtp) {
                handleSubmit('otp', variables);
            } else {
                handleSend(values.username);
            }
        },
    });

    const handleChangeCaptcha = (value) => {
        formik.setFieldValue('captcha', value || '');
        formikOtp.setFieldValue('captcha', value || '');
        formikPhoneEmail.setFieldValue('captcha', value || '');
    };

    React.useEffect(() => {
        if (cartData.data && custData.data && cartData.data.customerCart && cartData.data.customerCart && cartData.data.customerCart.id) {
            Cookies.set(custDataNameCookie, {
                email: custData.data.customer.email,
                firstname: custData.data.customer.firstname,
                lastname: custData.data.customer.lastname,
                customer_group: custData.data.customer.customer_group,
                phonenumber: custData.data.customer.phonenumber,
                is_phonenumber_valid: custData.data.customer.is_phonenumber_valid,
            });
            const isCustHasAddress = !!custData.data.customer.default_shipping && !!custData.data.customer.default_shipping;
            setCookies('is_cust_address', isCustHasAddress);
            const uid_product = getCookies('uid_product_compare');
            const custCartId = cartData.data.customerCart.id;
            if (uid_product) {
                mergeCompareProduct({
                    variables: {
                        uid: uid_product,
                    },
                })
                    .then((res) => {
                        setCookies('uid_product_compare', res.data.assignCompareListToCustomer.compare_list.uid);
                        client.writeQuery({
                            query: localCompare,
                            data: {
                                item_count: res.data.assignCompareListToCustomer.compare_list.item_count,
                                items: res.data.assignCompareListToCustomer.compare_list.items,
                            },
                        });
                    })
                    .catch(() => {
                        //
                    });
            }
            if (cartId === '' || !cartId) {
                setCartId(custCartId, expired);
                if (Object.keys(cachePrice).length > 0) {
                    priceVar({});
                }
                setDisabled(false);
                window.backdropLoader(false);
                window.toastMessage({ open: true, variant: 'success', text: t('login:success') });
                if (query && query.redirect) {
                    setTimeout(() => {
                        Router.push(query.redirect);
                    }, 1500);
                } else if (redirectLastPath && redirectLastPath !== '') {
                    Router.push(redirectLastPath);
                } else {
                    Router.push('/customer/account');
                }
            } else if (cartId !== custCartId) {
                mergeCart({
                    variables: {
                        sourceCartId: cartId,
                        destionationCartId: custCartId,
                    },
                })
                    .then(async (res) => {
                        await setCartId(res.data.mergeCarts.id, expired);
                        await setDisabled(false);
                        window.backdropLoader(false);
                        window.toastMessage({ open: true, variant: 'success', text: t('login:success') });
                        setTimeout(() => {
                            if (query && query.redirect) {
                                Router.push(query.redirect);
                            } else if (redirectLastPath && redirectLastPath !== '') {
                                Router.push(redirectLastPath);
                            } else {
                                Router.push('/customer/account');
                            }
                        }, 1500);
                    })
                    .catch(() => {});
            } else if (query && query.redirect) {
                Router.push(query.redirect);
            } else if (redirectLastPath && redirectLastPath !== '') {
                Router.push(redirectLastPath);
            }
        }

        if (cartData.error || custData.error) {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('login:failed'),
            });
        }
    }, [cartData, custData]);

    React.useEffect(() => {
        if (!time) return;
        const intervalId = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        // eslint-disable-next-line consistent-return
        return () => clearInterval(intervalId);
    }, [time]);

    // handle revoke token
    React.useEffect(() => {
        if (!isRevokeToken && typeof window !== 'undefined') {
            setRevokeToken(true);
            deleteTokenGql();
        }
    }, [isRevokeToken]);

    // Disable login button
    React.useEffect(() => {
        let activeFormik;
        switch (activeTabs) {
        case 0:
            activeFormik = phonePassword !== false ? formikPhoneEmail : formik; break;
        default:
            activeFormik = formikOtp; break;
        }

        if (Object.keys(activeFormik.errors).length > 0) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [formik.errors, formikPhoneEmail.errors, formikOtp.errors, activeTabs, otpConfig]);

    // Listen to the Firebase Auth state and set the local state.
    React.useEffect(() => {
        if (publicRuntimeConfig && publicRuntimeConfig?.firebaseApiKey !== '') {
            if (!firebase.apps.length) {
                firebase.initializeApp({
                    ...features.firebase.config,
                    apiKey: publicRuntimeConfig?.firebaseApiKey,
                });
            } else {
                firebase.app(); // if already initialized, use that one
            }
            try {
                const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
                    if (firebase.auth().currentUser) {
                        const fullname = user.displayName.split(' ');
                        const firstName = fullname[0];
                        let lastName = '';
                        const { email } = user;
                        fullname.forEach((entry) => {
                            // eslint-disable-next-line eqeqeq
                            if (entry != firstName) {
                                lastName += `${entry} `;
                            }
                        });
                        firebase
                            .auth()
                            .currentUser.getIdToken(true)
                            .then((u) => {
                                setDisabled(true);
                                setLoading(true);
                                window.backdropLoader(true);
                                actSocialLogin({
                                    variables: {
                                        email,
                                        socialtoken: u,
                                        firstname: firstName,
                                        lastname: lastName,
                                    },
                                })
                                    .then(async () => {
                                        setLogin(1, expired);
                                        await setIsLogin(1);
                                    })
                                    .catch((e) => {
                                        setDisabled(false);
                                        setLoading(false);
                                        window.backdropLoader(false);
                                        window.toastMessage({
                                            open: true,
                                            variant: 'error',
                                            text: e.message.split(':')[0] || t('login:failed'),
                                        });
                                    });
                            });
                    }
                });
                return () => unregisterAuthObserver();
            } catch {
                return () => {};
            }
        }
    }, []);

    return (
        <Layout {...props} pageConfig={config}>
            <Content
                formik={formik}
                formikOtp={formikOtp}
                formikPhoneEmail={formikPhoneEmail}
                otpConfig={otpConfig}
                t={t}
                loading={loading}
                toastMessage={toastMessage}
                socialLoginMethodLoading={socialLoginMethod.loading}
                socialLoginMethodData={socialLoginMethodData}
                enableRecaptcha={enableRecaptcha}
                sitekey={sitekey}
                handleChangeCaptcha={handleChangeCaptcha}
                recaptchaRef={recaptchaRef}
                query={query}
                phonePassword={phonePassword}
                showOtp={showOtp}
                setShowOtp={setShowOtp}
                handleSend={handleSend}
                disabled={disabled}
                setDisabled={setDisabled}
                activeTabs={activeTabs}
                setActiveTabs={setActiveTabs}
            />
        </Layout>
    );
};

export default Login;
