const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

schoolSchema.plugin(uniqueValidator);
const School = mongoose.model("School", schoolSchema);
module.exports = School;