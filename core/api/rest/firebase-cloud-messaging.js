/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
module.exports = (req, res) => {
    const { token } = req.body;
    const topic = process.env.FCM_TOPIC;
    const keyserver = `key=${process.env.FCM_KEY_SERVER}`;
    if (req.cookies.fcm_token !== token) {
        fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': 0,
                Authorization: keyserver,
            },
        })
            .then((data) => {
                req.cookies.fcm_token = token;
                res.status(200).json({
                    status: 200,
                    message: 'success subscribe token',
                });
            })
            .catch((err) => res.status(500).json(err));
    } else {
        res.json({
            status: 200,
            message: 'subscribe token',
        });
    }
};
