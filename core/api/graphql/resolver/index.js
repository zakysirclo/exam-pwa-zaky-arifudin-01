/* eslint-disable no-param-reassign */
const internalGenerateCustomerToken = require('./internalGenerateCustomerToken');
const internalGenerateCustomerTokenCustom = require('./internalGenerateCustomerTokenCustom');
const internalGenerateCartTokenSession = require('./internalGenerateCartTokenSession');
const internalCreateCustomerToken = require('./internalCreateCustomerToken');
const internalGenerateCustomerTokenOtp = require('./internalGenerateCustomerTokenOtp');
const internalDeleteCustomerToken = require('./internalDeleteCustomerToken');
const internalGenerateSession = require('./internalGenerateSession');
const internalDeleteSession = require('./internalDeleteSession');
const internalCreateSocialLogin = require('./internalCreateSocialLogin');
const internalGetInstagramFeed = require('./internalGetInstagramFeed');
const internalGetScv2Url = require('./internalGetScv2Url');

const resolver = {
    Mutation: {
        internalGenerateCustomerToken,
        internalGenerateCustomerTokenCustom,
        internalGenerateCartTokenSession,
        internalCreateCustomerToken,
        internalGenerateCustomerTokenOtp,
        internalDeleteCustomerToken,
        internalGenerateSession,
        internalDeleteSession,
        internalCreateSocialLogin,
        internalGetInstagramFeed,
        internalGetScv2Url,
    },
};

module.exports = resolver;
