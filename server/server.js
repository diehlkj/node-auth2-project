// express
const express = require('express');
// helmet
const helmet = require('helmet');
// cors *** Look this up, I still don't quite understand it ***
const cors = require('cors');
// jwt
const jwt = require('jsonwebtoken');
// routers
const authRouter = require('../auth/authRouter.js');
const usersRouter = require('../users/usersRouter.js');
// server
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send('<h1>Node Authentication 2 - Json Web Tokens</h1>');
})

module.exports = server;