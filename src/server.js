import "./db.js";
import "./models/Video.js";
import express from "express";
import morgan from "morgan"; //유용한 Middleware
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";

/************************************변수지정************************************/
const PORT = 4000;

//Express Application(서버) 생성하기
const app = express();
//import 해온 morgan함수를 변수에 지정.
const logger = morgan(""); 

//Port를열고 외부 접속(request)을 listen하기
const handleListening = () => 
    console.log(`✅Server listening on port ${PORT}.👍`);
app.listen(PORT,handleListening);


///*************************Express application Settings*************************/
app.set("view engine", "pug");
app.set("views",process.cwd() + "/src/views");
app.use(logger); //morgan middleware

app.use(express.urlencoded({extended:true}));
app.use("/",globalRouter);
app.use("/users",userRouter);
app.use("/videos",videoRouter);
