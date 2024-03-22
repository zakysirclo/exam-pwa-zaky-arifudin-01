module.exports = {
    apps: [{
        name: 'swift-pwa',
        script: './server.js',
        env: {
            NODE_ENV: 'production',
            APP_ENV: 'prod',
            NODE_TLS_REJECT_UNAUTHORIZED: 0,
        },
    }],
};
