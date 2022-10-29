import express from "express";
import { deleteVideo, editVideo, uploadVideo, watchVideo } from "../controllers/videoControllers.js";

const videoRouter = express.Router();

videoRouter.get("/upload",uploadVideo);
videoRouter.get("/:vId(\\d+)/watch",watchVideo); //regex. vId로 숫자만 올수있다는뜻
videoRouter.get("/:vId/edit",editVideo);
videoRouter.get("/:vId/delete",deleteVideo);
export default videoRouter; //다른 파일에서 video globalRouter를 하면, 이렇게 export default한 변수를 사용하게 됨.