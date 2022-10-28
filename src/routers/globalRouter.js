import express from "express";
import { joinUser } from "../controllers/userControllers.js";
import { watchVideo } from "../controllers/videoControllers.js";

const globalRouter = express.Router();
const handleHome = (req,res)=> {
    return res.send("<h1>Home<h1>");
}
const handleJoin = (req,res)=> {
    return res.send("<h1>Join page<h1>");
}

globalRouter.get("/",watchVideo);
globalRouter.get("/join",joinUser);

export default globalRouter;