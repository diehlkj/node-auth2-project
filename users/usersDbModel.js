const db = require('../data/dbConfig.js');

module.exports = {
    findUser,
    findUserBy,
    findUserById,
    insertUser
};

function findUser() {
    return db('users');
};

function findUserBy(filter) {
    return db('users')
        .where(filter);
        //.where('username', filter.username);
};

async function insertUser(userData) {
    const [id] = await db('users').insert(userData);
    return findUserById(id);
};

function findUserById(id) {
    return db('users')
        .where({ id })
        .first();
};
