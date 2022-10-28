import express from "express";
import { joinUser, editUser, deleteUser } from "../controllers/userControllers";
const userRouter = express.Router();

userRouter.get("/edit",editUser);
userRouter.get("/delete",deleteUser)

export default userRouter; //다른 파일에서 import userRouter를 하면, 이렇게 export default한 변수를 사용하게 됨.