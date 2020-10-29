const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const School = require("./school");

const Schema = mongoose.Schema;

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
    },
    school: {
        type: Schema.ObjectId,
        required: true,
        ref: 'School',
    },
});


studentSchema.statics.register = async function (userData) {

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
    newStudent.password_hash = bcrypt.hashSync(
        userData.password,
        Number(process.env.SALT_ROUNDS),
    );
    newStudent.roll_no = userData.roll_no;
    newStudent.class_name = userData.class_name;

    newStudent.school = new School({ name: "Default School" });

    console.log(newStudent);


    const savedStudent = await newStudent.save();

    return savedStudent;
}


studentSchema.statics.updatePassword = async function (id, oldPassword, newPassword) {
    const _student = await this.findById(id).exec();
    if (_student == null) {
        throw new Error("No Student Found");
    }

    const passwordHash = _student.password_hash;

    console.log(_student);

    console.log(oldPassword);
    console.log(newPassword);

    const isValid = await bcrypt.compare(
        oldPassword,
        passwordHash,
    )
    if (isValid) {
        // Set the newPassword
        _student.password_hash = bcrypt.hashSync(
            newPassword,
            Number(process.env.SALT_ROUNDS)
        );

        await _student.save();

        // TODO: Figure out how to invalidate all old password jwts
        return {
            "message": "password updated successfully"
        };
    } else {
        // Invalid Old Password
        return { 'error': 'Invalid Password' };
    }
}


studentSchema.statics.updateData = async function (id, data) {
    const _student = await this.findById(id).exec();
    if (_student == null) {
        throw new Error("No Student Found");
    }
    await _student.update(data);
    return {'message': 'data updated successfully'};
}


const Student = mongoose.model("Student", studentSchema);
module.exports = Student;