const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const adminPath = path.join(__dirname, '../data/admin.json');

function getAdmin() {
    const data = fs.readFileSync(adminPath, 'utf-8');
    return JSON.parse(data);
}

function verifyPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = { getAdmin, verifyPassword };
