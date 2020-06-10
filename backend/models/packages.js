const {Schema, model} = require('mongoose');

const packageSchema = Schema ({
    // id: String,
    // data: Object,
    tracking_number: {type: String, required: true},
    carrier_code: String
    // status: String,
    // origin_info: Object, // includes ItemReceived and DestinationArrived timestamps
    // trackinfo: Array,
    // Date: String, 
    // StatusDescription: String,
    // Details: String,
    // checkpoint_status: String,
    // destination_info: Object,
    // ItemReceived: String,
    // DestinationArrived: String,
    // lastEvent: String,
    // lastUpdateTime: String
})

const Package = model('Package', packageSchema)