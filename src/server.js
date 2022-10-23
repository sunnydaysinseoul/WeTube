import express from "express";
/*
-화살표 함수 기본 문법
var/let/const 함수명 = (매개변수) => {실행문}
-이건 다음과 같음..
function 함수명(매개변수){
    실행문;
}
*/ 

//변수지정
const PORT = 4000;

//Express Application(서버) 생성하기
const app = express();

//Port를열고 외부 접속(request)을 listen하기
const handleListening = () => 
    console.log(`<Server listening on port ${PORT}.👍\nCheck out http://localhost:${PORT} !>`);
app.listen(4000,handleListening);

//localhost:4040/home 과  request주고받기
const handleHome = (req,res)=> {
    // return res.end();
    return res.send("<h1>Are you still there?<h1>");
}

const handleLogin = (req,res) => {
    return res.send("This is Login Page.");
}

const gossipMiddleware = (req,res,next) => {
    console.log("I'm in the middle!");
    next();
}

//Application 설정하기 ("URL",function))
app.get("/",() =>console.log("Get request : ROOT에 접속"));
app.get("/home",gossipMiddleware,handleHome); //home경로에 접속시 gossipMiddleware 함수 실행하고, next()를 만나서 handleHome을 실행해줌.
app.get("/login",handleLogin);