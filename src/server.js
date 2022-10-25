import express from "express";
import morgan from "morgan"; //유용한 Middleware

/*
-화살표 함수 기본 문법
var/let/const 함수명 = (매개변수) => {실행문}
-이건 다음과 같음..
function 함수명(매개변수){
    실행문;
}
*/ 

/************************************변수지정************************************/
const PORT = 4000;

//Express Application(서버) 생성하기
const app = express();
//import 해온 morgan함수를 변수에 지정.
const logger = morgan(""); 

const globalRouter = express.Router();
const userRouter = express.Router();
const videoRouter = express.Router();

//Port를열고 외부 접속(request)을 listen하기
const handleListening = () => 
    console.log(`<Server listening on port ${PORT}.👍\nCheck out http://localhost:${PORT} !>`);
app.listen(PORT,handleListening);

//localhost:4040/home 과  request주고받기
const handleHome = (req,res)=> {
    // return res.end();
    return res.send("<h1>Are you still there?<h1>");
}

const handleLogin = (req,res) => {
    return res.send("This is Login Page.");
}

 const privateMiddleware = (req,res,next)=>{
    const url = req.url;
    if(url === "/protected"){
        return res.send("<h1>Not Allowed.</h1>")
    }
    console.log("Allowed.")
    next();
 }
const handleProtected = (req,res) =>{
    return res.send("Welcome to the private lounge.")
}


///*************************Express application Settings*************************/
app.use(logger); 
app.use(privateMiddleware);

app.get("/",() =>console.log("Get request : ROOT에 접속"));
app.get("/home",handleHome); //home경로에 접속시 gossipMiddleware 함수 실행하고, next()를 만나서 handleHome을 실행해줌.
app.get("/login",handleLogin);
app.get("/protected",handleProtected) //privateMiddleware 미들웨어가 이 주소를 걸러서, handleProcted까지 실행되지 않도록 막아줄 것임.
