import express from "express";
import { joinUser, login } from "../controllers/userControllers.js";
import { searchVideo, home } from "../controllers/videoControllers.js";

const globalRouter = express.Router();
const handleHome = (req,res)=> {
    return res.send("<h1>Home<h1>");
}
const handleJoin = (req,res)=> {
    return res.send("<h1>Join page<h1>");
}

globalRouter.get("/",home);
globalRouter.get("/join",joinUser);
globalRouter.get("/login",login);
globalRouter.get("/search",searchVideo);

export default globalRouter;