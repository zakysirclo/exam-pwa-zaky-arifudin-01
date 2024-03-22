/* eslint-disable no-underscore-dangle */
import { getCartId, setCartId } from '@helper_cartid';
import { getLoginInfo } from '@helper_auth';
import { modules } from '@config';
import React, { useState } from 'react';
import TagManager from 'react-gtm-module';
import { getGuestCartId as queryGetGuestCartId, getCustomerCartId, addConfigurableProductsToCart } from '@core_modules/product/services/graphql';

const CoreSimpleOptionItem = ({
    setOpen = () => {},
    t,
    data,
    View,
    handleAddToCart: CustomAddToCart,
    loading: customLoading,
    setLoading: setCustomLoading,
    checkCustomizableOptionsValue,
    errorCustomizableOptions,
    customizableOptions,
    stockStatus,
    ...other
}) => {
    const [qty, setQty] = React.useState(1);
    const {
        __typename, sku, name, categories, price_range, url_key, sale, review,
    } = data;

    const reviewValue = parseInt(review?.rating_summary, 10) / 20;
    const [addConfigurableProducts] = addConfigurableProductsToCart();
    const [getGuestCartId] = queryGetGuestCartId();
    const cartUser = getCustomerCartId();
    let [loading, setLoading] = useState(false);

    if (typeof customLoading !== 'undefined' && typeof setCustomLoading === 'function') {
        loading = customLoading;
        setLoading = setCustomLoading;
    }

    const addToCart = async () => {
        const isLogin = getLoginInfo();
        let cartId = getCartId();
        let customizable_options = [];
        const entered_options = [];
        const uids = [];

        if (modules.product.customizableOptions.enabled && customizableOptions && customizableOptions.length > 0) {
            customizableOptions.map((op) => {
                if (customizable_options.length > 0) {
                    const findOptions = customizable_options.find((item) => item.id === op.option_id);
                    if (findOptions) {
                        customizable_options = customizable_options.filter((item) => item.id !== op.option_id);
                        if (op.isEnteredOption) {
                            entered_options.push({
                                uid: op.uid,
                                value: `${findOptions.value_string},${op.value}`,
                            });
                        } else {
                            customizable_options.push({
                                id: op.option_id,
                                value_string: `${findOptions.value_string},${op.value}`,
                            });
                        }
                    } else if (op.isEnteredOption) {
                        entered_options.push({
                            uid: op.uid,
                            value: op.value,
                        });
                    } else {
                        customizable_options.push({
                            id: op.option_id,
                            value_string: op.value,
                        });
                    }
                }
                if (customizable_options.length === 0) {
                    if (
                        op.__typename === 'CustomizableFieldValue'
                        || op.__typename === 'CustomizableAreaValue'
                        || op.__typename === 'CustomizableDateValue'
                    ) {
                        entered_options.push({
                            uid: op.uid,
                            value: op.value,
                        });
                    } else {
                        uids.push(op.uid);
                    }
                }
                return op;
            });
        }

        if (CustomAddToCart && typeof CustomAddToCart === 'function') {
            CustomAddToCart({
                ...data,
                qty: parseFloat(qty),
                customizable_options,
            });
        } else {
            setLoading(true);
            const errorMessage = {
                variant: 'error',
                text: t('product:failedAddCart'),
                open: true,
            };
            if (!cartId || cartId === '' || cartId === undefined) {
                if (!isLogin) {
                    await getGuestCartId()
                        .then((res) => {
                            const token = res.data.createEmptyCart;
                            cartId = token;
                            setCartId(token);
                        })
                        .catch((e) => {
                            const originalError = e.message.includes(':') ? e.message.split(':')[1] : e.message;
                            setLoading(false);
                            window.toastMessage({
                                ...errorMessage,
                                text: originalError || errorMessage.text,
                            });
                        });
                } else if (cartUser.data && cartUser.data.customerCart) {
                    const token = cartUser.data.customerCart.id || '';
                    cartId = token;
                    setCartId(token);
                }
            }
            if (__typename === 'SimpleProduct') {
                const variables = {
                    cartId,
                    cartItems: [
                        {
                            quantity: parseFloat(qty),
                            sku,
                            selected_options: [...uids],
                            entered_options,
                        },
                    ],
                };
                // GTM UA dataLayer
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'addToCart',
                        eventLabel: name,
                        ecommerce: {
                            currencyCode: price_range.minimum_price.regular_price.currency || 'USD',
                            add: {
                                products: [
                                    {
                                        name,
                                        id: sku,
                                        price: price_range.minimum_price.regular_price.value || 0,
                                        category: categories?.length > 0 ? categories[0].name : '',
                                        list: categories?.length > 0 ? categories[0].name : '',
                                        quantity: qty,
                                        dimensions4: stockStatus,
                                    },
                                ],
                            },
                        },
                    },
                });
                // GA 4 dataLayer
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'add_to_cart',
                        ecommerce: {
                            action: {
                                items: [
                                    {
                                        item_name: name,
                                        item_id: sku,
                                        price: price_range.minimum_price.regular_price.value || 0,
                                        item_category: categories?.length > 0 ? categories[0].name : '',
                                        item_list_name: categories?.length > 0 ? categories[0].name : '',
                                        quantity: qty,
                                        currency: price_range.minimum_price.regular_price.currency || 'USD',
                                        item_stock_status: stockStatus,
                                        item_reviews_score: reviewValue,
                                        item_reviews_count: review?.reviews_count,
                                        item_sale_product: sale === 0 ? 'NO' : 'YES',
                                    },
                                ],
                            },
                        },
                    },
                });
                addConfigurableProducts({
                    variables,
                })
                    .then(() => {
                        window.reloadCartQty = true;
                        window.toastMessage({ variant: 'success', text: t('product:successAddCart'), open: true });
                        setLoading(false);
                        setOpen(false);
                    })
                    .catch((e) => {
                        setLoading(false);
                        const originalError = e.message.includes(':') ? e.message.split(':')[1] : e.message;

                        window.toastMessage({
                            ...errorMessage,
                            text: originalError || errorMessage.text,
                        });
                    });
            }
        }
    };

    const handleAddToCart = async () => {
        if (modules.product.customizableOptions.enabled && customizableOptions && customizableOptions.length > 0) {
            const check = await checkCustomizableOptionsValue();
            if (check) {
                addToCart();
            }
        } else {
            addToCart();
        }
    };

    return (
        <View
            qty={qty}
            setQty={setQty}
            handleAddToCart={handleAddToCart}
            t={t}
            loading={loading}
            disabled={stockStatus === 'OUT_OF_STOCK'}
            url_key={url_key}
            {...other}
        />
    );
};

export default CoreSimpleOptionItem;
