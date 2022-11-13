
import express from "express";
import session from "express-session";
import morgan from "morgan"; //유용한 Middleware
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import { localsMiddleware } from "./middlewares.js";

/************************************변수지정************************************/
//Express Application(서버) 생성하기
const app = express();
//import 해온 morgan함수를 변수에 지정.
const logger = morgan("tiny"); 



///*************************Express application Settings*************************/
app.set("view engine", "pug");
app.set("views",process.cwd() + "/src/views");
app.use(logger); //morgan middleware
app.use(express.urlencoded({extended:true}));
app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
    createIndexes: true
  })
);
app.use(localsMiddleware);
app.use("/",globalRouter);
app.use("/users",userRouter);
app.use("/videos",videoRouter);

export default app;
