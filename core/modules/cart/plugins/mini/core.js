/* eslint-disable radix */
import { getCartId } from '@helper_cartid';
import { useMutation } from '@apollo/client';
import { currencyVar } from '@core/services/graphql/cache';
import { getMiniCartData } from '@core_modules/cart/services/graphql';
import * as Schema from '@core_modules/cart/services/graphql/schema';
import TagManager from 'react-gtm-module';

const MiniCart = (props) => {
    const {
        Content, open, setOpen, count, t, storeConfig,
    } = props;
    // cache currency
    const currencyCache = currencyVar();
    const [cart, setCart] = React.useState({ items: [] });
    const [errorCart, setErrorCart] = React.useState(false);
    let loadingCart = false;
    let dataCart = null;
    let getCartData = () => {};
    const [actDeleteItem, delCart] = useMutation(Schema.deleteMiniCartItem, {
        context: {
            request: 'internal',
        },
    });
    const [actUpdateItem, update] = useMutation(Schema.updateMiniCartItem, {
        context: {
            request: 'internal',
        },
    });

    let cartId = '';
    const [getCart, data] = getMiniCartData();
    if (typeof window !== 'undefined' && open) {
        cartId = getCartId();
        if (cartId) {
            getCartData = () => getCart({
                variables: {
                    cartId,
                },
            });
            loadingCart = data.loading;
            if (!data.loading && data.data && data.data.cart) {
                const itemsCart = data.data.cart.items.filter((item) => item !== null);
                dataCart = {
                    ...data.data.cart,
                    items: itemsCart,
                };
            }
        } else {
            loadingCart = false;
        }
    }

    React.useMemo(() => {
        if (data.error) {
            const errorList = [];
            if (data.error && data.error.graphQLErrors
                && data.error.graphQLErrors.length > 0) {
                for (let idx = 0; idx < data.error.graphQLErrors.length; idx += 1) {
                    const { message } = data.error.graphQLErrors[idx];
                    const regexp = new RegExp(/stock/i);
                    if (message && regexp.test(message)) {
                        errorList.push(message);
                    }
                }
            }
            setErrorCart(errorList);
        }
    }, [data]);

    React.useMemo(() => {
        if (dataCart && dataCart.id) {
            setCart({ ...dataCart });
        }
    },
    [loadingCart]);

    React.useMemo(() => {
        if (!update.loading && update.data) {
            setCart({ ...update.data.updateCartItems.cart });
        }
    },
    [update.loading]);

    React.useMemo(() => {
        if (!delCart.loading && delCart.data) {
            setCart({ ...delCart.data.removeItemFromCart.cart });
        }
    },
    [delCart.loading]);

    if (!loadingCart && update.loading) {
        loadingCart = update.loading;
    }

    if (!loadingCart && delCart.loading) {
        loadingCart = delCart.loading;
    }

    React.useMemo(() => {
        if (open && typeof window !== 'undefined' && cartId && cartId !== '') {
            setCart({ ...{ items: [] } });
            setErrorCart([]);
            getCartData();
            loadingCart = true;
        }
    }, [open]);

    // update items
    const updateCart = (id, qty) => {
        actUpdateItem({
            variables: {
                cartId,
                cart_item_id: parseInt(id),
                quantity: qty,
            },
            context: {
                request: 'internal',
            },
        }).then(() => {
            // getCartData();
            window.toastMessage({
                open: true,
                text: t('common:cart:updateSuccess'),
                variant: 'success',
            });
        }).catch((e) => {
            window.toastMessage({
                open: true,
                text: e.message.split(':')[1] || t('common:cart:updateFailed'),
                variant: 'error',
            });
        });
    };

    const deleteCart = (itemProps) => {
        // GA 4 dataLayer
        const dataLayer = {
            event: 'remove_from_cart',
            ecommerce: {
                action: {
                    items: [
                        {
                            item_name: itemProps.product.name,
                            item_id: itemProps.product.sku,
                            price: itemProps.custom_price.price_incl_tax.value || 0,
                            // item_category: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                            // item_list_name: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                            quantity: itemProps.quantity,
                            currency: itemProps.custom_price.price_incl_tax.currency || storeConfig.base_currency_code,
                        },
                    ],
                },
            },
        };
        TagManager.dataLayer({ dataLayer });
        actDeleteItem({
            variables: {
                cartId,
                cart_item_id: parseInt(itemProps.id),
            },
            context: {
                request: 'internal',
            },
        }).then(() => {
            // getCartData();
            // loadingCart = false;
            window.toastMessage({
                open: true,
                text: t('common:cart:deleteSuccess'),
                variant: 'success',
            });
        }).catch((e) => {
            loadingCart = false;
            window.toastMessage({
                open: true,
                text: e.message.split(':')[1] || t('common:cart:deleteFailed'),
                variant: 'error',
            });
        });
    };
    return (
        <Content
            open={open}
            setOpen={setOpen}
            count={count}
            loading={loadingCart}
            data={cart}
            deleteCart={deleteCart}
            updateCart={updateCart}
            errorCart={errorCart}
            t={t}
            storeConfig={storeConfig}
            currencyCache={currencyCache}
        />
    );
};

export default MiniCart;
