import { useQuery } from '@apollo/client';
import * as Schema from '@core_modules/seller/services/graphql/schema';

export const getSeller = (options = {}) =>
    useQuery(Schema.getSeller, {
        ...options,
        context: {
            request: 'internal',
        },
    });

export const getEtalase = (options = {}) =>
    useQuery(Schema.getEtalase, {
        ...options,
        context: {
            request: 'internal',
        },
    });

export const getProductBySellerId = (options = {}) =>
    useQuery(Schema.getProductBySellerId, {
        ...options,
    });

export default {
    getSeller,
    getEtalase,
    getProductBySellerId,
};
