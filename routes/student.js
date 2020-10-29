const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const StatusCodes  = require("http-status-codes").StatusCodes;

const utils = require("../utils/utils");
const Student = require("../models/student");

const router = express.Router();


router.get("/?", function(req, res) {
    Student.find().then(function(allStudents) {
        res.json(allStudents);
    }).catch((err) => utils.dataErrorHandeler(req, res, err));
});


router.post("/register", async function(req, res){
    Student.register(req.body).then(function(registeredStudent){
        
        const token = jwt.sign({
            user: "student",
            id: registeredStudent._id,
        }, process.env.SECRET);
        
        return res.send({
            token: token
        });

    }).catch((err) => util.dataErrorHandeler(req, res, err));

});


router.post("/login", function(req, res){

    const requestEmail = req.body.email;
    const requestPassword = req.body.password;

    // Fectch the records with this email
    const findStudentsPromis = Student.find({
        email: requestEmail
    });

    // Students with requested email
    findStudentsPromis.then(function(filteredStudents) {

        if (filteredStudents.length == 0) {
            res.status(404).json({
                message: `No student found with email ${req.body.email}`,
            });
        } else {

            const selectedStudent = filteredStudents[0];
            const passwordHash = selectedStudent.password_hash;
            
            bcrypt.compare(
                requestPassword,
                passwordHash,
            ).then(function () {
                const token = jwt.sign({
                    user: "student",
                    id: selectedStudent._id,
                }, process.env.SECRET);
                res.json({
                    token: token
                });
            }).catch(function (err) {
                res.status(402).json({
                    message: err.message
                });
            });
        }
        
    }).catch(function(err){
        res.status(406).json({
            message: err.message,
        });
    });
});


router.post("/change-password/:id", utils.studentAuthController, function(req,res){
    
    const id = req.params.id;
    const password = req.body.password;

    Students.requestPassword(id, password).then(function(req, res){
        res.json({
            message: "Password changed successfully"
        });
    }).catch((err) => utils.handleError(req, res, err));

});


router.delete('/:id', function(req, res){

    const id = req.params.id;

    console.log(id);
    Student.findByIdAndDelete(id).then(function(deletedStudent){
        if (deletedStudent) {
            res.json({
                message: 'Student successfully deleted.'
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message: 'Student not found.'
            });
        }
        res.json({
            message: "Deleted Successfully",
        });
    }).catch((err) => utils.handleError(req, res, err));
});

module.exports = router;