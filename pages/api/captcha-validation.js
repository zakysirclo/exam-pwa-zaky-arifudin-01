const captcha = require('../../core/api/rest/captcha');

export default function handler(req, res) {
    captcha(req, res);
}
