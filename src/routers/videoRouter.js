import express from "express";
import { deleteVideo, editVideo, uploadVideo, watchVideo } from "../controllers/videoControllers.js";

const videoRouter = express.Router();

videoRouter.get("/:vId/watch",watchVideo);
videoRouter.get("/:vId/edit",editVideo);
videoRouter.get("/:vId/delete",deleteVideo);
videoRouter.get("/upload",uploadVideo);
export default videoRouter; //다른 파일에서 video globalRouter를 하면, 이렇게 export default한 변수를 사용하게 됨.