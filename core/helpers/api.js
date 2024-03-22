/**
 * ---------------------------------------------------- *
 * @const {onRequestTimeout}
 * @summary for add request timeout to query or mutation
 * ---------------------------------------------------- *
 */
function onRequestTimeout({
    aborterRef = null,
    timeout = 30000, // in ms
    requestCallback = null,
    successCallback = null,
    errorCallback = null,
    finallyCallback = null,
}) {
    let requestTimeout;
    const timeoutPromise = new Promise((resolve, reject) => {
        // abort request after specific amount of time
        requestTimeout = setTimeout(() => {
            aborterRef.current.abort();
            // eslint-disable-next-line no-param-reassign
            aborterRef.current = new AbortController();
            const errorRequestTimeoutMessage = {
                errors: [
                    {
                        message: 'Connections request timeout',
                        extensions: 'Internal request',
                    },
                ],
                data: null,
            };
            return reject(errorRequestTimeoutMessage);
        }, timeout);
    });

    const requestPromise = new Promise(requestCallback);

    Promise.race([timeoutPromise, requestPromise])
    // handle register response data
        .then(successCallback)
    // handle request timeout
        .catch(errorCallback)
        .finally(() => {
            clearTimeout(requestTimeout);
            finallyCallback();
        });
}

module.exports = {
    onRequestTimeout,
};
