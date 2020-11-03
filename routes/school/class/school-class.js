const express = require("express")
const StatusCodes = require("http-status-codes").StatusCodes;

const School = require("../../../models/school/school");
const SchoolClass = require("../../../models/school/class/school-class");
const Subject = require("../../../models/school/class/subject");
const ClassSchedule = require("../../../models/school/class/schedule");
const utils = require("../../../utils/utils");


const router = express.Router();


router.get('/?', function (req, res) {
    SchoolClass.find().then(function (schoolClasses) {
        res.json(schoolClasses);
    }).catch((err) => utils.dataErrorHandeler(req, res, err));
});

router.get('/:id', function (req, res) {
    SchoolClass.findById(req.params.id).then(function (schoolClass) {
        res.json(schoolClass);
    }).catch((err) => utils.dataErrorHandeler(req, res, err));
});

router.post('/?', function (req, res) {
    console.log(res.body);

    // This needs attention... what to do about this ? 
    // why does a School model even exist ?
    req.body.school = new School({ name: "Default School" });

    SchoolClass.create(req.body).then(function (newSchoolClass) {
        res.json(newSchoolClass);
    }).catch((err) => utils.dataErrorHandeler(req, res, err));
});

router.delete('/:id', function (req, res) {
    SchoolClass.findByIdAndDelete(req.params.id).then(function (deletedSchoolClass) {

        console.log(req.params.id);
        console.log(deletedSchoolClass);

        if (!deletedSchoolClass) {
            res.status(StatusCodes.NOT_FOUND).json({
                message: 'SchoolClass not found',
            });
        } else {
            res.json({
                message: "Deleted successfully",
            });
        }
    }).catch((err) => utils.dataErrorHandeler(req, res, err));
});



// TODO: To be fixed
router.get('/class-schedule/:class_name', async (req, res) => {
    const className = req.params.class_name;
    const c = await SchoolClass.findOne({ 'name': className }).populate();
    console.log(c);
    if (c == null)
        return res.status(404).json({ 'message': 'No Class Found with the given name' });

    // RETURNING SAMPLE DATA FOR NOW

    const s = new Subject({ name: "English", class: c._id });
    const s1 = new Subject({ name: "Math", class: c._id });
    const s2 = new Subject({ name: "Sports", class: c._id });
    const s3 = new Subject({ name: "Random Subject with a long name", class: c._id });
    new ClassSchedule();
    class_s = new ClassSchedule({ subject: s, day: 'Monday', start_time: Date.now(), end_time: Date.now() + 2 })
    class_1 = new ClassSchedule({ subject: s1, day: 'Tuesday', start_time: Date.now(), end_time: Date.now() + 2 })
    class_2 = new ClassSchedule({ subject: s2, day: 'Thursday', start_time: Date.now(), end_time: Date.now() + 2 })
    class_3 = new ClassSchedule({ subject: s3, day: 'Friday', start_time: Date.now(), end_time: Date.now() + 2 })

    return res.json([class_s, class_1, class_2, class_3]);
})


router.get('/exam-schedule/:class_name', async (req, res) => {
    const className = req.params.class_name;
    const c = await SchoolClass.findOne({ 'name': className }).populate();
    console.log(c);
    if (c == null)
        return res.status(404).json({ 'message': 'No Class Found with the given name' });

    // RETURNING SAMPLE DATA FOR NOW

    const s = new Subject({ name: "English", class: c._id });
    const s1 = new Subject({ name: "Math", class: c._id });
    const s2 = new Subject({ name: "Sports", class: c._id });
    const s3 = new Subject({ name: "Random Subject with a long name", class: c._id });
    new ClassSchedule();
    class_s = new ClassSchedule({ subject:  s, day: 'Monday',   start_time: Date.now()})
    class_1 = new ClassSchedule({ subject: s1, day: 'Tuesday',  start_time: Date.now()})
    class_2 = new ClassSchedule({ subject: s2, day: 'Thursday', start_time: Date.now()})
    class_3 = new ClassSchedule({ subject: s3, day: 'Friday',   start_time: Date.now()})

    return res.json([class_s, class_1, class_2, class_3]);
})

module.exports = router;
