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
export const getEditVideo = (req,res)=> {
    const { vId } = req.params; 
    const video = videosArr[vId-1];
    return res.render("edit",{pageTitle:`Editing: ${video.title}`,video});
}

/* URL : (POST) /videos/:vId/edit */
export const postEditVideo = (req,res)=> {
    const {vId}=req.params;
    const {title}=req.body;

    videosArr[vId-1].title = title; //edit.pug의 input에서 보내주는 name="title" 값
    return res.redirect(`/videos/${vId}`);

}
/* URL : /videos/:vId/delete */
export const deleteVideo = (req,res)=> {
    return res.send("Delete videos.");
}

/* URL : (GET) /videos/upload */
export const getUploadVideo = (req,res)=> {
    return res.render("upload",{pageTitle:`Upload Video`})
}

/* URL : (POST) /videos/upload */
export const postUploadVideo = (req,res)=> {
//add a video to the videosArr array.
    
    const newVideo = {
        title : req.body.title,
        rating : 0,
        comments : 0,
        createdAt : new Date(),
        vidws :0,
        vId : videosArr.length+1,
    };
    videosArr.push(newVideo);
    console.log(newVideo);
    return res.redirect("/")
}

/* URL : /search */
export const searchVideo = (req,res)=> {
    return res.send("Search videos.");
}

