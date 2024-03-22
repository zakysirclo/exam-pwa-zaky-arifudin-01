/* eslint-disable no-param-reassign */
const { serialize } = require('cookie');
const { expiredToken } = require('../../../../swift.config');
const requestGraph = require('../request');

const query = `
    mutation setCheckoutSession($cartId: String!) {
        setCheckoutSession(
            input: {
                cart_id: $cartId
            }
        ) {
            checkout_token
        }
    }
`;

const internalGenerateCartTokenSession = async (parent, args, context) => {
    const variables = {
        cartId: args.input.cart_id,
    };
    const res = await requestGraph(query, variables, context);
    if (res.setCheckoutSession) {
        if (context?.res) {
            const serialized = serialize('checkoutToken', res.setCheckoutSession.checkout_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: expiredToken,
                path: '/',
            });
            context.res.setHeader('Set-Cookie', serialized);
        }
        return {
            message: `Checkout Token for cart ${variables.cartId} is created`,
        };
    }
    return res;
};

module.exports = internalGenerateCartTokenSession;
