import mongoose from "mongoose";
import { getToken } from "../util/auth-middleware.js";
import userModel from "../model/user.js";

export const register = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body) {
      res.status(422).send({ message: "body is mandatory" });
    } else if (!body.name) {
      res.status(422).send({ message: "Name is mandatory" });
    } else if (!body.userName) {
      res.status(422).send({ message: "username is mandatory" });
    } else if (!body.address) {
      res.status(422).send({ message: "address is mandatory" });
    } else if (!body.email) {
      res.status(422).send({ message: "email is mandatory" });
    } else if (!body.password) {
      res.status(422).send({ message: "password is mandatory" });
    } else if (!body.destrict) {
      res.status(422).send({ message: "destrict is mandatory" });
    } else if (!body.state) {
      res.status(422).send({ message: "state is mandatory" });
    } else {
      let exist = await userModel.findOne({ email: body.email });
      if (exist != null) {
        //406 for not acceptable
        res.status(406).send({ error: "Email already exist" });
      }
      exist = await userModel.findOne({ userName: body.userName });
      if (exist != null) {
        res.status(406).send({ error: "User Name already exist" });
      } else {
        const newUser = new userModel(body);
        await newUser.save();
        res.status(201).send({ token: getToken(newUser) });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await userModel.findOne({ userName, password });
    if (!userName) {
      res.status(422).send({ message: "username is mandatory" });
    } else if (!password) {
      res.status(422).send({ message: "password is mandatory" });
    }
    console.log(user);
    if (user) {
      res.status(200).send({ token: getToken(user) });
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (error) {
    next(error);
  }
};


