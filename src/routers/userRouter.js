import express from "express";
import { deleteUser, editUser } from "../controllers/userControllers.js";

const userRouter = express.Router();
const handleEdit = (req,res)=> {
    return res.send("Edit user page.");
}
const handleDelete = (req,res)=> {
    return res.send("Edit user page.");
}
userRouter.get("/edit",editUser);
userRouter.get("/delete",deleteUser)

export default userRouter;