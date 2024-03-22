import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const getAppEnv = () => {
    if (typeof window !== 'undefined') {
        const { appEnv } = publicRuntimeConfig;
        return appEnv;
    }

    return process.env.APP_ENV;
};

const getAccessEnv = () => process.env.ACCESS_KEY;

const getChatConfigUsername = () => process.env.CHAT_CONFIG_USERNAME;

const getChatConfigPassword = () => process.env.CHAT_CONFIG_PASSWORD;

const getEncryptEnv = () => process.env.ENCRYPTION_KEY;

module.exports = {
    getAppEnv,
    getAccessEnv,
    getChatConfigUsername,
    getChatConfigPassword,
    getEncryptEnv,
};
