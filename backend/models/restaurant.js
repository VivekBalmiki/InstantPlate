// models/Restaurant.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
      },
    category:{
        type: String,
        required: true,
        unique: true
      },
    location:{
        type: String,
        required: true,
        unique: true
      },

    // approved: { type: Boolean, default: false },  // Admin approval field
    // menu: [
    //     {
    //         name: String,
    //         price: Number
    //     }
    // ]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
