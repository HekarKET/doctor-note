import express from "express";
import { deleteUser, login, register, updateUser } from "../controller/auth.js";
import { isAuth } from "../util/auth-middleware.js";
const routes = express.Router();
routes.post("/register", register);
routes.post("/login", login);
routes.post("/update", isAuth, updateUser);
routes.post("/delete", isAuth, deleteUser);

export default routes;
