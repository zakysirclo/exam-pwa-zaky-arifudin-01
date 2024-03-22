/* eslint-disable import/no-extraneous-dependencies */
import {
    ApolloClient, ApolloLink, from, HttpLink, InMemoryCache,
} from '@apollo/client';
import { getAppEnv } from '@helpers/env';
import { removeIsLoginFlagging } from '@helper_auth';
import { removeCartId } from '@helper_cartid';
import { removeCookies } from '@core/helpers/cookies';
import {
    graphqlEndpoint, HOST, storeCode, requestTimeout,
} from '@root/swift.config.js';
import { onError } from 'apollo-link-error';
import { RetryLink } from 'apollo-link-retry';
import firebase from 'firebase/app';
import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';
import cookies from 'js-cookie';
import ApolloLinkTimeout from './apolloLinkTimeout';

const { publicRuntimeConfig } = getConfig();

const appEnv = getAppEnv();

const uri = graphqlEndpoint[appEnv] ? graphqlEndpoint[appEnv] : graphqlEndpoint.dev;

const host = HOST[appEnv] ? HOST[appEnv] : HOST.dev;

const uriInternal = `${host}/api/graphql`;
// handle if token expired
const logoutLink = onError((err) => {
    const { graphQLErrors, networkError } = err;
    const isErrorGQL = graphQLErrors && graphQLErrors.length > 0;
    const message = isErrorGQL ? graphQLErrors[0].message : undefined;
    if (networkError && typeof window !== 'undefined' && isErrorGQL && graphQLErrors[0].status > 500) {
        window.location.href = '/maintenance';
    } else if (
        (isErrorGQL && graphQLErrors[0].status === 401 && typeof window !== 'undefined')
        || (message && message.includes('The request is allowed for logged in customer'))
        || (message && message.includes("The current customer isn't authorized."))
    ) {
        removeCartId();
        removeIsLoginFlagging();
        removeCookies('uid_product_compare');
        if (publicRuntimeConfig && publicRuntimeConfig.firebaseApiKey !== '') {
            firebase
                .auth()
                .signOut()
                .then(() => { })
                .catch(() => { });
        }
        // reference https://stackoverflow.com/questions/10339567/javascript-clear-cache-on-redirect
        window.location.href = `/customer/account/login?n=${new Date().getTime()}`;
    }
});

const timeoutLink = new ApolloLinkTimeout(requestTimeout); // 10 second timeout

const link = new RetryLink().split(
    (operation) => operation.getContext().request === 'internal',
    new HttpLink({
        uri: uriInternal, // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch,
    }),
    new HttpLink({
        uri, // Server URL (must be absolute)
        credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        fetch,
        useGETForQueries: true,
    }),
);

export default function createApolloClient(initialState, ctx) {
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    let store_code_storage = cookies.get('store_code_storage');
    if (ctx && ctx.req) {
        if (typeof window === 'undefined') {
            store_code_storage = ctx.req.cookies.store_code_storage || store_code_storage;
        }
    }

    /**
     * Meddleware to customize headers
     */
    const middlewareHeader = new ApolloLink((operation, forward) => {
        const additionalHeader = {};

        if (storeCode !== '') {
            additionalHeader.store = storeCode;
        } else if (store_code_storage && store_code_storage !== '' && storeCode === '') {
            additionalHeader.store = store_code_storage;
        }
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                ...additionalHeader,
            },
        }));

        return forward(operation);
    });

    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: from([timeoutLink, middlewareHeader, logoutLink, link]),
        cache: new InMemoryCache({
            possibleTypes: {
                ProductInterface: [
                    'ConfigurableProduct', 'SimpleProduct', 'BundleProduct',
                    'VirtualProduct', 'DownloadableProduct', 'GroupedProduct',
                    'AwGiftCardProduct',
                ],
            },
            typePolicies: {
                Query: {
                    fields: {
                        products: {
                            merge(existing = [], incoming) {
                                return { ...existing, ...incoming };
                            },
                        },
                    },
                },

                ProductImage: {
                    keyFields: ['url'],
                },
            },
        }).restore(initialState),
        // reference https://www.apollographql.com/docs/react/development-testing/developer-tooling/#apollo-client-devtools
        // eslint-disable-next-line no-underscore-dangle
        connectToDevTools: typeof window !== 'undefined' && window.__APOLLO_CLIENT__ && appEnv === 'local',
        resolvers: {},
    });
}
