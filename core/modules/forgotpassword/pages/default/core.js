import React, { useRef } from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { regexPhone, regexEmail } from '@helper_regex';
import * as Yup from 'yup';
import Router from 'next/router';
import { getAppEnv } from '@helpers/env';
import { requestLinkToken, otpConfig } from '../../services/graphql';

const appEnv = getAppEnv();

const ForgotPassword = (props) => {
    const { t, storeConfig, Content } = props;
    const config = {
        title: t('forgotpassword:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('forgotpassword:title'),
        bottomNav: false,
        tagSelector: 'swift-page-forgotpassword',
    };
    const forgotWithPhone = storeConfig.forgot_password_phone;
    const [useEmail, setUseEmail] = React.useState(false);
    const [useForgotWithPhone, setUseForgotWithPhone] = React.useState(forgotWithPhone);
    const { loading, data } = otpConfig();
    const [load, setLoad] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);
    const [isEmailSent, setIsEmailSent] = React.useState(false);
    const [getToken] = requestLinkToken();

    const recaptchaRef = useRef();
    const enableRecaptcha = storeConfig?.pwa?.recaptcha_enable;

    let sitekey;

    if (appEnv === 'local') {
        sitekey = storeConfig?.pwa?.recaptcha_site_key_local;
    } else if (appEnv === 'dev') {
        sitekey = storeConfig?.pwa?.recaptcha_site_key_dev;
    } else if (appEnv === 'stage') {
        sitekey = storeConfig?.pwa?.recaptcha_site_key_stage;
    } else if (appEnv === 'prod') {
        sitekey = storeConfig?.pwa?.recaptcha_site_key_prod;
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: '',
            phoneNumber: '',
            phoneNumberEmail: '',
            captcha: '',
        },
        validateOnMount: true,
        isInitialValid: false,
        validationSchema: Yup.object().shape({
            email: useEmail && Yup.string()
                .email(t('validate:email:wrong'))
                .required(t('validate:email:required')),
            phoneNumberEmail:
                useForgotWithPhone
                && !data.otpConfig.otp_enable[0].enable_otp_forgot_password
                && Yup.string()
                    .required(t('validate:phoneEmail:required'))
                    .test('phoneEmail', t('validate:phoneEmail:wrong'), (value) => {
                        const emailRegex = regexEmail.test(value);
                        const phoneRegex = regexPhone.test(value);
                        if (!emailRegex && !phoneRegex) {
                            return false;
                        }
                        return true;
                    }),
            phoneNumber:
                !useEmail
                && !useForgotWithPhone
                && data
                && data.otpConfig.otp_enable[0].enable_otp_forgot_password
                && Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
            otp:
                !useEmail
                && !useForgotWithPhone
                && data
                && data.otpConfig.otp_enable[0].enable_otp_forgot_password
                && Yup.string().required('Otp is required'),
            captcha: enableRecaptcha && Yup.string().required(t('validate:captcha:required')),
        }),
        onSubmit: (values) => {
            setLoad(true);

            let email;
            let phone;

            if (useForgotWithPhone) {
                email = values.phoneNumberEmail;
                phone = values.phoneNumberEmail;
            } else {
                email = values.email;
                phone = values.phoneNumber;
            }

            const getVariables = () => {
                if (useForgotWithPhone) {
                    if (regexEmail.test(values.phoneNumberEmail) && !regexPhone.test(values.phoneNumberEmail)) {
                        return { phoneNumber: '', otp: '', email: values.phoneNumberEmail };
                    }

                    return { phoneNumber: values.phoneNumberEmail, otp: '', email: '' };
                }
                if (useEmail) {
                    return { phoneNumber: '', otp: '', email: values.email };
                }
                return { phoneNumber: values.phoneNumber, otp: values.otp, email: '' };
            };
            getToken({
                variables: getVariables(),
            })
                .then((res) => {
                    setLoad(false);
                    const { token, message } = res.data.requestLinkForgotPassword;

                    if (token) {
                        window.toastMessage({
                            open: true,
                            text: `${t('forgotpassword:successPhone', { phone })}`,
                            variant: 'success',
                        });
                        setTimeout(() => {
                            Router.push(`/customer/account/createPassword?token=${token}`);
                        }, 3000);
                    } else if (message === 'Email is not registered.') {
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: `${t('forgotpassword:failedEmail', { email })}`,
                        });
                    } else {
                        setIsEmailSent(true);
                    }
                })
                .catch((e) => {
                    if (e.message === 'phone number is not registered.') {
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: t('forgotpassword:failedPhone', { phone }),
                        });
                    } else {
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: e.message.split(':')[1] || t('forgotpassword:failed'),
                        });
                    }
                    setLoad(false);
                });
        },
    });

    const handleSwitch = () => {
        setUseEmail(!useEmail);
        if (data && data.otpConfig.otp_enable[0].enable_otp_forgot_password) {
            setDisabled(!disabled);
        }
    };
    const handleChangePhone = (event) => {
        const value = event;

        formik.setFieldValue('phoneNumber', value);
    };
    React.useEffect(() => {
        if (data && !data?.otpConfig?.otp_enable?.[0]?.enable_otp_forgot_password && !useForgotWithPhone) {
            setUseEmail(true);
        } else if (data && data?.otpConfig?.otp_enable?.[0]?.enable_otp_forgot_password) {
            setUseForgotWithPhone(false);
        }
    }, [data, useForgotWithPhone]);

    const handleChangeCaptcha = (value) => {
        formik.setFieldValue('captcha', value || '');
    };

    // Disable submit button
    React.useEffect(() => {
        if (Object.keys(formik.errors).length > 0 || !formik.isValid) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [formik, useEmail, useForgotWithPhone]);

    return (
        <Layout pageConfig={config} {...props}>
            <Content
                t={t}
                loading={loading}
                data={data}
                formik={formik}
                load={load}
                useEmail={useEmail}
                handleSwitch={handleSwitch}
                handleChangePhone={handleChangePhone}
                setDisabled={setDisabled}
                disabled={disabled}
                useForgotWithPhone={useForgotWithPhone}
                enableRecaptcha={enableRecaptcha}
                sitekey={sitekey}
                handleChangeCaptcha={handleChangeCaptcha}
                recaptchaRef={recaptchaRef}
                isEmailSent={isEmailSent}
            />
        </Layout>
    );
};

export default ForgotPassword;
