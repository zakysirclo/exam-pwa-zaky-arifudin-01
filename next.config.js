/* eslint-disable import/no-extraneous-dependencies */
const { createSecureHeaders } = require('next-secure-headers');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const withPWA = require('next-pwa')({
    dest: 'public',
    swSrc: 'core/public/sw.js',
    sw: 'sw.js',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
});
const { i18n } = require('./next-i18next.config');
const {
    basePath, assetsVersion, graphqlEndpoint, features,
} = require('./swift.config');

const baseHostUrl = graphqlEndpoint[process.env.APP_ENV];

module.exports = withPWA({
    i18n,
    basePath,
    // Secure Header
    async headers() {
        return [{ source: '/(.*)', headers: createSecureHeaders() }];
    },
    // Disable X-Powered-By
    poweredByHeader: false,
    productionBrowserSourceMaps: true,
    publicRuntimeConfig: {
        appEnv: process.env.APP_ENV,
        rootDir: __dirname,
        firebaseApiKey: process.env.FIREBASE_API_KEY,
    },
    // Images
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: features.thumbor.domainThumborConfig,
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: baseHostUrl.replace('http://', '').replace('https://', '').replace('/graphql', ''),
                port: '',
                pathname: '/**',
            },
        ],
    },
    // Webpack
    webpack: (config, { isServer, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        // Important: return the modified config
        // config.plugins.push(new BundleAnalyzerPlugin({
        //     analyzerMode: 'static',
        //     reportFilename: './analyze/client.html',
        // }));
        config.plugins.push(
            new webpack.ProvidePlugin({
                React: 'react',
            }),
        );
        if (!isServer) {
            // eslint-disable-next-line no-param-reassign
            config.resolve.alias['@sentry/node'] = '@sentry/browser';
        }

        config.module.rules.push({
            test: /\.(graphql|gql)/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
        });

        return config;
    },
    // generateInDevMode: true, // please comment if develop to production
    async rewrites() {
        return [
            {
                source: `${basePath}/firebase-messaging-sw.js`,
                destination: `/static/firebase/firebase-messaging-sw.${assetsVersion}.js`,
            },
            {
                source: `${basePath}/.well-known/assetlinks.json`,
                destination: '/static/assetlinks.json',
            },
            {
                source: `${basePath}/maintenance`,
                destination: '/static/maintenance.html',
            },
            {
                source: `${basePath}/manifest.json`,
                destination: '/manifest.json',
            },
            {
                source: `${basePath}/favicon.ico`,
                destination: '/favicon.ico',
            },
            {
                source: `${basePath}/sitemap.xml`,
                destination: '/api/sitemap',
            },
            {
                source: `${basePath}/captcha-validation`,
                destination: '/api/captcha-validation',
            },

            {
                source: `${basePath}/auth/fcm-token`,
                destination: '/api/auth/fcm-token',
            },

            {
                source: `${basePath}/paypal/detail-transaction`,
                destination: '/api/paypal/detail-transaction',
            },
            {
                source: `${basePath}/geocoding-services`,
                destination: '/api/geocoding-services',
            },
        ];
    },
    // enable code below on Prod and increase the version everytime before running build script
    // generateBuildId: async () => 'swift-pwa-v1.0.0',
});
