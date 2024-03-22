/* eslint-disable import/prefer-default-export */
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import * as Schema from '@core_modules/cart/services/graphql/schema';

export const getCmsBlocks = (variables, others = {}) => useQuery(Schema.getCmsBlocks, {
    variables,
    ...others,
});

export const addWishlist = () => useMutation(Schema.addWishlist, {
    context: {
        request: 'internal',
    },
});

export const getCartData = (cartId) => useQuery(Schema.getCart,
    {
        variables: { cartId },
        context: {
            request: 'internal',
        },
        fetchPolicy: 'no-cache',
    });

export const getCartItem = (cartId) => useQuery(Schema.getCartItem,
    {
        variables: { cartId },
        context: {
            request: 'internal',
        },
        fetchPolicy: 'no-cache',
    });

export const getCrossellCart = (cartId, config = {}) => useQuery(Schema.getCrossellCart(config),
    {
        variables: { cartId },
        fetchPolicy: 'no-cache',
    });

export const getPriceCrossellCart = (cartId, config = {}) => useQuery(Schema.getCrossellCart(config),
    {
        context: {
            request: 'internal',
        },
        variables: { cartId },
        fetchPolicy: 'no-cache',
    });

export const getCartDataLazy = () => useLazyQuery(Schema.getCart,
    {
        context: {
            request: 'internal',
        },
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    });

export const getCartItemLazy = () => useLazyQuery(Schema.getCartItem,
    {
        context: {
            request: 'internal',
        },
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    });
export const getMiniCartData = (cartId) => useLazyQuery(Schema.getMiniCart,
    {
        variables: { cartId },
        context: {
            request: 'internal',
        },
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    });

export const getCountCart = (cartId) => useQuery(Schema.getCountCart, {
    context: {
        request: 'internal',
    },
    variables: {
        cartId,
    },
    skip: cartId === '' || typeof cartId === 'undefined',
});

export const reOrder = () => useMutation(Schema.reOrder, {
    context: {
        request: 'internal',
    },
});

export const cancelAndReOrder = () => useMutation(Schema.cancelAndReOrder, {
    context: {
        request: 'internal',
    },
});

export const deleteCartItem = () => useMutation(Schema.deleteCartItemOnPage, {
    context: {
        request: 'internal',
    },
});

export const updateMiniCartItem = () => useMutation(Schema.updateMiniCartItem, {
    context: {
        request: 'internal',
    },
});

export const updateCartitem = () => useMutation(Schema.updateCartitem, {
    context: {
        request: 'internal',
    },
});

export const updateCartItemNote = () => useMutation(Schema.updateCartItemNote, {
    context: {
        request: 'internal',
    },
});

export const applyCouponToCart = (options = {}) => useMutation(Schema.applyCouponToCart, {
    ...options,
    context: {
        request: 'internal',
    },
});

export const removeCouponFromCart = (options = {}) => useMutation(Schema.removeCouponFromCart, {
    ...options,
    context: {
        request: 'internal',
    },
});

export const addProductToCartPromo = () => useMutation(Schema.addProductsToPromoCart, {
    context: {
        request: 'internal',
    },
});

export const getCheckoutScv2Url = () => useMutation(Schema.getCheckoutScv2Url, {
    context: {
        request: 'internal',
    },
});
