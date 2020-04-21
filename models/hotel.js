const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const book = require('./booking');

const Schema = mongoose.Schema;


const hotelSchema =new Schema({
   Rooms:{
    type:String,
    required:true
   },
   totalstaff:{
    type:Number,
    required:true
   },
   availablestaff:
   {
       type:Number,
       required:true
   },
},

{
    timestamps: true,

});

var hotels = mongoose.model('hotel',hotelSchema);
module.exports =hotels;