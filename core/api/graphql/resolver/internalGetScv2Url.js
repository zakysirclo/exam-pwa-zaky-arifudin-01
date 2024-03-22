/* eslint-disable no-param-reassign */
const requestGraph = require('../request');

const query = `
    mutation getCheckoutScv2Url($cartId: String!) {
        generateSwiftCheckoutUrl (
            cart_id : $cartId
        ) {
            scv2url
        }
    }
`;

const internalGetScv2Url = async (parent, args, context) => {
    const variables = {
        cartId: args.cart_id,
    };
    const res = await requestGraph(query, variables, context);
    if (res.generateSwiftCheckoutUrl) {
        return {
            url: res.generateSwiftCheckoutUrl.scv2url,
        };
    }
    return res;
};

module.exports = internalGetScv2Url;
