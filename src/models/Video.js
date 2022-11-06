import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String,
    description : String,
    createdDate : Date,
    hashtags : [{type:String}],
    
    //meta data는 자동으로 생성될 정보
    meta:{
        views:Number,
        rating:Number
    }
});

const Video = mongoose.model("Video",videoSchema);
export default Video;