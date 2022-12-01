import express from "express";
import { createComment, registerView,deleteComment } from "../controllers/videoControllers.js";
/* URL : /api */
const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view",registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment",createComment)
apiRouter.post("/videos/:id([0-9a-f]{24})/delete",deleteComment)
export default apiRouter;