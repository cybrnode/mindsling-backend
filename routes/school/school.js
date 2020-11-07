const express = require('express');
const StatusCodes = require('http-status-codes').StatusCodes;

const School = require('../../models/school/school');
const utils = require('../../utils/utils');

const EventRoute = require('./event');
const SchoolClassRoute = require('./class/school-class');

const router = express.Router();


// -- CRUD Routes
router.post('/?', function(req, res) {
    School.create(req.body).then(function(newSchool) {
        res.json(newSchool);
    }).catch((err) => utils.dataErrorHandeler(req, res, err));
});


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


// TODO: Update is missing


// TODO: Shutdown this dangerous function.
router.delete('/?', function(req, res){
    School.deleteMany().then(function(){
        res.json({
            message: 'Successfully removed all Schools'
        });
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
                message: 'Deleted successfully',
            });
        }
    }).catch((err) => utils.dataErrorHandeler(req, res, err));
});


// MIDDLEWARES

// Middleware for events in school
router.use('/:schoolId/events', function(req, res, next){
    req.schoolId = req.params.schoolId;
    next();
}, EventRoute);

// Middleware for classes in school
router.use('/:schoolId/classes', function(req, res, next){
    req.schoolId = req.params.schoolId;
    next();
}, SchoolClassRoute);


module.exports = router;