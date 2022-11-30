import express from "express";
import { registerView } from "../controllers/videoControllers.js";
/* URL : /api */
const apiRouter = express.Router();

apiRouter.post("/videos/:id[0-9a-f]{24}/view",registerView);

export default apiRouter;