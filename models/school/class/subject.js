const mongoose = require("mongoose");
const Utils = require("../../../utils/utils")

const Schema = mongoose.Schema;

const subjectSchema = Schema({
    name: {
        type: String,
        required: true
    },
    class: {
        type: Schema.ObjectId,
        ref: "SchoolClass",
        required: true,
    }
});

const Subject = mongoose.model(Utils.entities.SUBJECT, subjectSchema);
module.exports = Subject;