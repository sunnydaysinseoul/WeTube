import express from "express";
import { checkLogin, confirmEmail, getJoin, getLogin, logout, postJoin, postLogin } from "../controllers/userControllers.js";
import { searchVideo } from "../controllers/videoControllers.js";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares.js";

/* base URL : / */
const globalRouter = express.Router();

globalRouter.route("/").get(checkLogin);
globalRouter.route("/logout").all(protectorMiddleware).get(logout)
globalRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
globalRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
globalRouter.get("/search",searchVideo);
globalRouter.get('/confirmation/:email/:token',confirmEmail)
export default globalRouter;