const { serialize } = require('cookie');
const { expiredToken, customerTokenKey } = require('../../../../swift.config');
const { decrypt } = require('../../../helpers/encryption');
const requestGraph = require('../request');

const query = `
{
    customer {
      email
    }
  }
`;

const decryptState = (state) => {
    const raw = decrypt(state);
    const res = raw.split('|');
    const token = res[0];
    const cartId = res[1];
    const storeCode = res[2] ? res[2] : '';
    const redirect_path = res[3] ? res[3] : '/';
    const adminId = res[4] ? res[4] : '';

    const result = {
        token,
        cartId,
        redirect_path,
        storeCode,
        adminId,
    };
    return result;
};

const internalGenerateSession = async (parent, { state }, context) => {
    const {
        token, cartId, redirect_path, storeCode, adminId,
    } = decryptState(state);
    if (token && token !== '') {
        const res = await requestGraph(query, { }, context, { token });
        if (res.response && res.response.errors) {
            return {
                result: false,
                cartId,
                isLogin: false,
                redirect_path,
                storeCode,
                adminId,
            };
        }
        if (context?.res) {
            const serialized = serialize(customerTokenKey, token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: expiredToken,
                path: '/',
            });
            context.res.setHeader('Set-Cookie', serialized);
        }
        return {
            result: true,
            cartId,
            isLogin: !!token,
            redirect_path,
            storeCode,
            adminId,
        };
    }
    if (typeof state !== 'undefined' && state) {
        if (token && token !== '') {
            if (context?.res) {
                const serialized = serialize(customerTokenKey, token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: expiredToken,
                    path: '/',
                });
                context.res.setHeader('Set-Cookie', serialized);
            }
        }
        return {
            result: true,
            cartId,
            isLogin: !!token,
            redirect_path,
            storeCode,
            adminId,
        };
    }
    return {
        result: false,
        cartId: null,
        isLogin: null,
        redirect_path: '/',
        storeCode,
        adminId,
    };
};

module.exports = internalGenerateSession;
