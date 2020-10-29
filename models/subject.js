const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectSchema = Schema({
    name: {
        type: String,
        required: true
    },
    class: {
        type: ObjectId,
        ref: "SchoolClass",
        required: true,
    }
});

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;