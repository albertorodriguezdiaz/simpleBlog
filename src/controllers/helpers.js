const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) =>{
    const salt = await bcrypt.getSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPass = async (password, savedPassword) =>{
    try {
        return bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.log(error);
    }
};

module.exports = helpers;