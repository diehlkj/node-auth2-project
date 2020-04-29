// Import the server file
const server = require('./server/server.js');

// create port var that access process.env.PORT so in deployment it can be assigned dynamically, or have a set port to run on as default
const port = process.env.PORT || 4999;

// listen to any requests coming or going from the given port
server.listen(port, () => {
    console.log(`Hey whats up, I'm running on port ${port}. :~)`)
})