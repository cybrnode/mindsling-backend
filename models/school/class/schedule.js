const mongoose = require("mongoose");
const Utils = require("../../../utils/utils");

const Schema = mongoose.Schema;

const classScheduleSchema = Schema({
    subject: {
        type: Schema.ObjectId,
        ref: Utils.entities.SUBJECT,
        required: true,
    },
    day: {
        type: String,
        enum: ["Monday", 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        reqired: true,
    },
    start_time: {
        type: Date,
        required: true,
    },
    end_time: {
        type: Date,
        required: true,
    }
});

const ClassSchedule = mongoose.model(Utils.entities.CLASS_SCHEDULE, classScheduleSchema);
module.exports = ClassSchedule;
