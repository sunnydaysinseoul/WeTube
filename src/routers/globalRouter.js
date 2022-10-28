import express from "express";

const globalRouter = express.Router();



globalRouter.get("/",trendingVideo); //controller는 videoControllers로 옮겨주었음
globalRouter.get("/join",joinUser); //controller는 userControllers로 옮겨주었음
export default globalRouter; //다른 파일에서 import globalRouter를 하면, 이렇게 export default한 변수를 사용하게 됨.