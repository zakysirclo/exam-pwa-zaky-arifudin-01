const NextI18Next = require('next-i18next').default;
const path = require('path');
const { translation, basePath } = require('../../swift.config');

module.exports = new NextI18Next({
    otherLanguages: translation.languages.filter((lang) => lang !== translation.defaultLanguage),
    defaultLanguage: translation.defaultLanguage,
    fallbackLng: translation.languages,
    localePath: path.resolve(path.join('public', basePath, '/static/locales')),
    detection: {
        lookupCookie: 'next-i18next',
        order: ['cookie', 'querystring', 'localStorage', 'path', 'subdomain'],
        caches: ['cookie'],
    },
});
