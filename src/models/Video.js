import mongoose from "mongoose";
//복사용 : title,description,createdDate,hashtags,views,rating
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  fileUrl: { type: String, required: true },
  description: { type: String, required: true },
  createdDate: { type: Date, required: true, default: Date.now },

  /*
    default값에 Date.now()이렇게 하면 작성한 지금시점이 저장되어버리니까,
    ()가 없이 써두면, video.create할 때 mongoose가 알아서 함수를 실행해서 처리할 것임.
    */
   
  // thumbnail: { type: String, required: true },
  hashtags: [{ type: String, trim: true }],

  //meta data는 자동으로 생성될 정보
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
