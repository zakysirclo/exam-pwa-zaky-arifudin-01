import { custDataNameCookie } from '@config';
import {
    getCustomer,
    changeCustomerPassword as gqlChangeCustomerPassword,
    updateCustomerProfile as gqlUpdateCustomer,
} from '@core_modules/customer/services/graphql';
import { regexPhone } from '@helper_regex';
import Layout from '@layout';
import CustomerLayout from '@layout_customer';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import * as Yup from 'yup';

const ProfilePage = (props) => {
    const {
        data, error, loading, Content, t, Skeleton,
    } = props;

    if (loading) {
        return (
            <CustomerLayout {...props}>
                <Skeleton />
            </CustomerLayout>
        );
    }
    if (error) return <p>{`Error: ${error.message}`}</p>;
    if (!data) return null;

    const [updateCustomer, updateCustomerStatus] = gqlUpdateCustomer();
    const [changeCustomerPassword, changeCustomerPasswordStatus] = gqlChangeCustomerPassword();
    const [editEmail, setEditEmail] = React.useState(false);
    const [editPass, setEditPass] = React.useState(false);
    const [phoneIsWa, setPhoneIsWa] = React.useState(false);

    const ProfileSchema = Yup.object().shape({
        email: editEmail && Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        firstName: Yup.string().required(t('validate:firstName:required')),
        lastName: Yup.string().required(t('validate:lastName:required')),
        phonenumber: Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        whatsapp_number: Yup.string().required(t('validate:whatsappNumber:required')).matches(regexPhone, t('validate:whatsappNumber:wrong')),
        currentPassword: (editEmail || editPass) && Yup.string().required(t('validate:password:required')),
        password: editPass && Yup.string().required(t('validate:password:required')),
        confirmPassword:
            editPass
            && Yup.string()
                .required(t('validate:confirmPassword:required'))
                .test(
                    'check-pass',
                    t('validate:confirmPassword.wrong'),
                    // eslint-disable-next-line no-use-before-define
                    (input) => input === formik.values.password,
                ),
    });

    const formik = useFormik({
        initialValues: {
            firstName: data.firstname,
            lastName: data.lastname,
            phonenumber: data.phonenumber || '',
            whatsapp_number: data.whatsapp_number || '',
            email: data.email,
            currentPassword: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: ProfileSchema,
        onSubmit: async (values, { setSubmitting, setFieldValue }) => {
            if (!updateCustomerStatus.loading && !changeCustomerPasswordStatus.loading) {
                window.backdropLoader(true);
                await updateCustomer({
                    variables: {
                        firstname: values.firstName,
                        lastname: values.lastName,
                        email: editEmail ? values.email : data.email,
                        password: values.currentPassword,
                        phonenumber: values.phonenumber,
                        whatsapp_number: values.whatsapp_number,
                    },
                })
                    .then(async (res) => {
                        if (res && res.data && res.data.updateCustomerCustom && res.data.updateCustomerCustom.customer) {
                            const { customer } = res.data.updateCustomerCustom;
                            Cookies.set(custDataNameCookie, {
                                email: customer.email,
                                firstname: customer.firstname,
                                customer_group: customer.customer_group,
                                phonenumber: customer.phonenumber,
                                is_phonenumber_valid: customer.is_phonenumber_valid,
                            });
                        }
                        if (editEmail) {
                            setFieldValue('currentPassword', '', false);
                        }
                        if (editPass) {
                            await changeCustomerPassword({
                                variables: {
                                    currentPassword: values.currentPassword,
                                    newPassword: values.password,
                                },
                            });
                            setFieldValue('currentPassword', '', false);
                            setFieldValue('password', '', false);
                            setFieldValue('confirmPassword', '', false);
                        }
                        setEditEmail(false);
                        setEditPass(false);
                        setSubmitting(false);
                        window.backdropLoader(false);
                        window.toastMessage({ variant: 'success', open: true, text: t('customer:profile:successUpdate') });
                    })
                    .catch((e) => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            variant: 'error',
                            open: true,
                            text: e.message ? e.message.split(':')[0] : t('common:error:fetchError'),
                        });
                    });
            }
        },
    });

    const handleWa = () => {
        if (phoneIsWa === false) {
            // eslint-disable-next-line no-use-before-define
            formik.setFieldValue('whatsapp_number', formik.values.phonenumber);
        } else {
            formik.setFieldValue('whatsapp_number', '');
        }
        setPhoneIsWa(!phoneIsWa);
    };

    const handleChangePhone = (event) => {
        const value = event ?? '';
        if (phoneIsWa) {
            formik.setFieldValue('whatsapp_number', value);
        }
        formik.setFieldValue('phonenumber', value);
    };

    const handleChangeWa = (event) => {
        const value = event ?? '';

        formik.setFieldValue('whatsapp_number', value);
    };

    useEffect(() => {
        // init handle checklist WA
        if (data?.phonenumber) {
            if (data.phonenumber === data.whatsapp_number) {
                formik.setFieldValue('whatsapp_number', formik.values.phonenumber);
                setPhoneIsWa(true);
            }
        }
    }, [data]);

    return (
        <Content
            t={t}
            loading={loading}
            error={error}
            data={data}
            formik={formik}
            handleChangePhone={handleChangePhone}
            handleWa={handleWa}
            phoneIsWa={phoneIsWa}
            setEditEmail={setEditEmail}
            editEmail={editEmail}
            handleChangeWa={handleChangeWa}
            setEditPass={setEditPass}
            editPass={editPass}
            updateCustomerStatus={updateCustomerStatus}
            changeCustomerPasswordStatus={changeCustomerPasswordStatus}
        />
    );
};

const Profile = (props) => {
    const { t, storeConfig } = props;
    const config = {
        title: t('customer:profile:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:profile:title'),
        bottomNav: false,
        tagSelector: 'swift-page-accountinfo',
    };

    const { error, loading, data } = getCustomer(storeConfig);

    return (
        <Layout pageConfig={config} {...props}>
            <ProfilePage {...props} loading={loading} data={data && data.customer ? data.customer : null} error={error} />
        </Layout>
    );
};

export default Profile;
