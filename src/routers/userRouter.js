import express from "express";

const userRouter = express.Router();
const handleEdit = (req,res)=> {
    return res.send("Edit user page.");
}
const handleDelete = (req,res)=> {
    return res.send("Edit user page.");
}
userRouter.get("/edit",handleEdit);
userRouter.get("/delete",handleDelete)

export default userRouter; //다른 파일에서 import userRouter를 하면, 이렇게 export default한 변수를 사용하게 됨.