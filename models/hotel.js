const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;
const RoomSchema = new Schema({
    
    Rooms_Occupied:{ 
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'bookings', 
    },
    });

const hotelSchema =new Schema({
   Rooms:{
    type:String,
    required:true
   },
  totalstaff:{
    type:Number,
    required:false
   },
   availablestaff:
   {
       type:Number,
       required:true
   },
   
   room:[RoomSchema],
},

{
    timestamps: true,

});

var hotels = mongoose.model('hotel',hotelSchema);
module.exports =hotels;