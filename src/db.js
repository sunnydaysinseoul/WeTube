import mongoose from "mongoose";


mongoose.connect("mongodb://127.0.0.1:27017/wetube",{useNewUrlParser:true,useUnifiedTopology:true});

const db = mongoose.connection;

const handleOpen=()=>console.log("✅Connected to DB.");
const handleError=(error)=>console.log("❌DB connection Error!");

db.on("error",handleError); //error가 발생할 떄 마다
db.once("open",handleOpen); //DB가 1번(once) 오픈되면
