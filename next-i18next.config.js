/** @type {import('next-i18next').UserConfig} */
const path = require('path');
const { translation, basePath } = require('./swift.config');

module.exports = ({
    i18n: {
        localeDetection: false,
        defaultLocale: translation.defaultLanguage,
        locales: [...translation.languages],
    },
    fallbackLng: {
        default: translation.languages,
    },
    localePath: path.resolve(path.join('public', basePath, '/static/locales')),
    detection: {
        lookupCookie: 'next-i18next',
        order: ['cookie', 'querystring', 'localStorage', 'path', 'subdomain'],
        caches: ['cookie'],
    },
});
