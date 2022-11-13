import express from "express";
import { checkLogin, getJoin, getLogin, logout, postJoin, postLogin } from "../controllers/userControllers.js";
import { searchVideo } from "../controllers/videoControllers.js";

const globalRouter = express.Router();

globalRouter.route("/").get(checkLogin);
globalRouter.route("/logout").get(logout)
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/search",searchVideo);

export default globalRouter;