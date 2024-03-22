const getDetailTransaction = require('../../../core/api/rest/paypal/getDetailTransaction');

export default function handler(req, res) {
    getDetailTransaction(req, res);
}
