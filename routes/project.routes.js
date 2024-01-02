import express from "express";
import { createNew, deleteOne, getAll, getOneById, updateOne } from '../controllers/project.controller.js';
import { isAuthenticated,isAuthorized } from '../middlewares/authHandler.js';

const projectRouter = express.Router();

projectRouter.route("/project/create").post(isAuthenticated,isAuthorized('admin'),createNew);
projectRouter.route("/project/get-all").get( getAll);
projectRouter.route("/project/get/:id").get(isAuthenticated, getOneById);
projectRouter.route("/project/update/:id").put(isAuthenticated,isAuthorized('admin'),updateOne);
projectRouter.route("/project/delete/:id").delete(isAuthenticated,isAuthorized('admin'),deleteOne);
  
export default projectRouter;
