/* URL : /videos/ */

import express from "express";
import { deleteVideo, getEditVideo, watchVideo, postEditVideo, postUploadVideo, getUploadVideo } from "../controllers/videoControllers.js";

const videoRouter = express.Router();


videoRouter.route("/upload").get(getUploadVideo).post(postUploadVideo)

videoRouter.get("/:vId(\\d+)",watchVideo); //regex. vId로 숫자만 올수있다는뜻

videoRouter.route("/:vId/edit").get(getEditVideo).post(postEditVideo);

videoRouter.get("/:vId/delete",deleteVideo);
export default videoRouter; //다른 파일에서 video globalRouter를 하면, 이렇게 export default한 변수를 사용하게 됨.