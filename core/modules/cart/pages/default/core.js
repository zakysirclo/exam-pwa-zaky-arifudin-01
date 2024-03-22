/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';
import { getCartId, setCartId } from '@helper_cartid';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';
import Layout from '@layout';
import { localTotalCart } from '@services/graphql/schema/local';
import { currencyVar } from '@core/services/graphql/cache';
import {
    addWishlist as mutationWishlist,
    getCartDataLazy,
    getCartItemLazy,
    deleteCartItem,
    updateCartitem,
    addProductToCartPromo,
    applyCouponToCart,
    removeCouponFromCart,
    cancelAndReOrder,
} from '@core_modules/cart/services/graphql';
import Backdrop from '@common/Backdrop';

import Content from '@core_modules/cart/pages/default/components';
import Skeleton from '@core_modules/cart/pages/default/components/skeleton';
import { getLoginInfo } from '@helper_auth';

const Cart = (props) => {
    const {
        t, token, storeConfig, ...other
    } = props;

    const isLogin = getLoginInfo();

    // cache currency
    const currencyCache = currencyVar();
    const router = useRouter();
    const { paymentFailed, orderId, cart_id: failedCartId } = router.query;
    const dataCart = {
        id: null,
        total_quantity: 0,
        applied_coupons: null,
        prices: {},
        items: [],
    };
    const dataSummary = {
        id: null,
        total_quantity: 0,
        applied_coupons: null,
        prices: {},
    };
    const [cart, setCart] = React.useState(dataCart);
    const [summary, setSummary] = useState(dataSummary);
    const [errorCart, setErrorCart] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editItem, setEditItem] = useState({});
    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    const [loadingCart, setLoadingCart] = useState(true);
    const [loadingSummary, setLoadingSummary] = useState(true);
    const config = {
        title: t('cart:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('cart:pageTitle'),
        headerBackIcon: 'close', // available values: "close", "arrow"
        bottomNav: false,
        pageType: 'cart',
        tagSelector: 'swift-page-cart',
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const toggleEditDrawer = (item) => {
        setEditItem(item);
        setOpenEditDrawer(!openEditDrawer);
    };

    // delete item from cart
    const [actDeleteItem, deleteData] = deleteCartItem();
    const [actUpdateItem, update] = updateCartitem();

    // reorder
    const [cancelAndReorderMutation, cancelAndReorderResponse] = cancelAndReOrder();

    // getCartDataLazzy
    const [getCart, responseCart] = getCartDataLazy();

    const [getCartItem, responseCartItem] = getCartItemLazy();

    // updatePromoItems
    const [mutationAddToCart, promoItems] = addProductToCartPromo();

    // apply and remove coupon
    const [applyCoupon, appliedCouponResult] = applyCouponToCart({ onError: () => {} });
    const [removeCoupon, removedCouponResult] = removeCouponFromCart({ onError: () => {} });

    React.useEffect(() => {
        if (paymentFailed && orderId) {
            if (failedCartId) {
                if (typeof window !== 'undefined') {
                    setCartId(failedCartId);
                    setTimeout(() => {
                        router.push('/checkout/cart');
                    }, 1000);
                }
            } else {
                cancelAndReorderMutation({
                    variables: {
                        order_id: orderId,
                    },
                });
            }
        } else {
            const cartId = getCartId();
            if (cartId) {
                if (getCartItem && !responseCartItem.called) {
                    getCartItem({
                        variables: {
                            cartId,
                        },
                    });
                }
                if (getCart && !responseCart.called) {
                    getCart({
                        variables: {
                            cartId,
                        },
                    });
                }
            } else {
                setLoadingCart(false);
                setLoadingSummary(false);
            }
        }
    }, []);

    React.useEffect(() => {
        if (cancelAndReorderResponse?.data?.cancelAndReorder?.cart_id) {
            const { cart_id } = cancelAndReorderResponse.data.cancelAndReorder;
            if (typeof window !== 'undefined') {
                if (cart_id) {
                    setCartId(cart_id);
                    if (paymentFailed && orderId) {
                        setTimeout(() => {
                            router.push('/checkout/cart');
                        }, 1000);
                    }
                    if (getCart && !responseCart.called && getCartItem && !responseCartItem.called) {
                        getCart({
                            variables: {
                                cartId: cart_id,
                            },
                        });
                        getCartItem({
                            variables: {
                                cartId: cart_id,
                            },
                        });
                    }
                }
            }
        }
    }, [cancelAndReorderResponse]);

    React.useEffect(() => {
        if (responseCartItem.loading) setLoadingCart(true);
        if (responseCartItem && responseCartItem.data && responseCartItem.data.cart) {
            const itemsCart = responseCartItem.data.cart.items.filter((item) => item !== null);
            const carts = {
                ...responseCartItem.data.cart,
                items: itemsCart,
            };
            setCart(carts);
            setLoadingCart(false);
        }
    }, [responseCartItem]);

    React.useEffect(() => {
        if (responseCart.loading) setLoadingSummary(true);
        if (responseCart && responseCart.data && responseCart.data.cart) {
            const carts = {
                ...responseCart.data.cart,
                prices: responseCart.data.cart.custom_total_price,
            };
            setCart({ ...cart, total_quantity: responseCart.data.cart.total_quantity });
            setSummary(carts);
            if (responseCart.client && responseCart.data.cart.total_quantity && responseCart.data.cart.total_quantity > 0) {
                responseCart.client.writeQuery({
                    query: localTotalCart,
                    data: { totalCart: responseCart.data.cart.total_quantity },
                });
            }
            setLoadingSummary(false);
        }

        if (responseCart.error) {
            const errorList = [];
            if (responseCart.error && responseCart.error.graphQLErrors && responseCart.error.graphQLErrors.length > 0) {
                for (let idx = 0; idx < responseCart.error.graphQLErrors.length; idx += 1) {
                    const { message } = responseCart.error.graphQLErrors[idx];
                    const regexp = new RegExp(/stock/i);
                    if (message && regexp.test(message)) {
                        errorList.push(message);
                    }
                }
            }
            setErrorCart(errorList);
            setLoadingCart(false);
            setLoadingSummary(false);
        }
    }, [responseCart]);

    // React.useMemo(() => {
    //     if (!loadingCart && tmpData && tmpData.id) {
    //         setCart({ ...tmpData });
    //     }
    // }, [loadingCart]);

    // delete items
    const deleteItem = (itemProps) => {
        // GTM UA dataLayer
        const dataLayer = {
            event: 'removeFromCart',
            eventLabel: itemProps.product.name,
            label: itemProps.product.name,
            ecommerce: {
                currencyCode:
                    itemProps.prices?.price_incl_tax.currency || itemProps.custom_price?.price_incl_tax.currency || storeConfig.base_currency_code,
                remove: {
                    cartItem: itemProps.id,
                    quantity: itemProps.quantity,
                    product: {
                        name: itemProps.product.name,
                        id: itemProps.product.sku,
                        price: itemProps.prices?.price_incl_tax.value || itemProps.custom_price?.price_incl_tax.value || 0,
                        dimensions4: itemProps.product.stock_status || '',
                    },
                },
            },
        };
        // GA 4 dataLayer
        const dataLayerGA4 = {
            event: 'remove_from_cart',
            ecommerce: {
                action: {
                    items: [
                        {
                            item_name: itemProps.product.name,
                            item_id: itemProps.product.sku,
                            price: itemProps.prices?.price_incl_tax.value || itemProps.custom_price?.price_incl_tax.value || 0,
                            // item_category: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                            // item_list_name: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                            quantity: itemProps.quantity,
                            currency:
                                itemProps.custom_price?.price_incl_tax.currency
                                || itemProps.prices?.price_incl_tax.currency
                                || storeConfig.base_currency_code,
                        },
                    ],
                },
            },
        };

        TagManager.dataLayer({ dataLayer });
        TagManager.dataLayer({ dataLayerGA4 });
        window.backdropLoader(true);

        const cartId = getCartId();
        setLoadingSummary(true);
        actDeleteItem({
            variables: {
                cartId,
                cart_item_id: parseInt(itemProps.id, 10),
            },
            context: {
                request: 'internal',
            },
        })
            .then(() => {
                toggleEditMode();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('cart:deleteSuccess'),
                    variant: 'success',
                });
            })
            .catch((e) => {
                toggleEditMode();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('cart:deleteFailed'),
                    variant: 'error',
                });
            });
    };

    // update items
    const updateItem = (itemData) => {
        window.backdropLoader(true);
        setLoadingSummary(true);
        const cartId = getCartId();
        actUpdateItem({
            variables: {
                cartId,
                cart_item_id: parseInt(itemData.cart_item_id, 10),
                quantity: itemData.quantity,
            },
            context: {
                request: 'internal',
            },
        })
            .then(() => {
                toggleEditMode();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('cart:updateSuccess'),
                    variant: 'success',
                });
            })
            .catch((e) => {
                toggleEditMode();
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('cart:updateFailed'),
                    variant: 'error',
                });
            });
    };

    // add free items handler
    const handleAddPromoItemToCart = async (params, cartId) => {
        let data = params;
        if (params.childProduct && params.parentProduct) {
            data = {
                ...params.childProduct,
                freeItemsData: params.parentProduct.freeItemsData,
            };
        }
        await window.backdropLoader(true);
        await mutationAddToCart({
            variables: {
                cart_id: cartId,
                cart_items: [
                    {
                        quantity: data.qty || 1,
                        sku: data.sku,
                        customizable_options: data.customizable_options,
                        promo_item_data: {
                            ruleId: data.freeItemsData.promo_item_data.ruleId,
                            minimalPrice: data.freeItemsData.promo_item_data.minimalPrice,
                            discountItem: data.freeItemsData.promo_item_data.discountItem,
                            isDeleted: data.freeItemsData.promo_item_data.isDeleted,
                            qtyToProcess: data.freeItemsData.promo_item_data.qtyToProcess,
                        },
                    },
                ],
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('checkout:message:addFreeItemPromoSuccess'),
                    variant: 'success',
                });
            })
            .catch(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('checkout:message:addFreeItemPromoFailed'),
                    variant: 'error',
                });
            });
    };

    React.useMemo(() => {
        if (!update.loading && update.data && update.data.updateCartItems) {
            setCart({ ...update.data.updateCartItems.cart });
            setLoadingCart(false);
            setSummary({
                total_quantity: update.data.updateCartItems.cart.total_quantity,
                prices: update.data.updateCartItems.cart.custom_total_price,
            });
            setLoadingSummary(false);
        }
    }, [update.loading]);

    React.useMemo(() => {
        if (!deleteData.loading && deleteData.data && deleteData.data.removeItemFromCart) {
            setCart({ ...deleteData.data.removeItemFromCart.cart });
            setLoadingCart(false);
            setSummary({
                total_quantity: deleteData.data.removeItemFromCart.cart.total_quantity,
                prices: deleteData.data.removeItemFromCart.cart.custom_total_price,
            });
            setLoadingSummary(false);
        }
    }, [deleteData.loading]);

    // update cart with free items data
    useEffect(() => {
        if (!promoItems.loading && promoItems.data?.addProductsToCartPromo) {
            setCart({ ...promoItems.data.addProductsToCartPromo.cart });
            setSummary({
                total_quantity: promoItems.data.addProductsToCartPromo.cart.total_quantity,
                prices: promoItems.data.addProductsToCartPromo.cart.custom_total_price,
            });
        }
    }, [promoItems.loading]);

    // update cart after applying coupon code
    useEffect(() => {
        if (!appliedCouponResult.loading && appliedCouponResult.data?.applyCouponToCart) {
            setCart({ ...appliedCouponResult.data.applyCouponToCart.cart });
            setSummary({
                total_quantity: appliedCouponResult.data.applyCouponToCart.cart.total_quantity,
                prices: appliedCouponResult.data.applyCouponToCart.cart.custom_total_price,
            });
        }
    }, [appliedCouponResult.loading]);

    // update cart after removing coupon code
    useEffect(() => {
        if (!removedCouponResult.loading && removedCouponResult.data?.removeCouponFromCart) {
            setCart({ ...removedCouponResult.data.removeCouponFromCart.cart });
            setSummary({
                total_quantity: removedCouponResult.data.removeCouponFromCart.cart.total_quantity,
                prices: removedCouponResult.data.removeCouponFromCart.cart.custom_total_price,
            });
        }
    }, [removedCouponResult.loading]);

    // GTM UA dataLayer
    React.useMemo(() => {
        if (cart.items.length > 0) {
            const dataLayer = {
                pageName: t('cart:pageTitle'),
                pageType: 'cart',
                ecommerce: {
                    currency: storeConfig && storeConfig.base_currency_code ? storeConfig.base_currency_code : 'IDR',
                },
                event: 'impression',
                eventCategory: 'Ecommerce',
                eventAction: 'Impression',
                eventLabel: 'cart',
            };
            TagManager.dataLayer({ dataLayer });
        }
    }, [cart.items.length]);

    // GA 4 dataLayer
    React.useMemo(() => {
        if (summary.id && cart.items.length > 0) {
            const dataLayer = {
                pageName: t('cart:pageTitle'),
                pageType: 'cart',
                event: 'view_cart',
                cart_total: summary.prices.grand_total.value,
                currency: summary.prices.grand_total.currency || storeConfig.base_currency_code,
                ecommerce: {
                    items: [
                        cart.items.map((item) => ({
                            currency: item.custom_price.price_incl_tax.currency || storeConfig.base_currency_code,
                            item_name: item.product.name,
                            item_id: item.product.sku,
                            price: item.custom_price.price_incl_tax.value || 0,
                            // item_category: item.product.categories.length > 0 ? item.product.categories[0].name : '',
                            // item_list_name: item.product.categories.length > 0 ? item.product.categories[0].name : '',
                            quantity: item.quantity,
                            item_stock_status: item.product.stock_status,
                        })),
                    ],
                },
            };
            TagManager.dataLayer({ dataLayer });
        }
    }, [cart.items.length, summary.id]);

    // add to wishlist
    const [addWishlist] = mutationWishlist();
    const handleFeed = (itemProps) => {
        if (isLogin && isLogin == 1) {
            // GTM UA dataLayer
            TagManager.dataLayer({
                dataLayer: {
                    event: 'addToWishlist',
                    eventLabel: itemProps.product.name,
                    label: itemProps.product.name,
                    ecommerce: {
                        currencyCode: itemProps.prices?.price.currency || itemProps.custom_price?.price_incl_tax.currency,
                        add: {
                            products: [
                                {
                                    name: itemProps.product.name,
                                    id: itemProps.product.sku,
                                    price: itemProps.prices?.price.value || itemProps.custom_price?.price_incl_tax.value || 0,
                                    // category: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                                    // list: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                                    dimensions4: itemProps.product.stock_status,
                                },
                            ],
                        },
                    },
                },
            });
            // GA 4 dataLayer
            TagManager.dataLayer({
                dataLayer: {
                    ecommerce: {
                        action: {
                            items: [
                                {
                                    currency: itemProps.prices?.price.currency || itemProps.custom_price?.price_incl_tax.currency,
                                    item_name: itemProps.product.name,
                                    item_id: itemProps.product.sku,
                                    price: itemProps.prices?.price.value || itemProps.custom_price?.price_incl_tax.value || 0,
                                    // item_category: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                                    item_stock_status: itemProps.product.stock_status,
                                },
                            ],
                        },
                    },
                    event: 'add_to_wishlist',
                },
            });
            window.backdropLoader(true);
            addWishlist({
                variables: {
                    productId: parseInt(itemProps.product.id, 10),
                },
            })
                .then(async () => {
                    deleteItem(itemProps);
                    await window.toastMessage({ open: true, variant: 'success', text: t('cart:addWishlistSuccess') });
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('cart:addWishlistFailed'),
                    });
                    window.backdropLoader(false);
                });
        } else {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: t('cart:addWishlistWithoutLogin'),
            });
        }
    };

    if (loadingCart) {
        return (
            <Layout pageConfig={config} {...props}>
                <Backdrop open />
                <Skeleton />
            </Layout>
        );
    }

    const globalCurrency = storeConfig.default_display_currency_code;

    const contentProps = {
        dataCart: cart,
        dataSummary: summary,
        loadingSummary,
        t,
        handleFeed,
        toggleEditMode,
        editMode,
        deleteItem,
        toggleEditDrawer,
        // crosssell,
        editItem,
        openEditDrawer,
        updateItem,
        storeConfig,
        globalCurrency,
        errorCart,
        handleAddPromoItemToCart,
        applyCoupon,
        removeCoupon,
    };
    return (
        <Layout pageConfig={config} {...props} showRecentlyBar={false}>
            <Content currencyCache={currencyCache} {...other} {...contentProps} />
        </Layout>
    );
};

export default Cart;
