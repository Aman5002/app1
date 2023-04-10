const mongoose = require('mongoose');
const { Schema } = mongoose;
const ImagesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type: String,
        // required: true
        default:"No Title"
    },
    description:{
        type: String,
        // required: true, 
        default:"No Description"
    },
    tag:{
        type: String,
        default: "General"
    },
    imgUrl:{
        type: String,
        default:null
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  module.exports = mongoose.model('images', ImagesSchema);