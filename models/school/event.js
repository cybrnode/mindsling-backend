const mongoose = require("mongoose");
const Utils = require("../../utils/utils");

const Schema = mongoose.Schema;

const eventSchema = Schema({
    titles: {
        type: String,
        required: true,
        nullable: false,
    }, 
    description: {
        type: Schema.Types.String,
        required: true,
        nullable: false,
    },
    conver_photo_url: {
        type: Schema.Types.String,
    },
    time: {
        type: Schema.Types.Date,
        required: true,
        nullable: false,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: Utils.entities.STUDENT,
    },
    guests: {
        type: [Schema.Types.ObjectId],
        ref: Utils.entities.STUDENT,
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: Utils.entities.SCHOOL,
    }
});

const Event = mongoose.model(Utils.entities.EVENT, eventSchema);
module.exports = Event;