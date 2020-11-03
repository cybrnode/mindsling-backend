const mongoose = require("mongoose");
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
    },
    guests: {
        type: [Schema.Types.ObjectId]
    }
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;