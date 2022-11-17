import express from "express";
import { deleteUser, editUser, logout, profile,startGithubLogin,finishGithubLogin } from "../controllers/userControllers.js";

/* base URL : /users/ */
const userRouter = express.Router();

userRouter.get("/edit",editUser);
userRouter.get("/delete",deleteUser)
userRouter.get("/:userId/profile",profile);
userRouter.get("/github/login",startGithubLogin);
userRouter.get("/github/finLogin",finishGithubLogin);

export default userRouter;