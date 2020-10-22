const bcrypt = require("bcrypt");

function hashPassword(password){
    return bcrypt.hashSync(
        password,
        Number(process.env.SALT_ROUNDS),
    );
}