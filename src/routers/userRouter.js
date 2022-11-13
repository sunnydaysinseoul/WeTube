import express from "express";
import { deleteUser, editUser, logout, profile } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/edit",editUser);
userRouter.get("/delete",deleteUser)
userRouter.get("/:userId/profile",profile);
export default userRouter;