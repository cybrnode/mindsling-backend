const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = Schema({
    name: {
        type: String,
        required: false,
        unique: true,
    },
    school: {
        type: Schema.ObjectId,
        ref: 'School',
        required: true,
    },
    classesSchedules: [{
        type: Schema.ObjectId,
        ref: 'ClassSchedule',
        required: false,
    }],
});

const SchoolClass = mongoose.model("SchoolClass", classSchema);
module.exports = SchoolClass;