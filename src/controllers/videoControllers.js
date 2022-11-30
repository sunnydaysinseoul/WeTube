import Video from "../models/Video.js";
import User from "../models/User.js";

/* URL : /videos/:vId */
export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");
  const owner = await User.findOne({id:owner});
  const name = owner.name;
  console.log(name);
  // video.views++; //조회수 증가
  // video.save(); //조회수 저장
  return res.render("watchVideo", { pageTitle: `${video.title}`, video,name });
};

/* URL : (GET) /videos/:vId/edit */
export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  const {user:{_id}}=req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404");
  }
  // console.log(typeof video.owner,typeof _id);
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("editVideo", { pageTitle: `Editing ${video.title}`, video });
};
/* URL : (POST) /videos/:vId/edit */
export const postEditVideo = async (req, res) => {
  const { id } = req.params;
  const {user:{_id}}=req.session;
  const { title, description, hashtags, rating } = req.body;

  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404");
  }
  // console.log(typeof video.owner,typeof _id);
  if (String(video.owner) !== String(_id)) {
    req.flash("error","접근권한이 없습니다.");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: hashtags
      .replace(/ /g, "")
      .split(",")
      .filter((n) => n)
      .map((word) => `#${word}`),
    rating,
  });
  req.flash("info","저장되었습니다.")
  return res.redirect(`/videos/${id}`);
};

/* URL : /videos/:vId/delete */
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {user:{_id}}=req.session;

  const deletedVideo = await Video.findById(id);
  const user = await User.findById(_id);
  if (!deletedVideo) {
    res.flash("error","올바른 접근이 아닙니다.");
    return res.status(404).render("404");
  }
  // console.log(typeof video.owner,typeof _id);
  if (String(deletedVideo.owner) !== String(_id)) {
    res.flash("error","올바른 접근이 아닙니다.");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id),1); //user에 populate된 video 정보도 삭제하기.
  user.save();
  
  const videos = await Video.find({});
  req.flash("info",`'${deletedVideo.title}' 동영상이 삭제되었습니다.`);
  res.render("home", {
    pageTitle: "Home",
    videos
  });
   
};

/* URL : (GET) /videos/upload */
export const getUploadVideo = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video` });
};

/* URL : (POST) /videos/upload */
export const postUploadVideo = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { path } = req.file;
  const { title, description, rating, hashtags } = req.body;
  try {
    //form에서 받아온 데이터를, 위에서 Import한 Video스키마 데이터로 만들어주기
    const newVideo = await Video.create({
      title,
      description,
      hashtags: hashtags
        .replace(/ /g, "")
        .split(",")
        .filter((n) => n)
        .map((word) => `#${word}`),
      rating,
      fileUrl: path,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    req.flash("info","업로드 성공");
    return res.redirect(`/`);
  } catch (error) {
    console.log(error);
    req.flash("error","업로드 실패");
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

/* URL : /search */
export const searchVideo = async (req, res) => {
  const searchByTitle = req.query.searchByTitle;
  const searchByRating = req.query.searchByRating;
  if (searchByTitle && searchByRating) {
    const videos = await Video.find({
      title: { $regex: new RegExp(searchByTitle, "i") },
      rating: { $gte: searchByRating },
    });
    res.render("search", {
      pageTitle: "Search result",
      videos,
      searchByTitle,
      searchByRating,
    });
  } else if (searchByTitle && searchByRating == "") {
    const videos = await Video.find({
      title: { $regex: new RegExp(searchByTitle, "i") },
    });
    res.render("search", {
      pageTitle: "Search result",
      videos,
      searchByTitle,
      searchByRating,
    });
  } else if (searchByTitle == "" && searchByRating) {
    const videos = await Video.find({ rating: { $gte: searchByRating } });
    res.render("search", {
      pageTitle: "Search result",
      videos,
      searchByTitle,
      searchByRating,
    });
  } else {
    let videos = [];
    res.render("search", {
      pageTitle: "Search result",
      videos,
      searchByTitle,
      searchByRating,
    });
  }
};

export const registerView=async(req,res)=>{
  const {id} = req.params;
  const video = await Video.findById(id);
  if(!video){
    return res.status(404);
  }
  video.meta.views = video.meta.views+1;
  await video.save();
  return res.status(200);
}