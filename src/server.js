import express from "express";
import morgan from "morgan"; //유용한 Middleware

/************************************변수지정************************************/
const PORT = 4000;

//Express Application(서버) 생성하기
const app = express();
//import 해온 morgan함수를 변수에 지정.
const logger = morgan(""); 

//Port를열고 외부 접속(request)을 listen하기
const handleListening = () => 
    console.log(`<Server listening on port ${PORT}.👍\nCheck out http://localhost:${PORT} !>`);
app.listen(PORT,handleListening);

//Router지정
const globalRouter = express.Router();
const userRouter = express.Router();
const videoRouter = express.Router();


const handleHome = (req,res)=> {
    return res.send("<h1>Home<h1>");
}

const handleEditUser = (req,res)=> {
    return res.send("Edit user page.");
}

const handleWatchVideo = (req,res)=> {
    return res.send("Watch videos.");
}


///*************************Express application Settings*************************/
app.use(logger); //morgan middleware

app.use("/",globalRouter);
app.use("/users",userRouter);
app.use("/videos",videoRouter);

//app대신에 만들어둔 express router를 통해 GET request 다루기.
globalRouter.get("/",handleHome);
userRouter.get("/edit",handleEditUser);
videoRouter.get("/watch",handleWatchVideo);