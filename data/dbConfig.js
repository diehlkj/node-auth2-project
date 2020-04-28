// Bring in knex so we can use and pass it through
const knex = require('knex');

// Bring in the knex config file so when we export knex, it knows where everything is and what parametes are set / what profile we want to use (development, staging, production)
const knexConfig = require('../knexfile.js');

// Export knex with the configuration profile we want knex to use.
module.exports = knex(knexConfig.development);