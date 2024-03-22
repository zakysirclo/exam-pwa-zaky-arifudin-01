const crypto = require('crypto');

const iv = process.env.NEXT_PUBLIC_ENCRYPTION_KEY.substr(0, 16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(process.env.NEXT_PUBLIC_ALGORITHM, process.env.NEXT_PUBLIC_ENCRYPTION_KEY, iv);
    let crypted = cipher.update(text, 'utf8', 'base64');
    crypted += cipher.final('base64');
    return crypted;
};

const decrypt = (text) => {
    const decipher = crypto.createDecipheriv(process.env.NEXT_PUBLIC_ALGORITHM, process.env.NEXT_PUBLIC_ENCRYPTION_KEY, iv);
    let dec = decipher.update(text, 'base64', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

module.exports = {
    encrypt,
    decrypt,
};
