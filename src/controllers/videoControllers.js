import Video from "../models/Video.js";
import User from "../models/User.js";

/* URL : /videos/:vId */
export const watchVideo = async(req, res) => {
    const { id } = req.params; 
    const video = await Video.findById(id).populate("owner");
    console.log(video);
    // video.views++; //조회수 증가
    // video.save(); //조회수 저장
    return res.render("watch", { pageTitle: `${video.title}` ,video});
};

/* URL : (GET) /videos/:vId/edit */
export const getEditVideo = async(req, res) => {
    const { id } = req.params;
    console.log(id);
    const video = await Video.findById(id);
      return res.render("edit", { pageTitle: `Editing ${video.title}` ,video});
    };
/* URL : (POST) /videos/:vId/edit */
export const postEditVideo = async(req, res) => {
    const { id } = req.params;
    const {title,description,hashtags,rating} = req.body;
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags : hashtags.replace(/ /g,"").split(",").filter(n=>n).map((word) => `#${word}`),
      rating,
    });
    const video = await Video.findById(id);
    return res.redirect(`/videos/${id}`);
};

/* URL : /videos/:vId/delete */
export const deleteVideo = async(req, res) => {
    const { id } = req.params;
    console.log(id);
    const deletedVideo= await Video.findById(id);
    await Video.findByIdAndDelete(id);
    const videos = await Video.find({});
    res.render("home", {
      pageTitle: "Home",
      videos,
      deletedVideo: deletedVideo.title
    });
};

/* URL : (GET) /videos/upload */
export const getUploadVideo = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video` });
};

/* URL : (POST) /videos/upload */
export const postUploadVideo = async (req, res) => {
  const {user:{_id}}=req.session;
  const {path} = req.file;
  const { title, description,rating,hashtags } = req.body;
  try {
    //form에서 받아온 데이터를, 위에서 Import한 Video스키마 데이터로 만들어주기
    const newVideo = await Video.create({
      title,
      description,
      hashtags :hashtags.replace(/ /g,"").split(",").filter(n=>n).map((word) => `#${word}`),
      rating,
      fileUrl : path,
      owner:_id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect(`/`);
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

/* URL : /search */
export const searchVideo = async(req, res) => {
  const searchByTitle = req.query.searchByTitle;
  const searchByRating = req.query.searchByRating;
  if (searchByTitle && searchByRating) {
    const videos = await Video.find({
      title: { $regex: new RegExp(searchByTitle, "i") },
      rating: { $gte: searchByRating }
    });
    res.render("search", { pageTitle: "Search result", videos ,searchByTitle,searchByRating});
  } else if (searchByTitle && searchByRating == "") {
    const videos = await Video.find({
      title: { $regex: new RegExp(searchByTitle, "i") }
    });
    res.render("search", { pageTitle: "Search result", videos ,searchByTitle,searchByRating});
  } else if (searchByTitle == "" && searchByRating) {
    const videos = await Video.find({ rating: { $gte: searchByRating } });
    res.render("search", { pageTitle: "Search result", videos ,searchByTitle,searchByRating});
  } else {
    let videos = [];
    res.render("search", { pageTitle: "Search result", videos ,searchByTitle,searchByRating});
  }
};
