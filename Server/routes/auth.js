import express from "express";
import { login, register } from "../controller/auth.js";
import { isAuth } from "../util/auth-middleware.js";
const routes = express.Router();
routes.post("/register", register);
routes.post("/login", login);

export default routes;
