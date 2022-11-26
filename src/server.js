import express from "express";
import session from "express-session";
import MongoStore from 'connect-mongo';
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
    secret: process.env.COOKIE_SECRET, /*우리가 쿠키에 sign할 때 사용하는 string.
                        해당 쿠키가 내 서버에서 왔다는 것을 증명.
                        session hijacking방지*/
    resave: false,
    saveUninitialized: false,
    cookie:{
      // maxAge : 20000 //milliseconds
    },
    createIndexes: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    })
  })
);
app.use(localsMiddleware);
app.use("/uploads",express.static("uploads")); //static files serving : /uploads라는 url로 가면 uploads폴더안의 내용을 읽으라는뜻
app.use("/static",express.static("assets"));
app.use("/",globalRouter);
app.use("/users",userRouter);
app.use("/videos",videoRouter);

export default app;
