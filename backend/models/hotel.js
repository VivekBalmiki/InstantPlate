const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name: String,
    location: String,
    imageUrl: String,
    menu: [
        {
            name: String,
            price: Number
        }
    ]
});

const Hotel = mongoose.model('Hotel', HotelSchema);

module.exports = Hotel;
