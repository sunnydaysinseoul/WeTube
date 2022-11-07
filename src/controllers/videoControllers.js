import Video from "../models/Video.js";

/* URL : / */
export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

/* URL : /videos/:vId */
export const watchVideo = async(req, res) => {
    const { id } = req.params; 
    const video = await Video.findById(id);
    return res.render("watch", { pageTitle: `Watching ${video.title}` ,video});
};

/* URL : (GET) /videos/:vId/edit */
export const getEditVideo = async(req, res) => {
    const { id } = req.params; 
    const video = await Video.findById(id);
      return res.render("edit", { pageTitle: `Editing ${video.title}` ,video});
    };
/* URL : (POST) /videos/:vId/edit */
export const postEditVideo = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    const newTitle =req.body.title;
    await Video.findByIdAndUpdate(id, { title: `${newTitle}` });
    return res.render("watch", { pageTitle: `Watching ${video.title}` ,video});
};

/* URL : /videos/:vId/delete */
export const deleteVideo = (req, res) => {
  return res.send("Delete videos.");
};

/* URL : (GET) /videos/upload */
export const getUploadVideo = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Video` });
};

/* URL : (POST) /videos/upload */
export const postUploadVideo = async (req, res) => {
  //add a video to the videosArr array.
  const { title, description, hashtags } = req.body;

  try {
    //form에서 받아온 데이터를, 위에서 Import한 Video스키마 데이터로 만들어주기
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
      meta: {
        views: 0,
        reating: 0,
      },
    });
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
export const searchVideo = (req, res) => {
  return res.send("Search videos.");
};
