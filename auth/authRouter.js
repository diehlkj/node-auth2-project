const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../secret.js');
const Model = require('../users/usersDbModel');

// '/register'
// POST
// Creates a user using the information sent inside the body of
// the request. Hash the password before saving the user to the
// database.

router.post('/register', (req, res) => {
    
    // Get the username and password from the request body
    let userData = req.body;
    
    // Generate a hash of the password provided in userData from req.body
    const hash = bcrypt.hashSync(userData.password, 10);

    // Set the password in userData to the newly created hash. We dont want to store plaintext passwords.
    userData.password = hash;

    Model.insertUser(userData)
        .then(userData => {
            const token = getToken(userData);

            res.status(200).json({ MESSAGE: `Account Creation Succesful ${userData.username} | Here is your token: ${token}` });
        })
        .catch(err => {
            res.status(500).json({ MESSAGE: 'There was a problem handling your (/register)[POST] request: ', err });
        })
})

// '/login'
// POST
// Use the credentials sent inside the body to authenticate the user.
// On successful login, create a new JWT with the user id as the
// subject and send it back to the client. If login fails, respond
// with the correct status code and the message: 'You shall not pass!'

router.post('/login', (req, res) => {
    
    // Get the username and password from the request body
    let { username, password } = req.body;

    // Look for user in our db table by 'username' !!!! DONT FORGET TO WRAP IN CURLY BOIS
    Model.findUserBy({ username })
        .first()
        .then(userData => {
            console.log('in findUserBy.then | Here is userData: ', userData);
            // Check if userData was returned and that the password hash generated from the provided guess matches that in the db
            if (userData && bcrypt.compareSync(password, userData.password)) {
                const token = getToken(userData);
                res.status(200).json({ MESSAGE: `Login succesful ${userData.username} | Here is your token: ${token}` });
            } else {
                res.status(401).json({ MESSAGE: 'You shall not pass!' });
            };
        })
        .catch(err => {
            res.status(500).json({ MESSAGE: 'There was a problem handling your (/login)[POST] request: ', err });
        })
});

function getToken(userData) {
    // Make the payload and assign to it the information we wish it to contain
    const payload = {
      userid: userData.id,
      username: userData.username   
    };

    // Set options like how long until token expires
    const options = { expiresIn: '1h' };

    // assemble payload, secret (from the file we made in the root), and options into the token
    const token = jwt.sign(payload, secret.jwtSecret, options);
  
    return token;
  };

// '/logout'
// DELETE

module.exports = router;