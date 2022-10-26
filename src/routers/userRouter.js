import express from "express";

const userRouter = express.Router();
const handleEditUser = (req,res)=> {
    return res.send("Edit user page.");
}

userRouter.get("/edit",handleEditUser);


export default userRouter; //다른 파일에서 import userRouter를 하면, 이렇게 export default한 변수를 사용하게 됨.