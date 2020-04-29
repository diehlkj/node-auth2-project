const router = require('express').Router();
const authCheck = require('../auth/restrictedMdwr.js');
const Model = require('./usersDbModel');

// '/'
// GET
// If the user is logged in, respond with an array of all the users
// contained in the database. If the user is not logged in respond
// with the correct status code and the message: 'You shall not pass!'.

router.get('/', authCheck, (req, res) => {
    Model.findUser()
        .then(userData => {
            res.status(200).json({ MESSAGE: 'Request Succesful: ', userData });
        })
        .catch(err => {
            res.status(500).json({ MESSAGE: 'There was a problem handling your (/users)[GET] request: ', err });
        })
})

module.exports = router;