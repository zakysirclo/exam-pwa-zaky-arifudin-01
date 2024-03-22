/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
const fetch = require('cross-fetch');
const { print } = require('graphql');
const { wrapSchema, introspectSchema } = require('@graphql-tools/wrap');
const { features } = require('../../../../swift.config');
const { encrypt } = require('../../../helpers/encryption');
const { getAppEnv, getChatConfigUsername, getChatConfigPassword } = require('../../../helpers/env');

const executor = async ({ document, variables, context }) => {
    try {
        const token = encrypt(`${getChatConfigUsername()}|${getChatConfigPassword()}`);
        const query = print(document);
        const appEnv = getAppEnv();
        const chatEndpoint = features.chatSystem.graphqlEndpoint[appEnv]
            || features.chatSystem.graphqlEndpoint.prod;
        const fetchResult = await fetch(chatEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify({ query, variables }),
        });
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
    } catch (error) {
        console.error('There was an uncaught error', error);
        // process.exit(1); // mandatory (as per the Node docs)
        return false;
    }
};

module.exports = async () => {
    const schema = wrapSchema({
        schema: await introspectSchema(executor),
        executor,
    });

    return schema;
};
