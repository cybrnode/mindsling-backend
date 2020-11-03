const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Utils = require("../../utils/utils");

const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

schoolSchema.plugin(uniqueValidator);
const School = mongoose.model(Utils.entities.SCHOOL, schoolSchema);
module.exports = School;