const generateXml = require('../../core/api/rest/xml');

export const config = {
    api: {
        responseLimit: false,
    },
};

export default function handler(req, res) {
    generateXml(req, res);
}
