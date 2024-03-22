/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
const { GraphQLClient } = require('graphql-request');
const { graphqlEndpoint, storeCode, customerTokenKey } = require('../../../../swift.config');
const { getAppEnv } = require('../../../helpers/env');

function gqlSSR(query, variables = {}, context = {}, config = {}) {
    let token = '';
    if (context.session || context.headers) {
        token = context.cookies[customerTokenKey]
            ? context.cookies[customerTokenKey]
            : context.headers.authorization
                ? context.headers.authorization
                : '';
    }
    const additionalHeader = storeCode ? { store: storeCode } : {};
    if (token && token !== '') {
        additionalHeader.Authorization = token;
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

            const req = query;
            graphQLClient
                .request(req, variables)
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => resolve(err));
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

module.exports = gqlSSR;
