const { serialize } = require('cookie');
const { customerTokenKey } = require('../../../../swift.config');

const internalDeleteSession = async (parent, args, context) => {
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
};

module.exports = internalDeleteSession;
