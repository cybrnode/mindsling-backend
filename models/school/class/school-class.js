const mongoose = require("mongoose");
const Utils = require("../../../utils/utils");

const Schema = mongoose.Schema;


const classSchema = Schema({
    name: {
        type: String,
        required: [true, 'Please specify class name'],
    },
    school: {
        type: Schema.ObjectId,
        ref: Utils.entities.SCHOOL,
        required: true,
    },
});


const SchoolClass = mongoose.model(Utils.entities.SCHOOL_CLASS, classSchema);
module.exports = SchoolClass;