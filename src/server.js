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

const logger = (req,res,next) => {
    console.log(`Someone is going to: ${req.url}, Method : ${req.method}`);
    next();
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
//Application 설정하기 ("URL",function))
app.use(logger); //모든 route에서 이 middleware를 거쳐가게됨!
app.use(privateMiddleware);
app.get("/",() =>console.log("Get request : ROOT에 접속"));
app.get("/home",handleHome); //home경로에 접속시 gossipMiddleware 함수 실행하고, next()를 만나서 handleHome을 실행해줌.
app.get("/login",handleLogin);
app.get("/protected",handleProtected) //privateMiddleware 미들웨어가 이 주소를 걸러서, handleProcted까지 실행되지 않도록 막아줄 것임.