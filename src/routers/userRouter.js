import express from "express";
import { deleteUser, profile,startGithubLogin,finishGithubLogin, getEditUser, postEditUser } from "../controllers/userControllers.js";

/* base URL : /users/ */
const userRouter = express.Router();

userRouter.get("/github/login",startGithubLogin);
userRouter.get("/github/finLogin",finishGithubLogin); //이 url은 https://github.com/settings/developers 에서 지정
userRouter.route("/:userId/edit").get(getEditUser).post(postEditUser);
userRouter.get("/:userId/profile",profile);
userRouter.get("/delete",deleteUser)

export default userRouter;