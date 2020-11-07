const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const School = require("../school/school");
const Utils = require("../../utils/utils");

const Schema = mongoose.Schema;

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        nullable: false,
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
    },
    school: {
        type: Schema.ObjectId,
        ref: Utils.entities.STUDENT,
        required: true,
        nullable: false,
    },
    school_class: {
        type: Schema.ObjectId,
        ref: Utils.entities.SCHOOL_CLASS,
        // TODO: un comment this after testing
        // required: true,
        // nullable: false,
    },
    profile_picture: {
        type: Schema.Types.String,
        required: true,
        nullable: false,
        // TODO: Improve this thing too
        default: 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg',
    }
});


studentSchema.statics.register = async function (userData) {

    // TODO: Remove sensitive information log
    console.log(userData);

    const newStudent = new this();

    if (userData == undefined || userData == null)
        throw new Error("No data found in request");

    if (userData.password == undefined)
        throw new Error("Password is not provided");

    if (userData.password.length < 8)
        throw new Error("Password must be atleast 8 digit long");

    if (!emailValidator.validate(userData.email))
        throw new Error("Email is badly formatted");

    newStudent.name = userData.name;
    newStudent.email = userData.email;
    newStudent.profile_picture = userData.profile_picture;

    newStudent.password_hash = bcrypt.hashSync(
        userData.password,
        Number(process.env.SALT_ROUNDS),
    );

    newStudent.roll_no = userData.roll_no;
    newStudent.class_name = userData.class_name;

    newStudent.school = new School({ name: "Default School" });

    // TODO: Remove Student log
    console.log(newStudent);

    const savedStudent = await newStudent.save();

    return savedStudent;
}


studentSchema.statics.updatePassword = async function(id, oldPassword, newPassword) {
    
    const student = await this.findById(id).exec();
    
    if (student == null)
        throw new Error("No Student Found");

    const passwordHash = student.password_hash;

    // TODO: Remove console.log
    console.log(student);
    console.log(oldPassword);
    console.log(newPassword);

    const isValid = await bcrypt.compare(
        oldPassword,
        passwordHash,
    );

    if (! isValid)
        throw new Error('Invalid password');

    student.password_hash = bcrypt.hashSync(
        newPassword,
        Number(process.env.SALT_ROUNDS)
    );

    await student.save();

    // TODO: Figure out how to invalidate all old password jwts
    return {
        "message": "password updated successfully"
    };
}


studentSchema.statics.updateData = async function (id, data) {
    
    const student = await this.findById(id).exec();
    
    if (student == null)
        throw new Error('No Student Found');
    
    await _student.update(data);
    
    return {
        message:'data updated successfully'
    };
}


const Student = mongoose.model(Utils.entities.STUDENT, studentSchema);
module.exports = Student;