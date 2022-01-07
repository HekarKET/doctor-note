import React, { useEffect, useState } from "react";
import withAuth from "../util/auth";
import SelectCustom from "../util/Select";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import {
  addPatientAction,
  fetchPatientNamesAction,
} from "../redux/actions/patientAction";
import { useSelector } from "react-redux";

const addPatient = () => {
  const [patientName, setpatientName] = useState("");
  const [patientNames, setpatientNames] = useState([]);
  const [ageRange, setageRange] = useState("");
  const [address, setaddress] = useState("");
  const [incomplete, setincomplete] = useState(false);
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
      dispatch(addPatientAction(data));
    }
  };

  const checkIncomplete = (variable) => {
    return variable === "" && incomplete;
  };

  useEffect(() => {
    let data = {
      _id: userReducer.user._id,
    };
    dispatch(fetchPatientNamesAction(data));
  }, []);

  useEffect(() => {
    setpatientNames(patientReducer.patientNames);
  }, [patientReducer.patientNames.length]);

  return (
    <>
      <div className='container'>
        <div className='dashboard-container'>
          <div className='content'>
            <button onClick={handleAddPatient} className='add-btn'>
              Add Patient
            </button>

            <TextField
              placeholder='Patient Name *'
              variant='filled'
              error={checkIncomplete(patientName)}
              helperText={
                checkIncomplete(patientName)
                  ? "Patient Name is Mandatory"
                  : null
              }
              required
              color='primary'
              fullWidth
              value={patientName}
              onChange={(e) => setpatientName(e.target.value)}
            />

            <TextField
              placeholder='Address'
              variant='filled'
              color='primary'
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              fullWidth
            />
            <TextField
              placeholder='Age Range'
              variant='filled'
              color='primary'
              value={ageRange}
              onChange={(e) => setageRange(e.target.value)}
              fullWidth
            />
            <button className='add-btn'>Add Treatment</button>
            <TextField
              placeholder='Patient ID'
              variant='filled'
              color='primary'
              fullWidth
            />
            <TextField
              placeholder='Treatment'
              variant='filled'
              color='primary'
              fullWidth
            />
            <TextField
              placeholder='Diagnosis'
              variant='filled'
              color='primary'
              fullWidth
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default withAuth(addPatient);
