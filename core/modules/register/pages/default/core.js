/* eslint-disable object-curly-newline */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { useQuery, useMutation } from '@apollo/client';
import { custDataNameCookie, expiredToken } from '@config';
import { getLastPathWithoutLogin, setEmailConfirmationFlag, setLogin } from '@helper_auth';
import { getCartId, setCartId } from '@helper_cartid';
import Layout from '@layout';
import Cookies from 'js-cookie';
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import Router from 'next/router';
import * as Yup from 'yup';
import { getAppEnv } from '@helpers/env';
import { regexPhone } from '@helper_regex';
import {
    getCustomerCartId,
    getGuestCustomer,
    mergeCart as mutationMergeCart,
    otpConfig as queryOtpConfig,
    register,
} from '@core_modules/register/services/graphql';
import { getCustomer, subscribeNewsletter } from '@core_modules/register/services/graphql/schema';
import { requestOtpRegister } from '@core_modules/login/services/graphql';

import { registerConfig } from '@services/graphql/repository/pwa_config';
import { priceVar } from '@core/services/graphql/cache';

const appEnv = getAppEnv();

const Register = (props) => {
    const { t, storeConfig, pageConfig, Content, query, lastPathNoAuth } = props;

    const config = {
        ...pageConfig,
        title: t('register:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('register:title'),
        bottomNav: false,
        tagSelector: 'swift-page-register',
    };
    // enable recaptcha
    let enableRecaptcha = false;

    // cache price
    const cachePrice = priceVar();

    const { loading: loadingRegisterConfig, data: dataRegisterConfig } = registerConfig();
    if (!loadingRegisterConfig && dataRegisterConfig && dataRegisterConfig.storeConfig && dataRegisterConfig.storeConfig.pwa) {
        if (dataRegisterConfig.storeConfig.pwa.recaptcha_register_enable !== null) {
            enableRecaptcha = storeConfig?.pwa?.recaptcha_enable && dataRegisterConfig.storeConfig.pwa.recaptcha_register_enable;
        }
    }

    const [phoneIsWa, setPhoneIsWa] = React.useState(true);
    const [cusIsLogin, setIsLogin] = React.useState(0);
    const [disabled, setDisabled] = React.useState(true);
    const [disabledOtpButton, setDisabledOtpButton] = React.useState(false);
    // state otp
    const [showOtp, setShowOtp] = React.useState(false);
    const [isSubscribed, setIsSubscribed] = React.useState({
        email: '',
        subscribed: false,
    });
    const [getGuest, { data: guestData }] = getGuestCustomer();
    const recaptchaRef = useRef();
    let sitekey;

    if (appEnv === 'local') {
        sitekey = dataRegisterConfig?.storeConfig.pwa.recaptcha_site_key_local;
    } else if (appEnv === 'dev') {
        sitekey = dataRegisterConfig?.storeConfig.pwa.recaptcha_site_key_dev;
    } else if (appEnv === 'stage') {
        sitekey = dataRegisterConfig?.storeConfig.pwa.recaptcha_site_key_stage;
    } else if (appEnv === 'prod') {
        sitekey = dataRegisterConfig?.storeConfig.pwa.recaptcha_site_key_prod;
    }

    let cartId = '';
    const { router } = Router;
    const expired = storeConfig.oauth_access_token_lifetime_customer
        ? new Date(Date.now() + parseInt(storeConfig.oauth_access_token_lifetime_customer, 10) * 3600000)
        : expiredToken;
    const { date_of_birth, gender } = storeConfig;

    let redirectLastPath = lastPathNoAuth;
    if (typeof window !== 'undefined') {
        cartId = getCartId();
        if (lastPathNoAuth === '' || !lastPathNoAuth) {
            redirectLastPath = getLastPathWithoutLogin();
        }
    }
    React.useEffect(() => {
        if (Object.keys(router.query).length !== 0) {
            getGuest({
                variables: {
                    ids: {
                        in: [router.query.order_id],
                    },
                },
            });
        }
    }, [router]);

    const [getCart, cartData] = getCustomerCartId();
    const [mergeCart, { called }] = mutationMergeCart();
    const custData = useQuery(getCustomer, {
        context: {
            request: 'internal',
        },
        skip: !cusIsLogin,
    });
    const otpConfig = queryOtpConfig();

    const enableOtp = otpConfig.data && otpConfig.data.otpConfig.otp_enable[0].enable_otp_register;

    const [sendRegister] = register();
    // otp
    const [actRequestOtpRegister] = requestOtpRegister();

    const [actSubscribe] = useMutation(subscribeNewsletter, {
        context: {
            request: 'internal',
        },
    });

    let configValidation = {
        email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        firstName: Yup.string().required(t('validate:firstName:required')),
        lastName: Yup.string().required(t('validate:lastName:required')),
        password: Yup.string().required(t('validate:password:required')),
        confirmPassword: Yup.string()
            .required(t('validate:confirmPassword:required'))
            // eslint-disable-next-line no-use-before-define
            .test('check-pass', t('validate:confirmPassword.wrong'), (input) => input === formik.values.password),
        phoneNumber: Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        whatsappNumber: Yup.string().required(t('validate:whatsappNumber:required')).matches(regexPhone, t('validate:whatsappNumber:wrong')),
    };

    if (enableOtp) {
        configValidation = {
            ...configValidation,
            otp: showOtp && Yup.number().required('Otp is required'),
        };
    }

    if (enableRecaptcha) {
        configValidation = {
            ...configValidation,
            captcha: Yup.string().required(`Captcha ${t('validate:required')}`),
        };
    }

    if (gender) {
        // prettier-ignore
        configValidation = {
            ...configValidation,
            gender: gender && gender === 'req'
                ? Yup.mixed().nullable().required(t('validate:gender:required')).oneOf([null, 1, 2])
                : Yup.mixed().nullable().oneOf([null, 1, 2]),
        };
    }

    if (date_of_birth) {
        // prettier-ignore
        configValidation = {
            ...configValidation,
            dob: date_of_birth && date_of_birth === 'req'
                ? Yup.string().nullable().required(t('validate:dob:required'))
                : Yup.string().nullable(),
        };
    }

    // handleSend to OTP View
    const handleSend = (phoneNumber) => {
        window.backdropLoader(true);
        actRequestOtpRegister({
            variables: {
                phoneNumber,
            },
        })
            .then(() => {
                setShowOtp(true);
                setDisabledOtpButton(false);
                window.backdropLoader(false);
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

    const RegisterSchema = Yup.object().shape(configValidation);

    const handleSendRegister = (values, resetForm) => {
        if (values.subscribe && values.email) {
            setIsSubscribed({ email: values.email, subscribed: values.subscribe });
        }
        sendRegister({
            variables: values,
        })
            .then(async ({ data }) => {
                resetForm();
                if (data.internalCreateCustomerToken.is_email_confirmation) {
                    setEmailConfirmationFlag({ status: '00', message: t('register:openEmail'), variant: 'success' });
                    window.toastMessage({
                        open: true,
                        text: t('register:openEmail'),
                        variant: 'success',
                    });
                    setTimeout(() => {
                        window.backdropLoader(false);
                        Router.push('/customer/account/login');
                    }, 2000);
                } else {
                    setIsLogin(1);
                    if (Object.keys(cachePrice).length > 0) {
                        priceVar({});
                    }
                    await getCart();
                    window.backdropLoader(false);
                }
                setDisabled(false);
            })
            .catch((e) => {
                setShowOtp(false);
                setDisabled(false);
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[0] || t('register:failed'),
                    variant: 'error',
                });
            });
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            gender: null,
            dob: null,
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            whatsappNumber: '',
            subscribe: false,
            otp: '',
            captcha: '',
        },
        validateOnMount: true,
        validationSchema: RegisterSchema,
        onSubmit: (values, { resetForm }) => {
            setDisabled(true);
            window.backdropLoader(true);
            if (enableOtp && !showOtp) {
                handleSend(values.phoneNumber);
            } else if (enableRecaptcha) {
                fetch('/captcha-validation', {
                    method: 'post',
                    body: JSON.stringify({
                        response: values.captcha,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then((data) => data.json())
                    .then((json) => {
                        if (json.success) {
                            handleSendRegister(values, resetForm);
                        } else {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                variant: 'error',
                                text: t('register:failed'),
                            });
                        }
                    })
                    .catch(() => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: t('common:error:fetchError'),
                        });
                    });

                recaptchaRef.current.reset();
            } else {
                handleSendRegister(values, resetForm);
            }
        },
    });

    const handleChangeCaptcha = (value) => {
        formik.setFieldValue('captcha', value || '');
    };

    const handleWa = () => {
        if (phoneIsWa === false) {
            // eslint-disable-next-line no-use-before-define
            formik.setFieldValue('whatsappNumber', formik.values.phoneNumber);
        } else {
            formik.setFieldValue('whatsappNumber', '');
        }
        setPhoneIsWa(!phoneIsWa);
    };

    const handleChangePhone = (event) => {
        const value = event ?? '';
        if (phoneIsWa === true) {
            formik.setFieldValue('whatsappNumber', value);
        }

        formik.setFieldValue('phoneNumber', value);
    };

    const handleChangeWa = (event) => {
        const value = event ?? '';

        formik.setFieldValue('whatsappNumber', value);
    };

    const handleChangeDate = (date) => {
        formik.setFieldValue('dob', date);
    };

    if (cartData.data && custData.data) {
        if (isSubscribed.email && isSubscribed.subscribed) {
            actSubscribe({
                variables: {
                    email: isSubscribed.email,
                },
            });
        }
        Cookies.set(custDataNameCookie, {
            email: custData.data.customer.email,
            firstname: custData.data.customer.firstname,
            customer_group: custData.data.customer.customer_group,
            phonenumber: custData.data.customer.phonenumber,
            is_phonenumber_valid: custData.data.customer.is_phonenumber_valid,
        });
        const custCartId = cartData.data.customerCart.id;
        if (cartId === '' || !cartId) {
            setLogin(1, expired);
            setCartId(custCartId, expired);
            window.toastMessage({
                open: true,
                text: t('register:success'),
                variant: 'success',
            });
            setTimeout(() => {
                if (query && query.redirect) {
                    Router.replace(query.redirect);
                } else if (redirectLastPath && redirectLastPath !== '') {
                    Router.replace(redirectLastPath);
                } else {
                    Router.replace('/customer/account');
                }
            }, 700);
        } else if (!called && cartId !== custCartId) {
            mergeCart({
                variables: {
                    sourceCartId: cartId,
                    destionationCartId: custCartId,
                },
            })
                .then(() => {
                    setLogin(1, expired);
                    setCartId(custCartId, expired);
                    window.toastMessage({
                        open: true,
                        text: t('register:success'),
                        variant: 'success',
                    });
                    setTimeout(() => {
                        if (query && query.redirect) {
                            Router.replace(query.redirect);
                        } else if (redirectLastPath && redirectLastPath !== '') {
                            Router.replace(redirectLastPath);
                        } else {
                            Router.replace('/customer/account');
                        }
                    }, 700);
                })
                .catch((e) => {
                    setDisabled(false);
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message.split(':')[1] || t('register:failed'),
                        variant: 'error',
                    });
                });
        } else {
            setTimeout(() => {
                if (query && query.redirect) {
                    Router.replace(query.redirect);
                } else if (redirectLastPath && redirectLastPath !== '') {
                    Router.replace(redirectLastPath);
                } else {
                    Router.replace('/customer/account');
                }
            }, 700);
        }
    }

    if (guestData && guestData.ordersFilter && guestData.ordersFilter.data && guestData.ordersFilter.data.length > 0) {
        formik.initialValues.firstName = guestData.ordersFilter.data[0].detail[0].customer_firstname;
        formik.initialValues.lastName = guestData.ordersFilter.data[0].detail[0].customer_lastname;
        formik.initialValues.email = guestData.ordersFilter.data[0].detail[0].customer_email;
    }

    /**
     * Disable register button
     */
    React.useEffect(() => {
        if (Object.keys(formik.errors).length > 0) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [formik.errors, showOtp]);

    const contentProps = {
        ...props,
        showOtp,
        setShowOtp,
        formik,
        enableOtp,
        setDisabled,
        handleChangePhone,
        handleWa,
        phoneIsWa,
        handleChangeWa,
        enableRecaptcha,
        sitekey,
        handleChangeCaptcha,
        disabled,
        recaptchaRef,
        gender,
        dob: date_of_birth,
        handleChangeDate,
        disabledOtpButton,
        setDisabledOtpButton,
    };

    return (
        <Layout pageConfig={config} {...props}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Register;
