import express from "express";
import {
  deleteDoctor,
  getDoctors,
  login,
  register,
  updateDoctor,
} from "../controller/auth.js";
import { isAuth } from "../util/auth-middleware.js";

//create a router to create routes for given path
const routes = express.Router();
routes.get("/", getDoctors);
routes.post("/register", register);
routes.post("/login", login);
//isAuth middleware checks if user is authenticated or not
routes.post("/update", isAuth, updateDoctor);
routes.post("/delete", isAuth, deleteDoctor);

export default routes;
