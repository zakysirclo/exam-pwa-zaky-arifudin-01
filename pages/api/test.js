export default function handler(req, res) {
    console.log(req.headers);
    return res.status(200).send('oke');
}
