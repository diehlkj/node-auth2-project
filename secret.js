module.exports = {
    // This uses the same idea as the port in index.js. Allows a .env config to set secret.
    jwtSecret: process.env.JWT_SECRET || 'supersecretsecret'
};