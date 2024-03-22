/* eslint-disable no-unused-vars */
import { useApolloClient } from '@apollo/client';
import { modules } from '@config';
import gqlService from '@core_modules/checkout/services/graphql';
import View from '@core_modules/paypal/pages/review/components/PlaceOrder/view';
import { removeCartId } from '@helper_cartid';
import { setCheckoutData } from '@helper_cookies';
import { localTotalCart } from '@services/graphql/schema/local';
import React from 'react';

const PlaceOrder = (props) => {
    const {
        checkout, setCheckout, t, config, storeConfig,
    } = props;
    const client = useApolloClient();

    // origin name config
    const originName = modules.checkout.checkoutOnly ? 'pwa-checkout' : 'pwa';

    // eslint-disable-next-line no-unused-vars
    // let paypalData = {};
    // if (typeof window !== 'undefined') {
    //     paypalData = JSON.parse(localStorage.getItem(modules.paypal.keyData));
    // }

    const [placeOrder] = gqlService.placeOrder({ onError: () => {} });

    const handleOpenMessage = async ({ variant, text }) => {
        const state = { ...checkout };
        window.toastMessage({
            open: true,
            variant,
            text,
        });
        setCheckout(state);
    };

    const generatesuccessRedirect = (orderNumber) => {
        if (config && config.successRedirect && config.successRedirect.link) {
            return `${config.successRedirect.link}${config.successRedirect.orderId ? `?orderId=${orderNumber}` : ''}`;
        }
        return '/checkout/onepage/success';
    };

    const handlePlaceOrder = async () => {
        window.backdropLoader(true);
        const { cart } = checkout;
        let state = { ...checkout };

        state.loading.order = true;
        setCheckout(state);

        const result = await placeOrder({ variables: { cartId: cart.id, origin: originName } });

        state = { ...checkout };
        state.loading.order = false;
        setCheckout(state);

        let orderNumber = '';
        let infoMsg = '';
        if (result && result.data && result.data.placeOrder[0] && result.data.placeOrder[0].order && result.data.placeOrder[0].order.order_number) {
            orderNumber = result.data.placeOrder[0].order.order_number;
            infoMsg = result.data.placeOrder[0].infoMsg;
        }
        if (orderNumber && orderNumber !== '') {
            const { email } = cart;
            // if (checkout.isGuest && paypalData && paypalData.details && paypalData.details.payer
            //     && paypalData.details.payer.email_address) {
            //     email = paypalData.details.payer.email_address;
            // }
            setCheckoutData({
                email,
                order_number: orderNumber,
                order_id: result.data.placeOrder.order.order_id,
                infoMsg,
            });
            if (client && client.query && typeof client.query === 'function') {
                await client.query({ query: localTotalCart, data: { totalCart: 0 } });
            }
            await removeCartId();
            window.backdropLoader(false);
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:placeOrder'),
            });
            // localStorage.removeItem(modules.paypal.keyData);
            window.location.replace(generatesuccessRedirect(orderNumber));
        } else {
            window.backdropLoader(false);
            state.loading.order = false;
            setCheckout(state);

            const msg = t('checkout:message:serverError');

            handleOpenMessage({
                variant: 'error',
                text: msg,
            });
        }
    };
    const disabled = checkout.selectedShippingMethod === null;
    return <View {...props} handlePlaceOrder={handlePlaceOrder} disabled={disabled} />;
};

export default PlaceOrder;
