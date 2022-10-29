import express from "express";
import { joinUser, login } from "../controllers/userControllers.js";
import { searchVideo, trendingVideo, watchVideo } from "../controllers/videoControllers.js";

const globalRouter = express.Router();
const handleHome = (req,res)=> {
    return res.send("<h1>Home<h1>");
}
const handleJoin = (req,res)=> {
    return res.send("<h1>Join page<h1>");
}

globalRouter.get("/",trendingVideo);
globalRouter.get("/join",joinUser);
globalRouter.get("/login",login);
globalRouter.get("/search",searchVideo);

export default globalRouter;