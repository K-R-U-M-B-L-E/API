const mongoose = require("mongoose");

const associationSchema = mongoose.Schema({
    _id: {type: String, required: false},
    name: { type: String, required: true },
    university: { type: String, required: true },
    visible: {type: String, required: true},
    tags: { type: String, required: false }
});

module.exports = mongoose.model('Association', associationSchema);