let videosArr = [
    {
        title: "Video#1",
        rating:5,
        comments:2,
        createdAt:"2 days ago",
        views:33377,
        vId:1
    },
    {
        title: "Video#2",
        rating:5,
        comments:2,
        createdAt:"1 hours ago",
        views:333,
        vId:2
    },
    {
        title: "Video#3",
        rating:5,
        comments:2,
        createdAt:"2 minutes ago",
        views:1,
        vId:3
    }
]; 
/* URL : / */
export const trendingVideo = (req,res)=> {
    return res.render("home",{pageTitle:"Home",videosArr}); // :views폴더 안의 home.pug를 render하고, pug로 변수를 보내줌.
}

/* URL : /videos/:vId */
export const watchVideo = (req,res)=> {
    // const id = req.params.id;
    const { vId } = req.params; //이 줄은 위에줄과 완전히 같은 뜻.
    const video = videosArr[vId-1]; //id가 1부터 시작하니까..
    console.log(vId);
    return res.render("watch",{pageTitle:`Watching: ${video.title}`,video});
}

/* URL : (GET) /videos/:vId/edit */
export const editVideo = (req,res)=> {
    const { vId } = req.params; 
    const video = videosArr[vId-1];
    return res.render("edit",{pageTitle:`Editing: ${video.title}`,video});
}

/* URL : (POST) /videos/:vId/edit */
export const editVideoSave = (req,res)=> {
  
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

