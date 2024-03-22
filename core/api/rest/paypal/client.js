/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

/**
 *
 * PayPal Node JS SDK dependency
 */
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const { getAppEnv, getAccessEnv } = require('../../../helpers/env');
const { graphqlEndpoint } = require('../../../../swift.config');

/**
 *
 * Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
 *
 */
function environment() {
    return new Promise((resolve) => {
        const query = `{
            storeConfig {
                paypal_key {
                    cancel_url
                    client_id
                    client_secret
                    disable_funding
                    intent
                    key_data
                    key_token
                    path
                    return_url
                }
            }
        }`;
        fetch(`${graphqlEndpoint[getAppEnv()]}?query=${encodeURI(query)}`, {
            method: 'GET',
            headers: {
                Authentication: `Bearer ${getAccessEnv()}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const clientId = responseJson.data.storeConfig.paypal_key.client_id;
                const clientSecret = responseJson.data.storeConfig.paypal_key.client_secret;

                resolve(new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret));
            })
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.log(err);
            });
    });
}

/**
 *
 * Returns PayPal HTTP client instance with environment that has access
 * credentials context. Use this instance to invoke PayPal APIs, provided the
 * credentials have access.
 */
function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

async function prettyPrint(jsonData, pre = '') {
    let pretty = '';
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            if (isNaN(key)) { pretty += `${pre + capitalize(key)}: `; } else { pretty += `${pre + (parseInt(key) + 1)}: `; }
            if (typeof jsonData[key] === 'object') {
                pretty += '\n';
                pretty += await prettyPrint(jsonData[key], `${pre}    `);
            } else {
                pretty += `${jsonData[key]}\n`;
            }
        }
    }
    return pretty;
}

module.exports = { client, prettyPrint };
