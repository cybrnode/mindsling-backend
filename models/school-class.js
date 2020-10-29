const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = Schema({
    name: {
        type: String,
        required: false,
    },
    school: {
        type: Schema.ObjectId,
        ref: 'School',
        required: true,
    }
});

const SchoolClass = mongoose.model("SchoolClass", classSchema);
module.exports = SchoolClass;