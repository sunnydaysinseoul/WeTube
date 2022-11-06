import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {type:String,required:true},
    description : String,
    createdDate : {type:Date,required:true},
    hashtags : [{type:String}],
    
    //meta data는 자동으로 생성될 정보
    meta:{
        views:Number,
        rating:Number
    }
});

const Video = mongoose.model("Video",videoSchema);
export default Video;