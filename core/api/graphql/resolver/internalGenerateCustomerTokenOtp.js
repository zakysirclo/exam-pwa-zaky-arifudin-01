/* eslint-disable no-param-reassign */
const { serialize } = require('cookie');
const { expiredToken, customerTokenKey } = require('../../../../swift.config');
const requestGraph = require('../request');

const query = `
    mutation getToken(
        $username: String!,
        $otp: String!,
    ) {
        generateCustomerTokenCustom(username: $username, otp: $otp){
        token
        }
    }
`;

const internalGenerateCustomerTokenOtp = async (parent, { username, otp }, context) => {
    const res = await requestGraph(query, { username, otp }, context);
    if (res?.generateCustomerTokenCustom) {
        if (context?.res) {
            const serialized = serialize(customerTokenKey, res.generateCustomerTokenCustom.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: expiredToken,
                path: '/',
            });
            context.res.setHeader('Set-Cookie', serialized);
        }
        return {
            is_login: true,
            originalToken: '',
            token: '',
            message: 'success',
        };
    }
    return {
        is_login: false,
        originalToken: '',
        token: '',
        message: 'failed',
    };
};

module.exports = internalGenerateCustomerTokenOtp;
