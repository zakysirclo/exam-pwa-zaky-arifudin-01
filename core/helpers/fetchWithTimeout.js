const fetch = require('cross-fetch');
const { onRequestTimeout } = require('./api');
const { requestTimeout } = require('../../swift.config');

/**
 * ---------------------------------------------------- *
 * @const {fetchWithTimeout}
 * @summary for add request timeout to fetch rest api
 * ---------------------------------------------------- *
 */
function fetchWithTimeout(url = '', options) {
    const aborterRef = {
        current: new AbortController(),
    };
    const response = new Promise((resolve) => {
        onRequestTimeout({
            aborterRef,
            timeout: requestTimeout,
            requestCallback: (resolveCallback, rejectCallback) => {
                fetch(url, options)
                    .then((res) => res.json())
                    .then((data) => resolveCallback(data))
                    .catch((err) => {
                        rejectCallback(err);
                    });
            },
            successCallback: (res) => {
                // your code
                resolve(res);
            },
            errorCallback: (err) => {
                // your code
                resolve(err);
            },
            finallyCallback: () => {
                // your code
            },
        });
    });

    return response;
}

module.exports = fetchWithTimeout;
