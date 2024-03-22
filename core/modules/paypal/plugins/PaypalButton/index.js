/* eslint-disable prefer-destructuring */
import { createPaypalExpressToken, setPaypalPaymentMethod } from '@core_modules/paypal/services/graphql';
import { getCartId } from '@helper_cartid';
import PaypalButtonView from '@plugin_paypalbutton/view';
import TagManager from 'react-gtm-module';
// import { setLocalStorage } from '@helper_localstorage';
import gqlService from '@core_modules/checkout/services/graphql';
import { getLoginInfo } from '@helper_auth';
import { getCookies } from '@helper_cookies';
import Router from 'next/router';

const PaypalButton = (props) => {
    const { t, cart, storeConfig } = props;
    let cartId = cart ? cart.id : null;
    let isLogin = 0;
    const isCustomerAddress = getCookies('is_cust_address') ?? null;
    if (typeof window !== 'undefined' && !cartId) {
        cartId = getCartId();
    }

    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
    }

    // config paypal
    const [initialOptionPaypal, setInitialOptionPaypal] = React.useState({
        'client-id': storeConfig?.paypal_key.client_id,
        currency: storeConfig?.base_currency_code || 'USD',
        intent: storeConfig?.paypal_key.intent,
        'data-order-id': '',
        // debug: modules.paypal.debug,
        'disable-funding': storeConfig?.paypal_key.disable_funding,
        'merchant-id': storeConfig?.pwa?.paypal_merchant_id,
    });

    // const [tokenData, setTokenData] = React.useState({});
    const [setCheckoutSession] = gqlService.setCheckoutSession();
    const [setPaymentMethod] = setPaypalPaymentMethod({ onError: () => {} });
    const [getPaypalToken, paypalToken] = createPaypalExpressToken();

    // set address

    // const [setShippingAddress] = setShippingAddressByInput();
    // const [setBillingAddress] = setBillingAddressByInput();

    // const [setGuestEmail] = setGuestEmailAddressOnCart();

    const handleOpenMessage = async ({ variant, text }) => {
        window.toastMessage({
            open: true,
            variant,
            text,
        });
    };

    React.useEffect(() => {
        if (typeof window !== 'undefined' && storeConfig?.pwa?.paypal_enable) {
            if (cartId) {
                getPaypalToken({
                    variables: {
                        cartId: cart.id,
                        code: 'paypal_express',
                        returnUrl: storeConfig?.paypal_key.return_url,
                        cancelUrl: storeConfig?.paypal_key.cancel_url,
                    },
                }).then((res) => {
                    if (res.data && res.data.createPaypalExpressToken && res.data.createPaypalExpressToken.token) {
                        const { token } = res.data.createPaypalExpressToken;
                        // setTokenData(res.data.createPaypalExpressToken);
                        setInitialOptionPaypal({
                            ...initialOptionPaypal,
                            'data-order-id': token,
                        });
                    }
                });
            }
        }
    }, []);

    const onClickPaypal = () => {
        if (cartId) {
            setCheckoutSession({
                variables: {
                    cartId,
                },
            });
            // .then(async (result) => { }).catch((e) => {
            //     console.log(e);
            // });
        }
    };

    const onCancelPaypal = () => {
        window.backdropLoader(false);
        Router.push('/checkout/cart');
    };

    const onErrorPaypal = () => {
        window.backdropLoader(false);
        handleOpenMessage({
            variant: 'error',
            text: t('common:error:fetchError'),
        });
    };

    const onApprovePaypall = async (data) => {
        window.backdropLoader(true);
        // let details = await fetch('/paypal/detail-transaction', {
        //     method: 'post',
        //     headers: {
        //         'content-type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         orderID: data.orderID,
        //     }),
        // });
        // if (details) {
        //     details = await details.json();
        // }

        // let address = null;
        // let email;
        // if (details && details.data && details.data.result && details.data.result.purchase_units
        //     && details.data.result.purchase_units.length > 0 && details.data.result.purchase_units[0].shipping
        //     && details.data.result.purchase_units[0].shipping.address) {
        //     let firstname = '';
        //     let lastname = '';
        //     if (details.data.result.purchase_units[0].shipping.name && details.data.result.purchase_units[0].shipping.name.full_name) {
        //         firstname = details.data.result.purchase_units[0].shipping.name.full_name.split(/ (.+)/)[0];
        //         lastname = details.data.result.purchase_units[0].shipping.name.full_name.split(/ (.+)/)[1];
        //     }
        //     address = {
        //         ...details.data.result.purchase_units[0].shipping.address,
        //         firstname,
        //         lastname,
        //     };
        // }

        // if (details && details.data && details.data.result && details && details.data && details.data.result.payer
        //     && details && details.data && details.data.result.payer.email_address) {
        //     email = details.data.result.payer.email_address;
        // }

        // if (!isLogin && email) {
        //     await setGuestEmail({
        //         variables: {
        //             cartId: cart.id,
        //             email,
        //         },
        //     })
        //         .catch((e) => {
        //             onErrorPaypal(e);
        //         });
        // }

        // if (address) {
        //     const variableAddress = {
        //         cartId: cart.id,
        //         city: address.admin_area_2,
        //         countryCode: address.country_code,
        //         firstname: address.firstname,
        //         lastname: address.lastname,
        //         telephone: '12345678',
        //         postcode: address.postal_code,
        //         street: address.address_line_1,
        //         region: address.admin_area_1,
        //     };

        //     await setShippingAddress({
        //         variables: variableAddress,
        //     })
        //         .then(async () => {
        //             setBillingAddress({
        //                 variables: variableAddress,
        //             })
        //                 .catch((e) => {
        //                     onErrorPaypal(e);
        //                 });
        //         })
        //         .catch((e) => {
        //             onErrorPaypal(e);
        //         });
        // }

        setPaymentMethod({
            variables: {
                cartId,
                payerId: data.payerID,
                token: initialOptionPaypal['data-order-id'],
            },
        })
            .then(async (result) => {
                if (result && result.data && result.data.setPaymentMethodOnCart && result.data.setPaymentMethodOnCart.cart) {
                    const selectedPayment = result.data.setPaymentMethodOnCart.cart.selected_payment_method;
                    // GTM UA dataLayer
                    const dataLayer = {
                        event: 'checkout',
                        ecommerce: {
                            checkout: {
                                actionField: { step: 3, option: selectedPayment.title, action: 'checkout' },
                                products:
                                    cart
                                    && cart.items
                                    && cart.items.map(({ quantity, product, prices }) => ({
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
                                actionField: { step: 3, option: selectedPayment.title, action: 'checkout_option' },
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
                                cart
                                    && cart.items
                                    && cart.items.map(({ quantity, product, prices }) => ({
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
                                        items:
                                            cart
                                            && cart.items.map(({ quantity, product, prices }) => ({
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
                } else {
                    onErrorPaypal('error');
                }

                // set local data

                // const paypalData = {
                //     data: {
                //         ...data,
                //         ...initialOptionPaypal,
                //         ...tokenData,
                //     },
                //     details: {},
                // };
                // if (details && details.data && details.data.result) {
                //     paypalData.details = details.data.result;
                // }
                // setLocalStorage(modules.paypal.keyData, paypalData);
                window.backdropLoader(false);
                Router.push(`/${storeConfig.paypal_key.return_url}`);
            })
            .catch(() => {
                Router.push(`/${storeConfig.paypal_key.return_url}`);
            });
    };

    const onShippingChangePaypal = () => {
        // const { shipping_addresses } = params;
    };

    const createOrderPaypal = () => new Promise((resolve) => {
        resolve(initialOptionPaypal['data-order-id']);
    });

    const paypalHandlingProps = {
        onClick: onClickPaypal,
        onCancel: onCancelPaypal,
        onError: onErrorPaypal,
        onApprove: onApprovePaypall,
        disabled: paypalToken.loading,
        onShippingChange: onShippingChangePaypal,
        createOrder: createOrderPaypal,
    };
    if (storeConfig?.pwa?.paypal_enable && isLogin && isCustomerAddress) {
        return (
            <PaypalButtonView
                {...props}
                paypalToken={paypalToken}
                initialOptionPaypal={initialOptionPaypal}
                paypalHandlingProps={paypalHandlingProps}
            />
        );
    }

    return null;
};

export default PaypalButton;
