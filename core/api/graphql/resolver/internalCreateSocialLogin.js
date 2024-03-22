/* eslint-disable no-param-reassign */
const { serialize } = require('cookie');
const { expiredToken, customerTokenKey } = require('../../../../swift.config');
const requestGraph = require('../request');

const query = `
mutation generateCustomerTokenSocialLogin(
    $email: String!,
    $socialtoken: String!,
    $firstname: String!,
    $lastname: String!,
){
generateCustomerTokenSocialLogin(
       email: $email, 
       social_token: $socialtoken,
       firstname: $firstname,
       lastname: $lastname
 ) 
    {
        token
    }
}
`;

const internalCreateSocialLogin = async (parent, args, context) => {
    const variables = {
        email: args.input.email,
        socialtoken: args.input.socialtoken,
        firstname: args.input.firstname,
        lastname: args.input.lastname,
    };
    const res = await requestGraph(query, variables, context);
    if (res?.generateCustomerTokenSocialLogin) {
        if (context?.res) {
            const serialized = serialize(customerTokenKey, res.generateCustomerTokenSocialLogin.token, {
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

module.exports = internalCreateSocialLogin;
