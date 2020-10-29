const express = require("express");
const StatusCodes = require("http-status-codes").StatusCodes;

const School = require("../models/school");
const utils = require("../utils/utils");

const router = express.Router();

router.get('/?', function(req, res) {
    School.find().then(function(schools){
        res.json(schools);
    }).catch((err) => utils.dataErrorHandeler(req, res, err));
});

router.get('/:id', function(req, res) {
    School.findById(req.params.id).then(function(school){
        res.json(school);
    }).catch((err) => utils.dataErrorHandeler(req, res, err));
});

router.post('/?', function(req, res) {
    console.log(res.body);
    School.save(req.body).then(function(newSchool) {
        res.json(newSchool);
    }).catch((err) => utils.dataErrorHandeler(req, res, err));
});

router.delete('/:id', function(req, res) {
    School.findByIdAndDelete(req.params.id).then(function(deletedSchool) {
        
        console.log(req.params.id);
        console.log(deletedSchool);

        if (! deletedSchool){
            res.status(StatusCodes.NOT_FOUND).json({
                message: 'School not found',
            });
        } else {
            res.json({
                message: "Deleted successfully",
            });
        }
    }).catch((err) => utils.dataErrorHandeler(req, res, err));
});

module.exports = router;