import express from "express";
import { deleteUser, signin, signinUpdate, signout, signup,test } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.route("/").get(test);
authRouter.route("/auth/signup").post(signup);
authRouter.route("/auth/signin").post(signin);
authRouter.route("/auth/update/:id").put(signinUpdate);
authRouter.route("/auth/signout").get(signout);
authRouter.route("/auth/delete/:id").delete(deleteUser);

export default authRouter;
