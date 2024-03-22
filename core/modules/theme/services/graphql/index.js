/* eslint-disable import/prefer-default-export */
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import schema, { getCmsBlocks as getCmsBlocksSchema } from '@core_modules/theme/services/graphql/schema';

export const getCategories = () => useQuery(schema.categories);
export const getCategoryByName = (name) => useLazyQuery(schema.getCategoryByName(name));
export const getProduct = (key) => useLazyQuery(schema.getProduct(key));
export const getSellerByName = (name) => useLazyQuery(schema.getSellerByName(name));
export const getRecentlyProduct = () => useLazyQuery(schema.getRecentlyProduct());
export const getCurrency = () => useQuery(schema.getCurrencySchema);

export const getCustomer = () =>
    useQuery(schema.getCustomer, {
        context: {
            request: 'internal',
        },
        fetchPolicy: 'no-cache',
    });

export const getCustomerLazy = () =>
    useLazyQuery(schema.getCustomer, {
        context: {
            request: 'internal',
        },
        fetchPolicy: 'no-cache',
    });

export const getIsSubscribedCustomer = () =>
    useLazyQuery(schema.getCustomer, {
        context: {
            request: 'internal',
        },
        fetchPolicy: 'no-cache',
    });

export const removeToken = () =>
    useMutation(schema.removeToken, {
        context: {
            request: 'internal',
        },
    });

export const getCmsBlocks = (variables, options = {}) =>
    useQuery(getCmsBlocksSchema, {
        variables,
        ...options,
    });

export const getCountCart = () =>
    useLazyQuery(schema.getCountCart, {
        context: {
            request: 'internal',
        },
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    });

export const getSeller = () =>
    useLazyQuery(schema.getSeller, {
        context: {
            request: 'internal',
        },
        fetchPolicy: 'no-cache',
    });

export default {
    getCmsBlocks,
    getCategories,
    getCustomer,
    getIsSubscribedCustomer,
    removeToken,
    getProduct,
    getCategoryByName,
    getSellerByName,
    getCurrency,
    getSeller,
    getRecentlyProduct,
    getCountCart,
};
