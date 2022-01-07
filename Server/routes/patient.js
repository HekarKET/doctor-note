import express from "express";
import {
  addPatient,
  addPatientTreatmentDetails,
  deletePatient,
  deletePatientTreatmentDetails,
  getPatient,
  getPatientByDoctor,
  getPatientNameByDoctor,
  updatePatient,
  updatePatientTreatmentDetails,
} from "../controller/patient.js";
import { isAuth } from "../util/auth-middleware.js";
const route = express.Router();
route.get("/", isAuth, getPatient);
route.post("/name", isAuth, getPatientNameByDoctor);
route.post("/doctor", isAuth, getPatientByDoctor);
route.post("/add", isAuth, addPatient);
route.post("/update", isAuth, updatePatient);
route.post("/delete", isAuth, deletePatient);
route.post("/add/diagnosis", isAuth, addPatientTreatmentDetails);
route.post("/update/diagnosis", isAuth, updatePatientTreatmentDetails);
route.post("/delete/diagnosis", isAuth, deletePatientTreatmentDetails);




export default route;
