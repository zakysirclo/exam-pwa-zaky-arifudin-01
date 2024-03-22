import React from 'react';
import Button from '@common_button';
import TextField from '@common_forms/TextField';
import { regexPhone } from '@helper_regex';
import { useTranslation } from 'next-i18next';
import Dialog from '@common_dialog';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import gqlService from '@core_modules/checkout/services/graphql';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCheckoutState, setCheckoutData, setErrorState, setPickupInformation,
} from '@core_modules/checkout/redux/checkoutSlice';

const ModalPickupInformation = ({
    open,
    setOpen,
}) => {
    const dispatch = useDispatch();
    const checkout = useSelector(selectCheckoutState);

    const { t } = useTranslation(['common', 'checkout', 'validate']);
    const [setPickupStore] = gqlService.setPickupStore();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        person: Yup.string().required(`${t('checkout:pickupInformation:pickupPerson')} ${t('validate:required')}`),
        phoneNumber: Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
    });

    const [loading, setLoading] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            email: checkout.pickupInformation.pickup_person_email || '',
            phoneNumber: checkout.pickupInformation.pickup_person_phone || '',
            person: checkout.pickupInformation.pickup_person_name || '',
        },
        validationSchema,
        onSubmit: async (values) => {
            const pickupInformation = {
                pickup_person_email: values.email,
                pickup_person_name: values.person,
                pickup_person_phone: values.phoneNumber,
            };
            await setLoading(true);
            if (Object.keys(checkout.selectStore).length > 0) {
                await setPickupStore({
                    variables: {
                        cart_id: checkout.data.cart.id,
                        code: checkout.selectStore.code,
                        extension_attributes: pickupInformation,
                        store_address: {
                            city: checkout.selectStore.city,
                            country_code: checkout.selectStore.country_id,
                            name: checkout.selectStore.name,
                            postcode: checkout.selectStore.postcode,
                            region: checkout.selectStore.region,
                            street: [checkout.selectStore.street],
                            telephone: checkout.selectStore.telephone,
                        },
                    },
                }).then(async (res) => {
                    const paymentMethod = res.data.setPickupStore.available_payment_methods.map((method) => ({
                        ...method,
                        label: method.title,
                        value: method.code,
                        image: null,
                    }));

                    dispatch(setCheckoutData({
                        cart: {
                            ...checkout.data.cart,
                            ...res.data.setPickupStore,
                        },
                        paymentMethod,
                    }));

                    dispatch(setPickupInformation(pickupInformation));
                    dispatch(setErrorState({ selectStore: false, pickupInformation: false }));
                    await setLoading(false);
                    setOpen();
                }).catch((err) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: err.message.split(':')[1] || t('checkout:message:serverError'),
                    });
                    setLoading(false);
                });
            } else {
                dispatch(setPickupInformation(pickupInformation));
                dispatch(setErrorState({ selectStore: true }));
                await setLoading(false);
                setOpen();
            }
        },
    });

    return (
        <Dialog
            open={open}
            closeOnBackdrop
            onClose={() => setOpen()}
            onClickCloseTitle={() => setOpen()}
            title={t('checkout:pickupInformation:label')}
            useCloseTitleButton
            content={(
                <>
                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4 py-4 border-t border-neutral-200">
                            <TextField
                                label={t('checkout:pickupInformation:pickupPerson')}
                                name="person"
                                className="w-full"
                                value={formik.values.person}
                                onChange={formik.handleChange}
                                hintProps={{
                                    displayHintText: !!((formik.touched.person && formik.errors.person)),
                                    hintText: formik.errors.person,
                                    hintType: 'error',
                                }}
                                absolute={false}
                            />
                            <TextField
                                label={t('common:form:phoneNumber')}
                                name="phoneNumber"
                                className="w-full"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                hintProps={{
                                    displayHintText: !!((formik.touched.phoneNumber && formik.errors.phoneNumber)),
                                    hintText: formik.errors.phoneNumber,
                                    hintType: 'error',
                                }}
                                absolute={false}
                            />
                            <TextField
                                label="email"
                                name="email"
                                className="w-full"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                hintProps={{
                                    displayHintText: !!((formik.touched.email && formik.errors.email)),
                                    hintText: formik.errors.email,
                                    hintType: 'error',
                                }}
                                absolute={false}
                            />
                        </div>

                        <Button
                            loading={loading}
                            className=""
                            type="submit"
                            classNameText="justify-center"
                        >
                            {t('common:button:save')}
                        </Button>
                    </form>
                </>
            )}
        />
    );
};

export default ModalPickupInformation;
