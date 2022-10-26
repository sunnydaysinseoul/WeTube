import express from "express";

const globalRouter = express.Router();
const handleHome = (req,res)=> {
    return res.send("<h1>Home<h1>");
}

globalRouter.get("/",handleHome);

export default globalRouter; //다른 파일에서 import globalRouter를 하면, 이렇게 export default한 변수를 사용하게 됨.