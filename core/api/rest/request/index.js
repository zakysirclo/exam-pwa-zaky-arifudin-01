const { getAppEnv, getAccessEnv } = require('../../../helpers/env');
const { HOST } = require('../../../../swift.config');

function requestInternal(request) {
    const appEnv = getAppEnv();
    const url = HOST[appEnv] || HOST.prod;
    return new Promise((resolve) => {
        fetch(`${url}/${request}`, {
            headers: {
                Authentication: `Bearer ${getAccessEnv()}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.log(err);
            });
    });
}

module.exports = requestInternal;
