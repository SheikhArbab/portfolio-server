import express from "express";
import { createNew, getAll, getOneById, updateOne, deleteOne } from '../controllers/testimonial.controller.js';
import {isAuthenticated,isAuthorized} from '../middlewares/authHandler.js'

const testiRoutes = express.Router();

testiRoutes.route("/testimonial/create").post(isAuthenticated,isAuthorized('admin'),createNew);
testiRoutes.route("/testimonial/get-all").get(isAuthenticated,getAll);
testiRoutes.route("/testimonial/get/:id").get(isAuthenticated,getOneById);
testiRoutes.route("/testimonial/update/:id").put(isAuthenticated,isAuthorized('admin'),updateOne);
testiRoutes.route("/testimonial/delete/:id").delete(isAuthenticated,isAuthorized('admin'),deleteOne);

export default testiRoutes;
