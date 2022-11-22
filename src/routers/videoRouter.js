import express from "express";
import { deleteVideo, getEditVideo, watchVideo, postEditVideo, postUploadVideo, getUploadVideo } from "../controllers/videoControllers.js";
import { protectorMiddleware, videoUpload } from "../middlewares.js";

/* base URL : /videos/ */
const videoRouter = express.Router();

videoRouter.route("/upload").all(protectorMiddleware).get(getUploadVideo).post(videoUpload.single("video"),postUploadVideo)

videoRouter.get("/:id([0-9a-f]{24})",watchVideo); //regex.

videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEditVideo).post(postEditVideo);

videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);
export default videoRouter; //다른 파일에서 video globalRouter를 하면, 이렇게 export default한 변수를 사용하게 됨.