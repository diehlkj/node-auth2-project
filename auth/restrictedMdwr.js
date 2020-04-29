const jwt = require('jsonwebtoken');
const secret = require('../secret.js');

module.exports = (req, res, next) => {

    console.log('In restrictedMdwr');

    try {
        const token = req.headers.authroization;//.split(" ")[1];
        
        console.log('In restrictedMdwr.try | Here is token: ', token);

        if (token) {
            jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ MESSAGE: 'Not accessable.' });
                } else {
                    req.dcdJwt = decodedToken;
                    console.log(req.dcdJwt);
                    next();
                };
            })
        } else {
            throw new Error('Invalid Auth Data');
        }
    } catch (err) {
        console.log('Caught error in restrictedMdwr:', err);
        res.status(401).json({ err });
    };
};