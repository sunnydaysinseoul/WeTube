import express from "express";
import { deleteVideo, getEditVideo, watchVideo, postEditVideo, postUploadVideo, getUploadVideo } from "../controllers/videoControllers.js";

/* base URL : /videos/ */
const videoRouter = express.Router();

videoRouter.route("/upload").get(getUploadVideo).post(postUploadVideo)

videoRouter.get("/:id([0-9a-f]{24})",watchVideo); //regex. vId로 숫자만 올수있다는뜻

videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEditVideo).post(postEditVideo);

videoRouter.get("/:id([0-9a-f]{24})/delete",deleteVideo);
export default videoRouter; //다른 파일에서 video globalRouter를 하면, 이렇게 export default한 변수를 사용하게 됨.