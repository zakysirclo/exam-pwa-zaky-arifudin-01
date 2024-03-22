const firebaseAuth = require('../../../core/api/rest/firebase-cloud-messaging');

export default function handler(req, res) {
    firebaseAuth(req, res);
}
