import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import * as schemaCategory from '@core_modules/catalog/services/graphql/categorySchema';
import * as productSchema from '@core_modules/catalog/services/graphql/productSchema';

/**
 * Function Get Product Schema
 * @param config Object Config like variables
 * @param otherConfig Object config useQuery like context
 * @param router router Object from nextjs (useRouter hook)
 * @returns Schema get product
 */
export const getProduct = (config, otherConfig = {}, router) =>
    useQuery(productSchema.getProduct(config, router), {
        ...otherConfig,
    });
export const getProductPrice = (config, otherConfig = {}, router) =>
    useLazyQuery(productSchema.getProductPrice(config, router), {
        ...otherConfig,
        fetchPolicy: 'no-cache',
    });
export const getProductAggregations = (options) =>
    useQuery(productSchema.getProductAggregations(), {
        ...options,
    });
export const getCategory = (variables) => useQuery(schemaCategory.getCategory(variables), {});
export const getCategoryProducts = (variables) =>
    useQuery(schemaCategory.getCategoryProducts(variables), {
        context: {
            request: 'internal',
        },
    });
export const getFilter = (catId) => useQuery(schemaCategory.getFilter(catId), { ssr: true });
export const addWishlist = () =>
    useMutation(productSchema.addWishlist, {
        context: {
            request: 'internal',
        },
    });

export const getDetailProduct = (config = {}, options = {}) =>
    useLazyQuery(productSchema.getDetailProduct(config), {
        fetchPolicy: 'no-cache',
        extFetchPolicy: 'no-cache',
        ...options,
    });

export const getDetailProductPrice = (config = {}) =>
    useLazyQuery(productSchema.getDetailProductPrice(config), {
        fetchPolicy: 'no-cache',
        extFetchPolicy: 'no-cache',
    });

export const getSeller = (options = {}) =>
    useLazyQuery(productSchema.getSeller, {
        ...options,
    });

export const getPwaConfig = () => useQuery(schemaCategory.configpwa);

export default { getCategory, getCategoryProducts, getSeller };
