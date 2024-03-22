/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
const { GraphQLClient, gql } = require('graphql-request');
const { getCookies } = require('cookies-next');
const { graphqlEndpoint, storeCode, customerTokenKey } = require('../../../../swift.config');

const { getAppEnv, getAccessEnv } = require('../../../helpers/env');

function requestGraph(query, variables = {}, context = {}, config = {}) {
    let token = '';
    let tokenAuth = '';
    if (config?.token) {
        if (query.includes('snap_client_key')) {
            tokenAuth = `Bearer ${getAccessEnv()}`;
        } else {
            token = `Bearer ${config.token}`;
        }
    } else if (context?.req?.cookies || context?.req?.headers) {
        const cookies = getCookies({ req: context?.req, res: context?.req });
        if (query.includes('snap_client_key')) {
            tokenAuth = `Bearer ${getAccessEnv()}`;
        } else {
            token = cookies[customerTokenKey]
                ? cookies[customerTokenKey]
                : '';
            token = `Bearer ${token}`;
        }
    } else if (query.includes('snap_client_key')) {
        tokenAuth = `Bearer ${getAccessEnv()}`;
    }
    const additionalHeader = storeCode ? { store: storeCode } : {};
    if (token && token !== '') {
        additionalHeader.Authorization = token;
    }

    if (tokenAuth && tokenAuth !== '') {
        additionalHeader.Authentication = tokenAuth;
    }

    const headers = {
        ...additionalHeader,
    };
    if (config.method && config.method === 'GET') {
        return new Promise((resolve) => {
            const appEnv = getAppEnv();

            const graphQLClient = new GraphQLClient(`${graphqlEndpoint[appEnv] || graphqlEndpoint.prod}`, {
                method: 'GET',
                jsonSerializer: {
                    parse: JSON.parse,
                    stringify: JSON.stringify,
                },
            });

            const req = gql`${query}`;
            graphQLClient.request(req, variables).then((data) => {
                resolve(data);
            }).catch((err) => resolve(err));
        });
    }
    return new Promise((resolve) => {
        const appEnv = getAppEnv();
        const client = new GraphQLClient(`${graphqlEndpoint[appEnv] || graphqlEndpoint.prod}`, {
            headers,
        });
        client
            .request(query, variables)
            .then((data) => resolve(data))
            .catch((err) => resolve(err));
    });
}

module.exports = requestGraph;
