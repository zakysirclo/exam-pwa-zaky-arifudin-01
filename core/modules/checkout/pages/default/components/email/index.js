import React, { useState } from 'react';
import gqlService from '@core_modules/checkout/services/graphql';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCheckoutState, setCheckoutData,
} from '@core_modules/checkout/redux/checkoutSlice';

const Email = (props) => {
    const {
        EmailView,
        formik,
        handleOpenMessage,
        t,
        cartId,
    } = props;

    const dispatch = useDispatch();
    const checkout = useSelector(selectCheckoutState);

    const [anchorEl, setAnchorEl] = useState(null);
    const [setGuestEmailAddressOnCart] = gqlService.setGuestEmailAddressOnCart(({ onError: () => {} }));
    const [load, setLoad] = useState(false);
    const open = Boolean(anchorEl);
    const id = open ? 'email-helper' : undefined;

    const handleBlur = async () => {
        formik.setFieldTouched('email', true);
        if (formik.values.email !== formik.values.oldEmail && !formik.errors.email) {
            const idCart = checkout && checkout.data && checkout.data.cart && checkout.data.cart.id;
            setLoad(true);
            const result = await setGuestEmailAddressOnCart({
                variables: {
                    cartId: idCart ? checkout.data.cart.id : cartId,
                    email: formik.values.email,
                },
            });
            if (!result || result.errors) {
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:problemConnection'),
                });
                setLoad(false);
            } else {
                await formik.setFieldValue('oldEmail', formik.values.email);
                if (result.data && result.data.setGuestEmailAddressOnCart && result.data.setGuestEmailAddressOnCart) {
                    dispatch(setCheckoutData({
                        cart: {
                            ...checkout.data.cart,
                            ...result.data.setGuestEmailOnCart.cart,
                        },
                    }));
                }
                setLoad(false);
            }
        }
    };

    const content = (
        <EmailView
            {...props}
            idButton={id}
            open={open}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            handleBlur={handleBlur}
            load={load}
            loadingAll={checkout?.loading?.all}
        />
    );

    return checkout.data.isGuest ? content : null;
};

export default Email;
