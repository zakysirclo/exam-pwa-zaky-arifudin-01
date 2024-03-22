import React, { useState } from 'react';
import { getCartId, setCartId } from '@helper_cartid';
import { getLoginInfo } from '@helper_auth';
import {
    getGroupedProduct,
    addProductsToCart,
    getGuestCartId as queryGetGuestCartId,
    getCustomerCartId,
} from '@core_modules/product/services/graphql';

const GroupedProductOption = ({
    View, data, setOpen, stockStatus, t, ...other
}) => {
    const { sku, __typename } = data;

    const { storeConfig = {} } = other;

    const [loading, setLoading] = useState(false);
    const [itemsCart, setItemsCart] = useState({});

    const [actionAddToCart] = addProductsToCart();

    const [getGuestCartId] = queryGetGuestCartId();
    const cartUser = getCustomerCartId();
    const { loading: loadData, data: products } = getGroupedProduct(storeConfig, { variables: { sku } });

    let optionsData = [];

    if (
        !loadData
        && products
        && products.products
        && products.products.items
        && products.products.items.length > 0
        && products.products.items[0].items
        && products.products.items[0].items.length > 0
    ) {
        optionsData = products.products.items[0].items;
    }

    const handleAddToCart = async () => {
        const isLogin = getLoginInfo();
        let cartId = getCartId();
        await setLoading(true);
        const cartItems = [];
        const keys = Object.keys(itemsCart);
        for (let no = 0; no < keys.length; no += 1) {
            if (itemsCart[keys[no]] && itemsCart[keys[no]] > 0) {
                cartItems.push({
                    sku: keys[no],
                    quantity: parseFloat(itemsCart[keys[no]]),
                });
            }
        }

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
        if (__typename === 'GroupedProduct' && cartItems.length > 0) {
            actionAddToCart({
                variables: {
                    cartId,
                    cartItems,
                },
            })
                .then((res) => {
                    if (res.data.addProductsToCart) {
                        if (res.data.addProductsToCart.user_errors && res.data.addProductsToCart.user_errors.length > 0) {
                            window.toastMessage({
                                ...errorMessage,
                                text: res.data.addProductsToCart.user_errors[0].message || errorMessage.text,
                            });
                            setLoading(false);
                        } else if (res.data.addProductsToCart && res.data.addProductsToCart.cart) {
                            window.reloadCartQty = true;
                            window.toastMessage({
                                variant: 'success',
                                text: t('product:successAddCart'),
                                open: true,
                            });
                            setLoading(false);
                        } else {
                            setLoading(false);
                            window.toastMessage({
                                ...errorMessage,
                                text: errorMessage.text,
                            });
                        }
                    }
                })
                .catch((e) => {
                    const originalError = e.message.includes(':') ? e.message.split(':')[1] : e.message;
                    setLoading(false);
                    window.toastMessage({
                        ...errorMessage,
                        text: originalError || errorMessage.text,
                    });
                });
        } else {
            setLoading(false);
            window.toastMessage({
                variant: 'error',
                text: t('product:failedQtyZero'),
                open: true,
            });
        }
    };

    return (
        <View
            {...other}
            t={t}
            handleAddToCart={handleAddToCart}
            loading={loading}
            loadData={loadData}
            optionsData={optionsData}
            disabled={loading || loadData || stockStatus === 'OUT_OF_STOCK'}
            itemsCart={itemsCart}
            setItemsCart={setItemsCart}
        />
    );
};

export default GroupedProductOption;
