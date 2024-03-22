import Button from '@common_button';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

import gqlService from '@core_modules/checkout/services/graphql';

import { useDispatch, useSelector } from 'react-redux';
import {
    selectCheckoutState, setLoading, setSelectedData, setStatusState,
} from '@core_modules/checkout/redux/checkoutSlice';

const CheckoutForm = (props) => {
    const {
        refSummary, onHandleResult, stripeRef, handleOpenMessage,
    } = props;

    const dispatch = useDispatch();
    const checkout = useSelector(selectCheckoutState);

    const [setPaymentMethod] = gqlService.setPaymentMethod();
    const [isProcessing, setIsProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const { cart } = checkout.data;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);
        dispatch(setLoading({
            all: false,
            shipping: false,
            payment: false,
            extraFee: true,
            order: true,
        }));

        dispatch(setSelectedData({ payment: 'stripe_payments' }));
        dispatch(setStatusState({ purchaseOrderApply: true }));

        const confirmStripePayments = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });
        setIsProcessing(false);

        if (confirmStripePayments && confirmStripePayments.error) {
            handleOpenMessage({
                variant: 'error',
                text: confirmStripePayments.error.message,
            });
        } else {
            const payment_method = {
                code: 'stripe_payments',
                stripe_payments: {
                    cc_stripejs_token: confirmStripePayments.paymentIntent.payment_method,
                },
            };
            await setPaymentMethod({
                variables: {
                    cartId: cart.id,
                    payment_method,
                },
            }).then((result) => {
                onHandleResult({
                    result,
                    val: 'stripe_payments',
                    cart,
                });
                refSummary.current.handlePlaceOrder();
            }).catch((err) => {
                const result = err;
                onHandleResult({
                    result,
                    val: 'stripe_payments',
                    cart,
                });
            });
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} ref={stripeRef}>
            <PaymentElement id="payment-element" />
            {/* Use these button below if you want to manually trigger confirm payment intent */}
            <Button
                fullWidth
                type="submit"
                onClick={handleSubmit}
                disabled={isProcessing || !stripe || !elements}
                id="submit"
                style={{ marginTop: '1rem', display: 'none', height: '0px' }}
            >
                {isProcessing ? 'Processing ... ' : 'Pay now'}
            </Button>
        </form>
    );
};

export default CheckoutForm;
