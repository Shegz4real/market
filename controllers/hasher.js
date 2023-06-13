const bcrpyt = require(`bcrypt`);

function hashPassword(password){
    const saltRoudnds = 10;
    return bcrpyt.hashSync(password, saltRoudnds);
}

module.exports = {hashPassword};