const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classScheduleSchema = Schema({
    subject: {
        type: Schema.ObjectId,
        ref: "Subject",
        required: true,
    },
    days: {
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

const ClassSchedule = mongoose.model("ClassSchedule", classScheduleSchema);
module.exports = ClassSchedule;