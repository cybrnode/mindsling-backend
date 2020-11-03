const express = require('express');

const Event = require('../../models/school/event');
const Utils = require('../../utils/utils');


const router = express.Router();


router.get('/?', function(req, res) {
    
    const schoolId = req.studentId;
    
    Event.find({
        school: schoolId,
    }).then(function(schoolEvents) {
        res.json(schoolEvents);
    }).catch((err) => Utils.dataErrorHandeler(req, res, err));

});


router.post('/?', function (req, res) {
    const newEvent = new Event(req.body);
    newEvent.school = req.schoolId;
    newEvent.save().then(function(savedEvent) {
        res.json(savedEvent);
    }).catch((err) => Utils.dataErrorHandeler(req, res, err));
});


router.delete('/:eventId', function(req, res) {
    const eventId = req.params.eventId;

    Event.findByIdAndDelete(eventId)
    .then(function (deletedEvent) {
        res.json({
            message: 'Event deleted',
            data: deletedEvent,
        });
    }).catch((err) => utils.dataErrorHandeler(req, res, err));
});


router.get('/today', function (req, res){

    const schoolId = req.studentId;
    
    // TODO: Time query for today
    Event.find({
        school: schoolId,
    }).then(function(schoolEvents) {
        res.json(schoolEvents);
    }).catch((err) => Utils.dataErrorHandeler(req, res, err));

});


router.get('/upcoming', function (req, res){

    const schoolId = req.studentId;
    
    // TODO: Time query for upcoming
    Event.find({
        school: schoolId,
    }).then(function(schoolEvents) {
        res.json(schoolEvents);
    }).catch((err) => Utils.dataErrorHandeler(req, res, err));

});


router.get('/past', function (req, res){

    const schoolId = req.studentId;
    
    // TODO: Time query for past
    Event.find({
        school: schoolId,
    }).then(function(schoolEvents) {
        res.json(schoolEvents);
    }).catch((err) => Utils.dataErrorHandeler(req, res, err));

});


module.exports = router;