/* eslint-disable no-param-reassign */
const { serialize } = require('cookie');
const { expiredToken, customerTokenKey } = require('../../../../swift.config');
const requestGraph = require('../request');

const query = `
    mutation register(
        $firstName: String!,
        $lastName: String,
        $email: String!,
        $gender: Int,
        $dob: String,
        $password: String!,
        $phoneNumber: String,
        $subscribe: Boolean,
        $otp: String,
        $whatsapp_number: String,
    ) {
        createCustomerCustom(
            input: {
              firstname: $firstName,
              lastname: $lastName,
              email: $email,
              gender: $gender,
              date_of_birth: $dob,
              password: $password,
              phonenumber: $phoneNumber,
              is_subscribed: $subscribe,
              otp: $otp,
              whatsapp_number: $whatsapp_number,
            }
          ) {
            token
            is_email_confirmation
        }
    }
`;

const internalCreateCustomerToken = async (parent, args, context) => {
    const variables = {
        firstName: args.input.firstname,
        lastName: args.input.lastname,
        email: args.input.email,
        gender: args.input.gender,
        dob: args.input.date_of_birth,
        password: args.input.password,
        phoneNumber: args.input.phonenumber,
        subscribe: args.input.is_subscribe,
        otp: args.input.otp,
        whatsapp_number: args.input.whatsapp_number,
    };
    const res = await requestGraph(query, variables, context);
    if (res.createCustomerCustom) {
        if (context?.res) {
            const serialized = serialize(customerTokenKey, res.createCustomerCustom.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: expiredToken,
                path: '/',
            });
            context.res.setHeader('Set-Cookie', serialized);
        }
        return {
            is_email_confirmation: res.createCustomerCustom.is_email_confirmation,
            originalToken: '',
            token: '',
            message: 'success',
        };
    }
    return res;
};

module.exports = internalCreateCustomerToken;
