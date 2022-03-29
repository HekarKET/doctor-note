import express from "express";
import { predPneumonia } from "../controller/xray-pred.js";
import { isAuth } from "../util/auth-middleware.js";
import multer from "multer";
const upload = multer({ dest: "public/" });
const route = express.Router();

route.post("/pneumonia", upload.single("image"), isAuth, predPneumonia);

export default route;
