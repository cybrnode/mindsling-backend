const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const jwt = require("jsonwebtoken");

const utils = require("../utils/utils");

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    roll_no: {
        type: String,
        required: true,
    },
    password_hash: {
        type: String,
        required: true,
        min: 8
    },
    class_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});


studentSchema.statics.register = async function(userData){
    
    const newStudent = new this();

    if (userData == undefined || userData == null)
        throw new Error("No data found in request");

    if (userData.password == undefined)
        throw new Error("Password is not provided");
        
    if (userData.password.length < 8)
        throw new Error("Password must be atleast 8 digit long");
    
    if (!emailValidator.validate(userData.email))
        throw new Error("Email is badly formatted");

    newStudent.name  = userData.name;
    newStudent.email = userData.email;
    newStudent.password_hash = utils.hashPassword(password);
    newStudent.roll_no    = userData.roll_no;
    newStudent.class_name = userData.class_name;

    console.log(newStudent);

    
    await newStudent.save();
    const token = jwt.sign({user: "student"}, process.env.SECRET);
    return {
        "token": token
    };
}

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;