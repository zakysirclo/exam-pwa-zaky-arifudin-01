/* eslint-disable no-param-reassign */
const { serialize } = require('cookie');
const { customerTokenKey } = require('../../../../swift.config');
const requestGraph = require('../request');

const query = `
mutation {
    revokeCustomerToken {
        result
    }
}
`;

const internalDeleteCustomerToken = async (parent, args, context) => {
    const res = await requestGraph(query, { }, context);
    if (res.revokeCustomerToken) {
        if (context?.res) {
            const serialized = serialize(customerTokenKey, '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 0,
                path: '/',
            });
            context.res.setHeader('Set-Cookie', serialized);
        }
        return {
            result: true,
        };
    }
    return {
        result: false,
    };
};

module.exports = internalDeleteCustomerToken;
