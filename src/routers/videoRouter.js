import express from "express";
import { editVideo, watchVideo } from "../controllers/videoControllers.js";

const videoRouter = express.Router();

videoRouter.get("/watch",watchVideo);
videoRouter.get("/edit-video",editVideo);
export default videoRouter; //다른 파일에서 video globalRouter를 하면, 이렇게 export default한 변수를 사용하게 됨.