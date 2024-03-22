import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@core_modules/order/services/graphql/schema';

export const getPaymentInformation = (params) => useQuery(Schema.getPaymentInformation, {
    context: {
        request: 'internal',
    },
    variables: params,
});

export const getOrder = (params) => useQuery(Schema.getCustomerOrder, {
    context: {
        request: 'internal',
    },
    variables: params,
});
export const getOrderDownloadable = () => useQuery(Schema.getCustomerOrderDownloadable, {
    context: {
        request: 'internal',
    },
});

export const getOrderDetail = (params) => useQuery(Schema.getCustomerOrderDetail, {
    context: {
        request: 'internal',
    },
    variables: params,
});

export const reOrder = () => useMutation(Schema.reOrder, {
    context: {
        request: 'internal',
    },
});

export const getTrackingOrder = (params) => useQuery(Schema.getTrackingOrder, {
    context: {
        request: 'internal',
    },
    variables: params,
    skip: typeof window === 'undefined',
    fetchPolicy: 'network-only',
});

export default {
    getOrder,
    reOrder,
};
