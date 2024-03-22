const qs = require('querystring');
const { getAppEnv } = require('../../helpers/env');
const { recaptchaConfig } = require('../../services/graphql/schema/recaptcha_config');
const { graphqlEndpoint } = require('../../../swift.config');

module.exports = async (req, res) => {
    let secret;
    const { response } = req.body;
    const appEnv = await getAppEnv();
    const query = recaptchaConfig;

    try {
        const fetchResult = await fetch(graphqlEndpoint[appEnv], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const result = await fetchResult.json();

        if (appEnv === 'local') {
            secret = result
                && result.data
                && result.data.storeConfig
                && result.data.storeConfig.pwa
                && result.data.storeConfig.pwa.recaptcha_server_key_local;
        } else if (appEnv === 'dev') {
            secret = result
                && result.data
                && result.data.storeConfig
                && result.data.storeConfig.pwa
                && result.data.storeConfig.pwa.recaptcha_server_key_dev;
        } else if (appEnv === 'stage') {
            secret = result
                && result.data
                && result.data.storeConfig
                && result.data.storeConfig.pwa
                && result.data.storeConfig.pwa.recaptcha_server_key_stage;
        } else if (appEnv === 'prod') {
            secret = result
                && result.data
                && result.data.storeConfig
                && result.data.storeConfig.pwa
                && result.data.storeConfig.pwa.recaptcha_server_key_prod;
        }

        await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'post',
            body: qs.stringify({
                response,
                secret,
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
            .then((data) => data.json())
            .then((json) => {
                res.status(200).json(json);
            })
            .catch((err) => res.status(500).json(err));
    } catch (error) {
        res.status(500).json(error);
    }
};
