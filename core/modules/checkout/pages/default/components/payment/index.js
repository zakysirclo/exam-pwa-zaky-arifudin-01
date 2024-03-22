/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { modules } from '@config';
import gqlService from '@core_modules/checkout/services/graphql';
import React from 'react';
import TagManager from 'react-gtm-module';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCheckoutState, setCheckoutData, setConfirmation, setIsNewUpdate, setLoading, setSelectedData, setStatusState,
} from '@core_modules/checkout/redux/checkoutSlice';

export default function CustomizedExpansionPanels({
    updateFormik,
    formik,
    handleOpenMessage,
    t,
    config,
    storeConfig,
    PaymentView,
    paypalHandlingProps,
    setInitialOptionPaypal,
    initialOptionPaypal,
    setTokenData,
    stripeRef,
    clientSecret,
    setClientSecret,
    displayHowToPay,
    setDisplayHowToPay,
    checkoutTokenState,
    setCheckoutTokenState,
    refSummary,
}) {
    const dispatch = useDispatch();
    const checkout = useSelector(selectCheckoutState);

    const { loading, data, selected } = checkout;
    const [setPaymentMethod] = gqlService.setPaymentMethod();
    const [getStripePaymentIntent] = gqlService.getStripePaymentIntent();
    const { data: paymentMethodList } = gqlService.getCheckoutConfigurations();
    const [getPaypalToken, paypalTokenData] = gqlService.createPaypalExpressToken();

    /**
     * [METHOD] handle when get result from set payment method
     * @param {result, val, cart} params
     */
    const onHandleResult = ({
        result, val, cart, purchaseOrder = false,
    }) => {
        dispatch(setSelectedData({ paymentOrderNumber: null }));
        dispatch(setLoading({
            all: false,
            shipping: false,
            payment: false,
            extraFee: false,
            order: false,
            purchaseOrderNumber: false,
        }));

        if (result && result.data && result.data.setPaymentMethodOnCart && result.data.setPaymentMethodOnCart.cart) {
            const mergeCart = {
                ...checkout.data.cart,
                ...result.data.setPaymentMethodOnCart.cart,
            };
            dispatch(setCheckoutData({
                cart: mergeCart,
            }));
            dispatch(setStatusState({ purchaseOrderApply: true }));
            updateFormik(mergeCart);
        } else {
            dispatch(setSelectedData({ payment: null }));
            if (result.message.includes('Token is wrong.')) {
                setCheckoutTokenState(!checkoutTokenState);
            } else if (purchaseOrder) {
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:purchaseOrderFailed'),
                });
            } else if (!checkout.selected.shipping || !checkout.selected.shipping.length) {
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:emptyShippingError'),
                });
            } else {
                handleOpenMessage({
                    variant: 'error',
                    text: t('common:error:wentWrong'),
                });
            }
        }

        const selectedPayment = data.paymentMethod.filter((item) => item.code === val);
        // GTM UA dataLayer
        const dataLayer = {
            event: 'checkout',
            ecommerce: {
                checkout: {
                    actionField: { step: 3, option: selectedPayment[0].title, action: 'checkout' },
                    products: cart.items.map(({ quantity, product, prices }) => ({
                        name: product.name,
                        id: product.sku,
                        price: JSON.stringify(prices.price.value),
                        category: product.categories.length > 0 ? product.categories[0].name : '',
                        list: product.categories.length > 0 ? product.categories[0].name : '',
                        quantity: JSON.stringify(quantity),
                        dimension4: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                        dimension5: '',
                        dimension6: '',
                        dimension7: prices.discount ? 'YES' : 'NO',
                    })),
                },
                currencyCode: storeConfig.base_currency_code || 'IDR',
            },
        };
        const dataLayerOption = {
            event: 'checkoutOption',
            ecommerce: {
                currencyCode: storeConfig.base_currency_code || 'IDR',
                checkout_option: {
                    actionField: { step: 3, option: selectedPayment[0].title, action: 'checkout_option' },
                },
                fbpixels: {
                    total_price: cart.prices.grand_total.value,
                },
            },
        };
        // GA 4 dataLayer
        const dataLayerOpt = {
            event: 'add_payment_info',
            ecommerce: {
                payment_type: selectedPayment[0].title,
                currency: storeConfig.base_currency_code || 'IDR',
                items: [
                    cart.items.map(({ quantity, product, prices }) => ({
                        currency: storeConfig.base_currency_code || 'IDR',
                        item_name: product.name,
                        item_id: product.sku,
                        price: JSON.stringify(prices.price.value),
                        item_category: product.categories.length > 0 ? product.categories[0].name : '',
                        item_list_name: product.categories.length > 0 ? product.categories[0].name : '',
                        quantity: JSON.stringify(quantity),
                        item_stock_status: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                        item_sale_product: '',
                        item_reviews_count: '',
                        item_reviews_score: '',
                    })),
                ],
                fbpixels: {
                    total_price: cart.prices.grand_total.value,
                    content_ids: [
                        {
                            payment_type: selectedPayment[0].title,
                            items: cart.items.map(({ quantity, product, prices }) => ({
                                currency: storeConfig.base_currency_code || 'IDR',
                                item_name: product.name,
                                item_id: product.sku,
                                price: JSON.stringify(prices.price.value),
                                item_category: product.categories.length > 0 ? product.categories[0].name : '',
                                item_list_name: product.categories.length > 0 ? product.categories[0].name : '',
                                quantity: JSON.stringify(quantity),
                                item_stock_status: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                                item_sale_product: '',
                                item_reviews_count: '',
                                item_reviews_score: '',
                            })),
                        },
                    ],
                    catalog_id: cart.items.map(({ product }) => (product.categories.length > 0 ? product.categories[0].name : '')),
                },
            },
        };
        TagManager.dataLayer({ dataLayer });
        TagManager.dataLayer({ dataLayer: dataLayerOption });
        TagManager.dataLayer({ dataLayer: dataLayerOpt });
    };

    /**
     * [METHOD] for set checkout state when selected payment method
     * @param {string: selected_payment_method} val
     */
    const handlePayment = async (val) => {
        if (val) {
            const { cart } = checkout.data;
            dispatch(setLoading({
                all: false,
                shipping: false,
                payment: false,
                extraFee: true,
                order: true,
            }));
            dispatch(setSelectedData({ payment: val }));
            dispatch(setStatusState({ purchaseOrderApply: false }));
            dispatch(setIsNewUpdate(true));

            if (val === 'purchaseorder' && checkout.selected) {
                dispatch(setSelectedData({ payment: val, purchaseOrderNumber: null }));
                dispatch(setLoading({
                    all: false,
                    order: false,
                }));
            } else {
                const payment_method = { code: val };
                if (payment_method.code === 'stripe_payments') {
                    await getStripePaymentIntent({
                        variables: {
                            cartId: cart.id,
                        },
                    }).then((resJson) => {
                        setClientSecret(resJson.data.setPaymentIntent.clientSecret);
                        dispatch(setLoading({
                            all: false,
                            order: false,
                            shipping: false,
                            payment: false,
                            extraFee: false,
                        }));
                    });
                } else {
                    await setPaymentMethod({
                        variables: {
                            cartId: cart.id,
                            payment_method,
                        },
                    })
                        .then((result) => {
                            if (val === 'paypal_express') {
                                dispatch(setSelectedData({ payment: val, purchaseOrderNumber: null }));
                                dispatch(setLoading({
                                    all: false,
                                    order: false,
                                }));
                                if (
                                    storeConfig?.pwa?.paypal_enable
                                    && initialOptionPaypal['data-order-id'] === ''
                                    && checkout.selected.payment === 'paypal_express'
                                ) {
                                    getPaypalToken({
                                        variables: {
                                            cartId: cart.id,
                                            code: 'paypal_express',
                                            returnUrl: modules.paypal.returnUrl,
                                            cancelUrl: modules.paypal.cancelUrl,
                                        },
                                    }).then((res) => {
                                        if (res.data && res.data.createPaypalExpressToken && res.data.createPaypalExpressToken.token) {
                                            const { token } = res.data.createPaypalExpressToken;
                                            setTokenData(res.data.createPaypalExpressToken);
                                            setInitialOptionPaypal({
                                                ...initialOptionPaypal,
                                                'data-order-id': token,
                                            });
                                        }
                                    });
                                }
                            } else {
                                onHandleResult({
                                    result,
                                    val,
                                    cart,
                                });
                            }
                        })
                        .catch((err) => {
                            const result = err;
                            onHandleResult({
                                result,
                                val,
                                cart,
                            });
                        });
                }
            }
        }
    };

    /**
     * [METHOD] for handling purchase order text input on change, and set checkout state
     * @param {object} event
     */
    const handlePurchaseOrder = (e) => {
        dispatch(setSelectedData({
            purchaseOrderNumber: e.target.value,
        }));
    };

    /**
     * [METHOD] for handling purchase order submit button
     */
    const handlePurchaseOrderSubmit = async () => {
        const { cart } = checkout.data;
        dispatch(setLoading({
            all: false,
            shipping: false,
            payment: false,
            extraFee: false,
            order: false,
            purchaseOrderNumber: true,
        }));
        const selected_payment = checkout.selected.payment;
        const purchase_order_number = checkout.selected.purchaseOrderNumber;
        const payment_method = { code: selected_payment, purchase_order_number };
        await setPaymentMethod({
            variables: {
                cartId: cart.id,
                payment_method,
            },
        })
            .then((result) => {
                onHandleResult({
                    result,
                    val: selected_payment,
                    cart,
                });
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:purchaseOrderApplied'),
                });
            })
            .catch((err) => {
                const result = err;
                onHandleResult({
                    result,
                    val: selected_payment,
                    cart,
                });
            });
    };

    /**
     * [MAIN] view
     */
    return (
        <PaymentView
            t={t}
            data={data}
            loading={loading}
            selected={selected}
            checkout={checkout}
            checkoutTokenState={checkoutTokenState}
            setCheckoutTokenState={setCheckoutTokenState}
            formik={formik}
            updateFormik={updateFormik}
            clientSecret={clientSecret}
            storeConfig={storeConfig}
            paymentMethodList={paymentMethodList}
            handlePayment={handlePayment}
            handlePurchaseOrder={handlePurchaseOrder}
            handlePurchaseOrderSubmit={handlePurchaseOrderSubmit}
            paypalTokenData={paypalTokenData}
            paypalHandlingProps={paypalHandlingProps}
            initialOptionPaypal={initialOptionPaypal}
            stripeRef={stripeRef}
            handleOpenMessage={handleOpenMessage}
            displayHowToPay={displayHowToPay}
            setDisplayHowToPay={setDisplayHowToPay}
            refSummary={refSummary}
            config={config}
            onHandleResult={onHandleResult}
        />
    );
}
