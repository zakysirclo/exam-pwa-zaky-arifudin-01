import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@core_modules/cms/services/graphql/schema';
import { getLoginInfo } from '@helper_auth';

let isLogin = 0;
if (typeof window !== 'undefined') {
    isLogin = getLoginInfo();
}

export const getCmsPage = (variables) => useQuery(Schema.getCmsPage, {
    variables,
    ssr: true,
    ...(isLogin && { fetchPolicy: 'network-only' }),
});
export const getInstagramToken = () => useLazyQuery(Schema.getInstagramToken);

export const getPageBuilderTemplate = (variables) => useQuery(Schema.getPageBuilderTemplate, {
    variables,
});

// mutation
export const getInstagramFeed = () => useMutation(Schema.getInstagramFeed, {
    context: {
        request: 'internal',
    },
});

export const getCmsBlocks = (variables) => useQuery(Schema.getCmsBlocks, {
    variables,
    context: {
        request: isLogin ? 'internal' : '',
    },
    fetchPolicy: isLogin ? 'network-only' : '',
});

export const getProductReviews = (variables) => useQuery(Schema.getProductReviews, { variables });
export const getProductList = (options = {}) => (
    useLazyQuery(Schema.getProductList, {
        ...options,
    })
);

export const getPriceProductList = () => (
    useLazyQuery(Schema.getPriceProductList, {
        context: {
            request: 'internal',
        },
    })
);

export const getProductPrice = (variables) => (
    useLazyQuery(Schema.getProductPrice,
        {
            variables,
            context: {
                request: isLogin ? 'internal' : '',
            },
            fetchPolicy: 'no-cache',
        })
);
export const getCategories = (variables) => useQuery(Schema.getCategories, { variables });

export default { getCmsPage };
