export const trendingVideo = (req,res)=> {
    return res.send("<h1>Video Home-Trending videos.<h1>");
}
export const watchVideo = (req,res)=> {
    console.log(req.params);
    return res.send(`Watch videos.(id:${req.params.vId})`);
}
export const editVideo = (req,res)=> {
    return res.send("Edit videos.");
}
export const deleteVideo = (req,res)=> {
    return res.send("Delete videos.");
}
export const uploadVideo = (req,res)=> {
    return res.send("Upload videos.");
}

export const searchVideo = (req,res)=> {
    return res.send("Search videos.");
}
