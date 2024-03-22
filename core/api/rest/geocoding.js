const { decrypt } = require('../../helpers/clientEncryption');

module.exports = async (req, res) => {
    const { query, gmapApiKey } = req.body;
    try {
        const respond = await fetch(`https://gmapkey.sandbox.id/maps/api/geocode/json?address=${query}&key=${decrypt(gmapApiKey)}`);
        const result = await respond.json();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};
