const geocoding = require('../../core/api/rest/geocoding');

export default function handler(req, res) {
    geocoding(req, res);
}
