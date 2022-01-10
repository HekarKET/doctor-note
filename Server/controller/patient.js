import mongoose from "mongoose";
import patientModel from "../model/patient.js";

export const getPatient = async (req, res, next) => {
  try {
    let page = req.headers.page;
    page = Math.max(page || 0, 0);
    const patients = await patientModel.find(null, null, {
      skip: page * 10,
      limit: 10,
    });

    res.status(200).send({ patients });
  } catch (error) {
    next(error);
  }
};

export const getPatientByDoctor = async (req, res, next) => {
  try {
    const { _id, ...rest } = req.body;
    let page = req.headers.page;
    page = Math.max(page || 0, 0);
    if (!_id) {
      res.status(422).send({ message: "id is mandatory" });
    } else if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(422).send({ message: "Invalid Id" });
    }
    let query = {
      "history.treatmentDetails.doctor": mongoose.Types.ObjectId(_id),
    };
    if (rest.patientName) {
      query.patientName = rest.patientName;
    }

    if (rest.diagnosis) {
      query["history.diagnosis"] = rest.diagnosis;
    }

    if (rest.startDate && rest.endDate) {
      const startString = new Date(rest.startDate).toISOString();
      const endString = new Date(rest.endDate).toISOString(); //"01/07/2022" -> month/day/year
      query["history.createdAt"] = {
        $gte: new Date(startString),
        $lte: new Date(endString),
      };
    }

    let skip = page === 0 ? 0 : page * 10;
    const patients = await patientModel.aggregate([
      { $unwind: "$history" },
      {
        $match: query,
      },
      {
        $sort: { "history.createdAt": 1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: 10,
      },
    ]);

    const data = { patients };
    if (page === 0) {
      const total = await patientModel.aggregate([
        { $unwind: "$history" },
        {
          $match: query,
        },
      ]);
      data.total = total.length;
    }
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

export const getPatientNameByDoctor = async (req, res, next) => {
  try {
    const { _id, ...rest } = req.body;
    let page = req.headers.page;
    page = Math.max(page || 0, 0);
    if (!_id) {
      res.status(422).send({ message: "id is mandatory" });
    } else if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(422).send({ message: "Invalid Id" });
    }

    const patients = await patientModel.aggregate([
      { $unwind: "$history" },
      {
        $match: {
          "history.treatmentDetails.doctor": mongoose.Types.ObjectId(_id),
        },
      },
      {
        $group: { _id: "$_id", patientName: { $first: "$patientName" } },
      },
    ]);
    res.status(200).send(patients);
  } catch (error) {
    next(error);
  }
};

export const getPatientNames = async (req, res, next) => {
  try {
    const patients = await patientModel.aggregate([
      // { $unwind: "$history" },
      {
        $match: {
          // "history.treatmentDetails.doctor": mongoose.Types.ObjectId(_id),
        },
      },
      {
        $group: { _id: "$_id", patientName: { $first: "$patientName" } },
      },
    ]);
    res.status(200).send(patients);
  } catch (error) {
    next(error);
  }
};

export const addPatient = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body) {
      res.status(422).send({ message: "body is mandatory" });
    } else if (!body.patientName) {
      res.status(422).send({ message: "body is mandatory" });
    } else {
      const exist = await patientModel.findOne({
        patientName: body.patientName,
      });
      if (exist) {
        res.status(406).send({ message: "patient name already exist" });
      } else {
        const patient = new patientModel(body);
        await patient.save();
        res
          .status(201)
          .send({ message: "successfully new patient added", data: patient });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const updatePatient = async (req, res, next) => {
  try {
    const { _id, ...rest } = req.body;
    if (!_id) {
      res.status(422).send({ message: "id is mandatory" });
    } else if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(422).send({ message: "Invalid Id" });
    } else {
      const patient = await patientModel.findByIdAndUpdate(_id, rest, {
        new: true,
      });
      if (patient) {
        res
          .status(202)
          .send({ message: "patient successfully updated", data: patient });
      } else {
        res.status(404).send({ message: "patient not found" });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const deletePatient = async (req, res, next) => {
  try {
    const { _id, ...rest } = req.body;
    if (!_id) {
      res.status(422).send({ message: "id is mandatory" });
    } else if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(422).send({ message: "Invalid Id" });
    } else {
      const patient = await patientModel.findByIdAndDelete(_id);
      if (patient) {
        res.status(202).send({ message: "patient successfully deleted" });
      } else {
        res.status(404).send({ message: "patient not found" });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const addPatientTreatmentDetails = async (req, res, next) => {
  try {
    const { _id, diagnosis, treatmentDetails } = req.body;
    if (!_id) {
      res.status(422).send({ message: "id is mandatory" });
    } else if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(422).send({ message: "Invalid Id" });
    } else if (!diagnosis) {
      res.status(422).send({ message: "Please send diagnosis" });
    } else if (!treatmentDetails) {
      res.status(422).send({ message: "Please send treatmentDetails" });
    } else if (!treatmentDetails.doctor) {
      res.status(422).send({ message: "Please send doctor id" });
    } else if (!mongoose.Types.ObjectId.isValid(treatmentDetails.doctor)) {
      res.status(422).send({ message: "Please send valid doctor id" });
    } else if (!treatmentDetails.treatment) {
      res.status(422).send({ message: "Please send treatment" });
    } else {
      let patient = await patientModel.findById(_id);
      if (!patient) {
        res.status(404).send({ message: "patient not found" });
      }
      const newDetails = {
        diagnosis,
        treatmentDetails,
      };

      patient.history.push(newDetails);
      // console.log(patient);
      const patientUpdated = await patientModel.findByIdAndUpdate(
        _id,
        { $push: { history: newDetails } },
        { new: true }
      );
      res
        .status(202)
        .send({ message: "diagnosis succesfully added", data: patientUpdated });
    }
  } catch (error) {
    next(error);
  }
};

export const updatePatientTreatmentDetails = async (req, res, next) => {
  try {
    const { _id, history } = req.body;
    if (!_id) {
      res.status(422).send({ message: "id is mandatory" });
    } else if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(422).send({ message: "Invalid Id" });
    } else if (!history._id) {
      res.status(422).send({ message: "diagnosis id is mandatory" });
    } else if (!mongoose.Types.ObjectId.isValid(history._id)) {
      res.status(422).send({ message: "Invalid diagnosis id" });
    } else {
      const patient = await patientModel.findById(_id);
      if (!patient) {
        res.status(404).send({ message: "patient not found" });
      }
      let patientHistory = patient.history.map((item) => {
        if (item._id == history._id) {
          return history;
        } else {
          return item;
        }
      });
      let patientUpdated = patient;
      patientUpdated.history = patientHistory;
      patientUpdated = await patientModel.findByIdAndUpdate(
        _id,
        { $push: { history: patientHistory } },
        { new: true }
      );
      // console.log(patientUpdated);
      res.status(202).send({
        message: "diagnosis succesfully updated",
        data: patientUpdated,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deletePatientTreatmentDetails = async (req, res, next) => {
  try {
    const { _id, diagnosis_id } = req.body;
    if (!_id) {
      res.status(422).send({ message: "id is mandatory" });
    } else if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(422).send({ message: "Invalid Id" });
    } else if (!diagnosis_id) {
      res.status(422).send({ message: "diagnosis id is mandatory" });
    } else if (!mongoose.Types.ObjectId.isValid(diagnosis_id)) {
      res.status(422).send({ message: "Invalid diagnosis id" });
    } else {
      const patient = await patientModel.findById(_id);
      if (!patient) {
        res.status(404).send({ message: "patient not found" });
      }
      let len = patient.history.length;
      let patientHistory = patient.history.filter(
        (item) => !item._id.equals(diagnosis_id)
      );
      console.log(len + " " + patientHistory.length + " " + patientHistory);
      if (len === patientHistory.length) {
        res.status(404).send({
          message: "diagnosis not found",
        });
        res.end();
      }

      let patientUpdated = patient;
      patientUpdated.history = patientHistory;
      patientUpdated = await patientModel.findByIdAndUpdate(_id, patient, {
        new: true,
      });

      if (patientUpdated) {
        res.status(202).send({
          message: "diagnosis succesfully deleted",
        });
      } else {
        res.status(404).send({
          message: "patient not found",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
