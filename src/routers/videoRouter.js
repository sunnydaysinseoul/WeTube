import express from "express";

const videoRouter = express.Router();
const handleWatchVideo = (req,res)=> {
    return res.send("Watch videos.");
}
videoRouter.get("/watch",handleWatchVideo);

export default videoRouter; //다른 파일에서 video globalRouter를 하면, 이렇게 export default한 변수를 사용하게 됨.