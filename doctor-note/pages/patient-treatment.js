import React, { useEffect, useState } from "react";
import withAuth from "../util/auth";
import SelectCustom from "../util/Select";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import {
  addPatientAction,
  addTreatmentAction,
  fetchAllPatientsNameAction,
  fetchPatientNamesAction,
} from "../redux/actions/patientAction";
import { useSelector } from "react-redux";
import { openNotification } from "../util/notification";

const addPatient = () => {
  const [patientName, setpatientName] = useState("");
  const [patientNames, setpatientNames] = useState([]);
  const [ageRange, setageRange] = useState("");
  const [address, setaddress] = useState("");

  const [patientName2, setpatientName2] = useState({ patientName: "" });
  const [treatment, settreatment] = useState("");
  const [diagnosis, setdiagnosis] = useState("");

  const [incomplete, setincomplete] = useState(false);
  const [incomplete2, setincomplete2] = useState(false);

  const userReducer = useSelector((state) => state.userReducer);
  const patientReducer = useSelector((state) => state.patientReducer);
  const dispatch = useDispatch();

  const handleAddPatient = () => {
    if (patientName === "") {
      setincomplete(true);
    } else {
      const data = {
        patientName,
      };
      if (ageRange !== "") {
        data.ageRange = ageRange;
      }
      if (address !== "") {
        data.address = address;
      }
      dispatch(addPatientAction(data));
    }
  };

  const checkIncomplete = (variable) => {
    return variable === "" && incomplete;
  };

  useEffect(() => {
    dispatch(fetchAllPatientsNameAction());
  }, []);

  useEffect(() => {
    setpatientNames(patientReducer.patientNames);
  }, [patientReducer.patientNames.length]);

  const handleAddTreatment = () => {
    if (
      patientName2.patientName === "" ||
      treatment === "" ||
      diagnosis === ""
    ) {
      // console.log("hello")
      setincomplete2(true);
    } else {
      // console.log("hello4")

      const data = {
        _id: patientName2._id,
        diagnosis: diagnosis,
        treatmentDetails: {
          doctor: userReducer.user._id,
          treatment: treatment,
        },
      };
      dispatch(addTreatmentAction(data));
    }
  };

  const checkIncomplete2 = (variable) => {
    return variable === "" && incomplete2;
  };

  useEffect(() => {
    if (patientReducer.action === "ADD_TREATMENT") {
      if (!patientReducer.loading) {
        if (patientReducer.sucess) {
          openNotification("success", "Treatment added");
        } else {
          openNotification("error", "Sorry! Something went wrong.");
          // console.log(patientReducer);
        }
      }
    }

    if (patientReducer.action === "ADD_PATIENT") {
      if (!patientReducer.loading) {
        if (patientReducer.sucess) {
          openNotification("success", "Patient added");
        } else {
          if (patientReducer.message) {
            openNotification("error", patientReducer.message);
          } else {
            openNotification("error", "Sorry! Something went wrong.");
          }
          // console.log(patientReducer);
        }
      }
    }
  }, [
    patientReducer.action,
    patientReducer.success,
    patientReducer.error,
    patientReducer.loading,
  ]);

  return (
    <>
      <div className="container">
        <div className="dashboard-container">
          <div className="content">
            <button onClick={handleAddPatient} className="add-btn">
              Add Patient
            </button>

            <TextField
              placeholder="Patient Name *"
              variant="filled"
              error={checkIncomplete(patientName)}
              helperText={
                checkIncomplete(patientName)
                  ? "Patient Name is Mandatory"
                  : null
              }
              required
              color="primary"
              fullWidth
              value={patientName}
              onChange={(e) => setpatientName(e.target.value)}
            />

            <TextField
              placeholder="Address"
              variant="filled"
              color="primary"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              fullWidth
            />
            <TextField
              placeholder="Age Range"
              variant="filled"
              color="primary"
              value={ageRange}
              onChange={(e) => setageRange(e.target.value)}
              fullWidth
            />

            <button className="add-btn" onClick={handleAddTreatment}>
              Add Treatment
            </button>

            <Autocomplete
              value={patientName2}
              options={patientNames}
              // placeholder='Patient Names'
              variant="filled"
              onChange={(e, v) => setpatientName2(v)}
              getOptionLabel={(option) => option.patientName}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={
                    patientName2 && checkIncomplete2(patientName2.patientName)
                  }
                  helperText={
                    patientName2 && checkIncomplete2(patientName2.patientName)
                      ? "patient name is Mandatory"
                      : null
                  }
                  label="Patient Name"
                  variant="filled"
                />
              )}
            />
            <TextField
              placeholder="Diagnosis*"
              variant="filled"
              color="primary"
              error={checkIncomplete2(diagnosis)}
              helperText={
                checkIncomplete2(diagnosis)
                  ? "Diagnosis Name is Mandatory"
                  : null
              }
              value={diagnosis}
              onChange={(e) => setdiagnosis(e.target.value)}
              fullWidth
            />
            <TextField
              placeholder="Treatment*"
              variant="filled"
              color="primary"
              error={checkIncomplete2(treatment)}
              helperText={
                checkIncomplete2(treatment)
                  ? "Treatment Name is Mandatory"
                  : null
              }
              value={treatment}
              onChange={(e) => settreatment(e.target.value)}
              fullWidth
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default withAuth(addPatient);
