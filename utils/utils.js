const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const StatusCodes  = require("http-status-codes").StatusCodes;

function hashPassword(password){
    return bcrypt.hashSync(
        password,
        Number(process.env.SALT_ROUNDS),
    );
}

function authStudent(req, res, next) {

    const SECRET = process.env.SECRET;
    const TOKEN = req.headers.token;

    jwt.verify(TOKEN, SECRET, function(err, decoded) {
        
        if(err) {
            res.status(StatusCodes.UNAUTHORIZED)
                .json({
                message: err.message,
            });
        }
        
        console.log(decoded);
        
        next();
    });
}


const errorHandler = function (req, res, err) {
    console.log(err);
    
    res.status(StatusCodes.NOT_ACCEPTABLE)
        .json({
        message: err.message,
    });
}


module.exports.dataErrorHandeler = errorHandler;
module.exports.hashPassword = hashPassword;
module.exports.studentAuthController = authStudent;
module.exports.entities = {
    SCHOOL: 'School',
    STUDENT: 'Student',
    SCHOOL_CLASS: 'Class',
    CLASS_SCHEDULE: 'ClassSchedule',
    EVENT: 'Event',
    SUBJECT: 'Subject',
};