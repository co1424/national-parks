const mongoose = require('mongoose');
const nationalParksSchema = mongoose.Schema(

    {
        parkName: {
            type: String,
            required: [true, 'Park name is required']
        },

        googleMapsLocation: {
            type: String,
            required: [true, 'Google Maps Location is required']
        },

        mainAttractions: {
            type: String,
            required: [false, 'Main Attractions are optional'],
        },
        
        availableLodging: {
            type: String,
            required: [false, 'Available Lodging is optional']
        },
    }, {
        timestamps: true,
    }
);

const parksModel = mongoose.model('National Parks', nationalParksSchema);
module.exports = parksModel;