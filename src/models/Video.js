import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String,
    description : String,
    createdDate : Date,
    hashtags : [{type:String}],
    meta:{
        views:Number,
        rating:Number
    }
});
