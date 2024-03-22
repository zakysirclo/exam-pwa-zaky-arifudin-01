const crypto = require('crypto');

const encrypt = (text) => {
    const iv = process.env.ENCRYPTION_KEY.substr(0, 16);
    const cipher = crypto.createCipheriv(
        process.env.ALGORITHM,
        process.env.ENCRYPTION_KEY,
        iv,
    );
    let crypted = cipher.update(text, 'utf8', 'base64');
    crypted += cipher.final('base64');
    return crypted;
};

const decrypt = (text) => {
    const iv = process.env.ENCRYPTION_KEY.substr(0, 16);
    const decipher = crypto.createDecipheriv(
        process.env.ALGORITHM,
        process.env.ENCRYPTION_KEY,
        iv,
    );
    let dec = decipher.update(text, 'base64', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

module.exports = {
    encrypt,
    decrypt,
};
