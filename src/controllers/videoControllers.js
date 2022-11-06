import Video from "../models/Video.js"

/* URL : / */
export const home = (req,res)=> {
    Video.find({},(error,videos)=>{
        console.log("errors:",error);
        console.log("videos:",videos);
    })
    return res.render("home",{pageTitle:"Home",videos:[]}); // :views폴더 안의 home.pug를 render하고, pug로 변수를 보내줌.
}

/* URL : /videos/:vId */
export const watchVideo = (req,res)=> {
    // const id = req.params.id;
    const { vId } = req.params; //이 줄은 위에줄과 완전히 같은 뜻.
    const video = videosArr[vId-1]; //id가 1부터 시작하니까..
    console.log(vId);
    return res.render("watch",{pageTitle:`Watching`});
}

/* URL : (GET) /videos/:vId/edit */
export const getEditVideo = (req,res)=> {
    const { vId } = req.params; 
    const video = videosArr[vId-1];
    return res.render("edit",{pageTitle:`Editing`});
}

/* URL : (POST) /videos/:vId/edit */
export const postEditVideo = (req,res)=> {
    const {vId}=req.params;
    const {title}=req.body;

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
    
 
    return res.redirect("/")
}

/* URL : /search */
export const searchVideo = (req,res)=> {
    return res.send("Search videos.");
}

