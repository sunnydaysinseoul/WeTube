/* URL : / */
export const trendingVideo = (req,res)=> {
    return res.render("home",{pageTitle:"Home"}); // :views폴더 안의 home.pug를 render하고, pug로 변수를 보내줌.
}

/* URL : /videos/:vId */
export const watchVideo = (req,res)=> {
    console.log(req.params.vId);
    return res.render("watch",{pageTitle:"Watch",videoId:`${req.params.vId}`});
}

/* URL : /videos/:vId/edit */
export const editVideo = (req,res)=> {
    return res.render(edit);
}

/* URL : /videos/:vId/delete */
export const deleteVideo = (req,res)=> {
    return res.send("Delete videos.");
}

/* URL : /videos/upload */
export const uploadVideo = (req,res)=> {
    return res.send("Upload videos.");
}

/* URL : /search */
export const searchVideo = (req,res)=> {
    return res.send("Search videos.");
}

