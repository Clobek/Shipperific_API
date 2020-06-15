const { Schema, model } = require("mongoose");

const packageSchema = Schema ({
    item: String,
    tracking_number: {type: String, required: true},
    carrier_code: String,
    userID: String
})

const Package = model('Package', packageSchema);

module.exports = Package;
