/* eslint-disable comma-dangle */
/* eslint-disable no-lonely-if */
/* eslint-disable radix */
import { useApolloClient } from '@apollo/client';
import { modules } from '@config';
import { removeCartId, setCartId } from '@helper_cartid';
import { getHost, getStoreHost } from '@helper_config';
import { setCheckoutData } from '@helper_cookies';
import { storeConfigVar } from '@core/services/graphql/cache';
import { localTotalCart } from '@services/graphql/schema/local';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';

import { getIpayUrl } from '@core_modules/checkout/helpers/config';
import gqlService from '@core_modules/checkout/services/graphql';
import Skeleton from '@common_skeleton';
import SummaryPlugin from '@plugin_summary';

import ModalXendit from '@core_modules/checkout/pages/default/components/ModalXendit/index';
import { getAppEnv } from '@core/helpers/env';

import { useDispatch, useSelector } from 'react-redux';
import { selectCheckoutState, setLoading, setCheckoutData as setCheckoutDataState } from '@core_modules/checkout/redux/checkoutSlice';
import Button from '@common/Button';

const Summary = ({
    t,
    handleOpenMessage,
    formik,
    updateFormik,
    config,
    refSummary,
    storeConfig,
    checkoutTokenState,
    setCheckoutTokenState,
    buttonOnly = false,
}) => {
    const dispatch = useDispatch();
    const checkout = useSelector(selectCheckoutState);

    const { order: loading, all: disabled, totalPrice } = checkout.loading;
    const errorItems = checkout?.data?.errorItems;
    const isSelectedPurchaseOrder = checkout.selected.payment === 'purchaseorder';

    // origin name config
    const originName = modules.checkout.checkoutOnly ? 'pwa-checkout' : 'pwa';

    const globalCurrency = storeConfig.default_display_currency_code;
    // prettier-ignore
    const isPurchaseOrderApply = isSelectedPurchaseOrder && checkout.status.purchaseOrderApply;

    const client = useApolloClient();
    const tempMidtransOrderId = [];
    const [orderId, setOrderId] = useState(null);
    const [snapOrderId, setSnapOrderId] = useState([]);
    const [snapOpened, setSnapOpened] = useState(false);
    const [snapClosed, setSnapClosed] = useState(false);
    const [getSnapToken, manageSnapToken] = gqlService.getSnapToken({ onError: () => {} });
    const [setPaymentMethod] = gqlService.setPaymentMethod();
    const [placeOrder] = gqlService.placeOrder();
    const [placeOrderWithOrderComment] = gqlService.placeOrderWithOrderComment({ onError: () => {} });
    const [getSnapOrderStatusByOrderId, snapStatus] = gqlService.getSnapOrderStatusByOrderId({ onError: () => {} });
    const [getCustCartId, manageCustCartId] = gqlService.getCustomerCartId();
    const storeConfigLocalStorage = storeConfigVar();
    // indodana
    const [getIndodanaRedirect, urlIndodana] = gqlService.getIndodanaUrl();
    // xendit
    const [getXenditUrl] = gqlService.xenditCreateInvoice();

    // mutation update delete
    const [actDeleteItem] = gqlService.deleteItemCart();
    const [actUpdateItem] = gqlService.updateItemCart();
    const [getUpdatedCart, updatedCart] = gqlService.getUpdatedCart();

    const validateResponse = (response) => {
        if (response.message) {
            dispatch(setLoading({ order: false }));

            if (response.message.includes('Token is wrong.')) {
                setCheckoutTokenState(!checkoutTokenState);
            } else {
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:serverError'),
                });
            }

            return false;
        }

        return true;
    };

    const generatesuccessRedirect = (orderNumber) => {
        if (config && config.successRedirect && config.successRedirect.link) {
            return `${config.successRedirect.link}${config.successRedirect.orderId ? `?orderId=${orderNumber}` : ''}`;
        }
        return '/checkout/onepage/success';
    };

    const generateCartRedirect = (orderNumber = '') => {
        if (config && config.cartRedirect && config.cartRedirect.link) {
            if (orderNumber && orderNumber !== '') {
                if (originName === 'pwa-checkout') {
                    return `${getStoreHost(getAppEnv())}snap/payment/fail?order_id=${orderNumber}`;
                }
                return `${getHost()}/checkout/cart?paymentFailed=true&orderId=${orderNumber}`;
            }
            return config.cartRedirect.link;
        }
        return '/checkout/cart';
    };

    // place order xendit
    const [openXendit, setOpenXendit] = useState(false);
    const [xenditIframeUrl, setXenditIframeUrl] = useState('');
    const [xenditState, setXenditState] = useState({});

    const handleXendit = (order_id) => {
        dispatch(setLoading({ order: true }));
        getXenditUrl({
            variables: { order_id },
        })
            .then((res) => {
                if (res && res.data && res.data.xenditCreateInvoice && res.data.xenditCreateInvoice.invoice_url) {
                    setXenditIframeUrl(res.data.xenditCreateInvoice.invoice_url);
                    setXenditState({
                        order_id,
                        payment_code: checkout.data.cart.selected_payment_method.code,
                        mode: res.data.xenditCreateInvoice.mode,
                        xendit_qrcode_external_id: res.data.xenditCreateInvoice.xendit_qrcode_external_id,
                        amount: checkout.data.cart.prices.grand_total.value,
                    });
                    if (modules.checkout.xendit.paymentPrefixCodeOnSuccess.includes(checkout.data.cart.selected_payment_method.code)) {
                        handleOpenMessage({
                            variant: 'success',
                            text: t('checkout:message:placeOrder'),
                        });
                        window.location.replace(generatesuccessRedirect(order_id));
                    } else if (checkout.data.cart.selected_payment_method.code === 'cc_subscription') {
                        window.location.replace(res.data.xenditCreateInvoice.invoice_url);
                    } else {
                        setOpenXendit(true);
                    }
                    dispatch(setLoading({ order: false }));
                } else {
                    dispatch(setLoading({ order: false }));

                    const msg = t('checkout:message:serverError');

                    handleOpenMessage({
                        variant: 'error',
                        text: msg,
                    });

                    setTimeout(() => {
                        window.location.replace(generateCartRedirect(orderId));
                    }, 1000);
                }
            })
            .catch((e) => {
                dispatch(setLoading({ order: false }));

                const msg = e.graphQLErrors.length > 0 ? e.graphQLErrors[0].message : t('checkout:message:serverError');

                handleOpenMessage({
                    variant: 'error',
                    text: msg,
                });

                setTimeout(() => {
                    window.location.replace(generateCartRedirect(order_id));
                }, 1000);
            });
    };

    const handlePlaceOrder = async () => {
        window.backdropLoader(true);
        const { cart, isGuest } = checkout.data;
        let formValidation = {};
        let result;
        dispatch(setLoading({ order: true }));

        if (cart.prices.grand_total.value === 0 && cart.selected_payment_method && cart.selected_payment_method.code !== 'free') {
            await setPaymentMethod({
                variables: {
                    cartId: cart.id,
                    payment_method: {
                        code: 'free',
                    },
                },
            })
                .then((res) => {
                    result = res;
                })
                .catch((err) => {
                    result = err;
                });

            if (!validateResponse(result)) return;

            dispatch(
                setCheckoutDataState({
                    cart: {
                        ...checkout.data.cart,
                        ...result.data.setPaymentMethodOnCart.cart,
                    },
                }),
            );
            updateFormik({
                ...checkout.data.cart,
                ...result.data.setPaymentMethodOnCart.cart,
            });
        }

        await formik.submitForm();
        formValidation = await formik.validateForm();

        const isMultiSeller = storeConfigLocalStorage.enable_oms_multiseller === '1' || storeConfigLocalStorage.enable_oms_multiseller === 1;

        if (Object.keys(formValidation).length === 0 && formValidation.constructor === Object) {
            if (checkout.selected.delivery === 'pickup' && (checkout.error.pickupInformation || checkout.error.selectStore)) {
                dispatch(setLoading({ order: false }));

                const msg = t('checkout:completePikcupInfo');
                handleOpenMessage({
                    variant: 'error',
                    text: msg,
                });
            } else {
                if (formik.values.orderComment !== '') {
                    result = await placeOrderWithOrderComment({
                        variables: {
                            cartId: cart.id,
                            origin: originName,
                            orderComment: formik.values.orderComment,
                        },
                    });
                } else {
                    await placeOrder({
                        variables: {
                            cartId: cart.id,
                            origin: originName,
                        },
                    })
                        .then((res) => {
                            result = res;
                        })
                        .catch((err) => {
                            result = err;
                        });
                }

                dispatch(setLoading({ order: false }));

                if (!validateResponse(result)) return;

                let orderNumber = '';
                let infoMsg = '';
                if (isMultiSeller) {
                    if (result.data && result.data.placeOrder[0] && result.data.placeOrder[0].order && result.data.placeOrder[0].order.order_number) {
                        // eslint-disable-next-line array-callback-return
                        result.data.placeOrder.map((order, index) => {
                            if (index !== result.data.placeOrder.length - 1) {
                                orderNumber = `${orderNumber}${order.order.order_number}|`;
                                infoMsg = order.infoMsg;
                            } else {
                                orderNumber = `${orderNumber}${order.order.order_number}`;
                                infoMsg = order.infoMsg;
                            }
                            tempMidtransOrderId.push(order.order.order_number);
                        });
                    }
                } else {
                    if (result.data && result.data.placeOrder[0] && result.data.placeOrder[0].order && result.data.placeOrder[0].order.order_number) {
                        orderNumber = result.data.placeOrder[0].order.order_number;
                        infoMsg = result.data.placeOrder[0].infoMsg;
                        tempMidtransOrderId.push(orderNumber);
                    }
                }
                if (orderNumber && orderNumber !== '') {
                    if (isMultiSeller) {
                        setCheckoutData({
                            email: isGuest ? formik.values.email : cart.email,
                            order_number: orderNumber,
                            order_id: orderNumber,
                            infoMsg,
                        });
                    } else {
                        setCheckoutData({
                            email: isGuest ? formik.values.email : cart.email,
                            order_number: orderNumber,
                            order_id: result.data.placeOrder[0].order.order_id,
                            infoMsg,
                        });
                    }
                    if (client && client.query && typeof client.query === 'function') {
                        await client.query({ query: localTotalCart, data: { totalCart: 0 } });
                    }

                    if (checkout.data.cart.selected_payment_method.code.match(/snap.*/)) {
                        setOrderId(orderNumber);
                        setSnapOrderId(tempMidtransOrderId);
                        await getSnapToken({ variables: { orderId: tempMidtransOrderId } });
                    } else if (
                        checkout.data.cart.selected_payment_method.code.match(/ovo.*/)
                        || checkout.data.cart.selected_payment_method.code.match(/ipay88*/)
                    ) {
                        window.location.href = getIpayUrl(orderNumber);
                    } else if (checkout.data.cart.selected_payment_method.code.match(/indodana/)) {
                        await getIndodanaRedirect({ variables: { order_number: orderNumber } });
                    } else if (
                        modules.checkout.xendit.paymentPrefixCode.includes(checkout.data.cart.selected_payment_method.code)
                        || modules.checkout.xendit.paymentPrefixCodeOnSuccess.includes(checkout.data.cart.selected_payment_method.code)
                    ) {
                        handleXendit(orderNumber);
                    } else {
                        handleOpenMessage({
                            variant: 'success',
                            text: t('checkout:message:placeOrder'),
                        });
                        window.location.replace(generatesuccessRedirect(orderNumber));
                    }

                    setTimeout(() => {
                        removeCartId();
                    }, 1000);
                } else {
                    dispatch(setLoading({ order: false }));

                    const msg = t('checkout:message:serverError');

                    handleOpenMessage({
                        variant: 'error',
                        text: msg,
                    });
                }
            }
        } else {
            dispatch(setLoading({ order: false }));

            const msg = checkout.data.isGuest ? t('checkout:message:guestFormValidation') : t('checkout:message:customerFormValidation');

            handleOpenMessage({
                variant: 'error',
                text: msg,
            });
        }

        window.backdropLoader(false);
    };

    // manage indodana redirect
    if (!urlIndodana.loading && urlIndodana.data && urlIndodana.data.indodanaRedirectUrl && urlIndodana.data.indodanaRedirectUrl.redirect_url) {
        window.location.replace(urlIndodana.data.indodanaRedirectUrl.redirect_url);
    }

    useEffect(() => {
        if (!urlIndodana.loading && urlIndodana.error) {
            const msg = t('checkout:message:serverError');

            handleOpenMessage({
                variant: 'error',
                text: msg,
            });
        }
    }, [urlIndodana]);

    // Start - Manage Snap Pop Up When Opened (Waiting Response From SnapToken)
    if (
        manageSnapToken.data
        && orderId
        && snapOrderId
        && !snapOpened
        && manageSnapToken.data.getSnapTokenByOrderId
        && manageSnapToken.data.getSnapTokenByOrderId.snap_token
    ) {
        const snapToken = manageSnapToken.data.getSnapTokenByOrderId.snap_token;
        if (snap && snap.pay) {
            snap.pay(snapToken, {
                async onSuccess() {
                    window.location.replace(generatesuccessRedirect(orderId));
                },
                async onPending() {
                    window.location.replace(generatesuccessRedirect(orderId));
                },
                async onError() {
                    window.backdropLoader(true);
                    getSnapOrderStatusByOrderId({
                        variables: {
                            orderId: snapOrderId,
                        },
                    });

                    if (!checkout.data.isGuest) {
                        getCustCartId();
                    }

                    setSnapOpened(true);
                },
                async onClose() {
                    window.backdropLoader(true);
                    getSnapOrderStatusByOrderId({
                        variables: {
                            orderId: snapOrderId,
                        },
                    });

                    if (!checkout.data.isGuest) {
                        getCustCartId();
                    }

                    setSnapOpened(true);
                },
            });
        }
    }

    if (manageSnapToken.error && orderId) {
        window.location.replace(generateCartRedirect(orderId));
    }
    // End - Manage Snap Pop Up When Opened (Waitinge Response From SnapToken)

    // Start - Process Snap Pop Up Close (Waitinge Response From Reorder)
    if (snapStatus.data && !snapClosed) {
        const { cart_id, order_id } = snapStatus.data.getSnapOrderStatusByOrderId;
        setSnapClosed(true);

        if (!checkout.data.isGuest && manageCustCartId.data) {
            const { id: customerCartId } = manageCustCartId.data.customerCart;
            setCartId(customerCartId);
            setOrderId(null);
            setSnapOrderId([]);
            window.location.replace(generateCartRedirect(order_id));
        } else {
            setCartId(cart_id);
            setOrderId(null);
            setSnapOrderId([]);
            window.location.replace(generateCartRedirect(order_id));
        }
    }
    // End - Process Snap Pop Up Close (Waitinge Response From Reorder)

    const setCart = (cart = {}) => {
        dispatch(
            setCheckoutDataState({
                cart: { ...checkout.data.cart, ...cart },
            }),
        );
    };

    const setLoadSummary = (load = false) => {
        window.backdropLoader(load);
        dispatch(
            setLoading({
                addresses: load,
                order: load,
                shipping: load,
                payment: load,
                extraFee: load,
            }),
        );
    };

    useEffect(() => {
        if (!updatedCart.loading && updatedCart.data) {
            setLoadSummary(false);
            window.toastMessage({
                open: true,
                text: t('common:cart:updateSuccess'),
                variant: 'success',
            });
            setCart({ ...updatedCart.data.cart });
        }
    }, [updatedCart.loading]);

    useEffect(() => {
        if (typeof refSummary !== 'undefined') {
            // eslint-disable-next-line no-param-reassign
            refSummary.current = {
                handlePlaceOrder,
            };
        }
    }, [refSummary]);
    const Loader = () => (
        <>
            <Skeleton className="rounded-[50%] mb-[5px]" width="100%" height={300} />
            <Skeleton className="rounded-[50%] mb-[5px]" width="100%" height={50} />
        </>
    );
    if (checkout.loading.all) {
        return <Loader />;
    }

    // update items
    const updateCart = (id, qty) => {
        setLoadSummary(true);
        actUpdateItem({
            variables: {
                cartId: checkout.data.cart.id,
                cart_item_id: parseInt(id, 10),
                quantity: qty,
            },
            context: {
                request: 'internal',
            },
        })
            .then((res) => {
                if (res && res.data && res.data.updateCartItems && res.data.updateCartItems.cart) {
                    getUpdatedCart({ variables: { cartId: checkout.data.cart.id } });
                }
            })
            .catch((e) => {
                setLoadSummary(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('common:cart:updateFailed'),
                    variant: 'error',
                });
            });
    };

    const deleteCart = (id) => {
        setLoadSummary(true);
        actDeleteItem({
            variables: {
                cartId: checkout.data.cart.id,
                cart_item_id: parseInt(id, 10),
            },
            context: {
                request: 'internal',
            },
        })
            .then((res) => {
                if (res && res.data && res.data.removeItemFromCart && res.data.removeItemFromCart.cart) {
                    setLoadSummary(false);
                    window.toastMessage({
                        open: true,
                        text: t('common:cart:deleteSuccess'),
                        variant: 'success',
                    });
                    if (res.data.removeItemFromCart.cart.items === null || res.data.removeItemFromCart.cart.items.length === 0) {
                        window.location.replace(generateCartRedirect());
                    } else {
                        setCart({ ...res.data.removeItemFromCart.cart });
                    }
                }
            })
            .catch((e) => {
                setLoadSummary(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('common:cart:deleteFailed'),
                    variant: 'error',
                });
            });
    };

    // check error items
    if (checkout.data.cart.errorItems && checkout.data.cart.errorItems?.length > 0) {
        const errorMessage = {
            variant: 'warning',
            text: checkout.data.cart.errorItems[0],
            open: true,
        };
        window.toastMessage({
            ...errorMessage,
        });
        setTimeout(() => {
            Router.push('/checkout/cart');
        }, 3000);
    }

    if (checkout && checkout.data && checkout.data.cart && checkout.loading) {
        const disablePlaceOrder = errorItems || disabled || (isSelectedPurchaseOrder && !isPurchaseOrderApply) || checkout.error.shippingAddress
        || (formik && Object.keys(formik.errors).length);
        return (
            <>
                <ModalXendit open={openXendit} setOpen={() => setOpenXendit(!openXendit)} iframeUrl={xenditIframeUrl} {...xenditState} />
                {buttonOnly ? (
                    <Button
                        disabled={disablePlaceOrder}
                        className="w-full"
                        classNameText="justify-center text-lg"
                        loading={loading}
                        onClick={
                            () => {
                                if (!loading) {
                                    handlePlaceOrder();
                                }
                            }
                        }
                    >
                        {t('checkout:placeOrder')}
                    </Button>
                ) : (
                    <SummaryPlugin
                        t={t}
                        loadTotal={totalPrice}
                        loading={loading}
                        isLoader={checkout.loading.order}
                        disabled={
                            disablePlaceOrder
                        }
                        handleActionSummary={() => {
                            if (!loading) {
                                handlePlaceOrder();
                            }
                        }}
                        dataCart={checkout.data.cart}
                        showItems
                        label={t('checkout:placeOrder')}
                        globalCurrency={globalCurrency}
                        updateCart={updateCart}
                        deleteCart={deleteCart}
                        withAction
                        hideButton
                        storeConfig={storeConfig}
                        mobilePosition="bottom" // top: static on top, bottom: assolute on bottom like bottom sheet
                    />
                )}
            </>
        );
    }

    return null;
};

export default Summary;
