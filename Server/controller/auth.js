import mongoose from "mongoose";
import { getToken } from "../util/auth-middleware.js";
import doctorModel from "../model/doctor.js";

export const getDoctors = async (req, res, next) => {
  try {
    const doctors = await doctorModel.find();

    res.status(200).send({ doctors });
  } catch (error) {
    next(error);
  }
};

export const getSingleDoctor = async (req, res, next) => {
  try {
    const id = req.params.id;
    const doctor = await doctorModel.findById(id);
    res.status(200).send({ doctor });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body) {
      //422 indicates inproper response
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
      let exist = await doctorModel.findOne({ email: body.email });
      if (exist != null) {
        //406 indicates not acceptable
        res.status(406).send({ error: "Email already exist" });
      }
      exist = await doctorModel.findOne({ userName: body.userName });
      if (exist != null) {
        res.status(406).send({ error: "User Name already exist" });
      } else {
        const newUser = new doctorModel(body);
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
    const doctor = await doctorModel.findOne({ userName, password });
    if (!userName) {
      res.status(422).send({ message: "username is mandatory" });
    } else if (!password) {
      res.status(422).send({ message: "password is mandatory" });
    }
    if (doctor) {
      res.status(200).send({ token: getToken(doctor) });
    } else {
      res.status(403).send({ message: "password is incorrect" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (req, res, next) => {
  try {
    //fetching id and rest of the body
    const { _id, ...rest } = req.body;
    if (!_id) {
      res.status(422).send({ message: "Id is mandatory" });
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(422).send({ message: "Invalid Id" });
    } else if (_id == req.user._id) {
      res.status(401).send({ message: "Invalid token" });
    }
    const newUser = await doctorModel.findByIdAndUpdate(_id, rest);
    if (newUser) {
      res.status(200).send({ token: getToken(newUser) });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    //we only need id of the user to delete
    //rest things can be redundant
    const { _id, ...rest } = req.body;
    console.log(_id);

    if (!_id) {
      res.status(422).send({ message: "Id is mandatory" });
    } else if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(422).send({ message: "Invalid Id" });
    }
    const newUser = await doctorModel.findByIdAndDelete(_id);
    if (newUser) {
      res.status(202).send({ message: "User successfuly deleted" });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};
