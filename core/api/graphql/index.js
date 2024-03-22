import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import internalSchema from '@core/api/graphql/schema';

import { schemaFromExecutor } from '@graphql-tools/wrap';
import { stitchSchemas } from '@graphql-tools/stitch';
import { customerTokenKey, graphqlEndpoint, storeCode } from '@config';
import { getAccessEnv, getAppEnv } from '@core/helpers/env';

import { print } from 'graphql';
import fetchWithTimeout from '@core/helpers/fetchWithTimeout';

import { getCookies } from 'cookies-next';

const remoteExecutor = async (param) => {
    try {
        const {
            document, variables, context,
        } = param;
        const query = print(document);
        const appEnv = getAppEnv();
        const url = graphqlEndpoint[appEnv] || graphqlEndpoint.prod;
        const additionalHeader = {};

        let token = '';
        let checkoutToken = '';
        let store_code_storage = '';
        let adminId = '';

        if (context?.req) {
            const cookies = getCookies({ req: context?.req, res: context?.req });
            if (cookies && cookies[customerTokenKey]) {
                token = cookies[customerTokenKey];
            }

            if (cookies && cookies.store_code_storage) {
                store_code_storage = cookies.store_code_storage;
            }

            if (cookies && cookies.adminId) {
                adminId = context.cookies.admin_id;
            }

            if (cookies && cookies.checkoutToken) {
                checkoutToken = cookies.checkoutToken;
            }
        }

        additionalHeader.Authentication = `Bearer ${getAccessEnv()}`;

        if (storeCode !== '') {
            additionalHeader.store = storeCode;
        } else if (store_code_storage && store_code_storage !== '' && storeCode === '') {
            additionalHeader.store = store_code_storage;
        }
        if (token && token !== '') {
            additionalHeader.Authorization = `Bearer ${token}`;
        }

        additionalHeader.Authentication = `Bearer ${getAccessEnv()}`;

        if (checkoutToken && checkoutToken !== '') {
            additionalHeader['Checkout-Token'] = checkoutToken;
        }
        if (adminId !== undefined && adminId !== '') {
            const admin = parseInt(JSON.parse(adminId)[0], 10);
            additionalHeader['Admin-Id'] = admin;
        }

        const fetchResult = await fetchWithTimeout(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...additionalHeader,
            },
            body: JSON.stringify({ query, variables }),
        });

        if (fetchResult && fetchResult.json) {
            const response = await fetchResult.json();
            if (response.errors) {
                const err = response.errors[0];
                if (err.extensions.category === 'graphql-authorization') {
                    return {
                        errors: [
                            {
                                message: err.extensions.category,
                                extensions: err.extensions,
                            },
                        ],
                        data: response.data,
                    };
                }
                return {
                    errors: [
                        {
                            message: err.message,
                            extensions: err.extensions,
                        },
                    ],
                    data: response.data,
                };
            }
            return response;
        }
        return fetchResult;
    } catch (error) {
        console.error('There was an uncaught error', error);
        // process.exit(1); // mandatory (as per the Node docs)
        return {
            errors: [
                {
                    message: error,
                    extensions: null,
                },
            ],
            data: null,
        };
    }
};

const postsSubschema = async () => ({
    schema: await schemaFromExecutor(remoteExecutor),
    executor: remoteExecutor,
});

const createApolloServer = async () => {
    const schema = await postsSubschema();
    const gatewaySchema = stitchSchemas({
        subschemas: [schema, internalSchema],
    });
    return new ApolloServer({
        schema: gatewaySchema,
    });
};

const graphqlApi = async (req, res) => {
    const apolloServer = await createApolloServer();

    const handler = await startServerAndCreateNextHandler(apolloServer, {
        context: (request, response) => ({ req: request, res: response }),
    });

    return handler(req, res);
};

export default graphqlApi;
