const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;

const bookingSchema =new Schema({
    name:{
      type: String,
      required:true,
      unique:true  
    },

    identity_proof:{
        type:String,
        required:true,
    },

    Room_Allocated:{
        type:String,
        required:true,
        unique:true,
    },

    booking_from: {
        type: Date
    },
    
    booking_till: {
        type: Date
    },

    payment: {
        type:Currency,
        required:true,
        min:0   
    }
    
},
{
    timestamps: true,

});

var bookings = mongoose.model('bookings',bookingSchema);
module.exports =bookings;