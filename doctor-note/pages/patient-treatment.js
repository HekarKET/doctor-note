import React from "react";
import withAuth from "../util/auth";
import SelectCustom from "../util/Select";
import { TextField } from "@material-ui/core";


const addPatient = () => {
  return (
    <>
      <div className="container">
        <div className="dashboard-container">
        
          <div className="content">
            <button className="add-btn">Add Patient</button>
            <TextField
              placeholder='Patient Name *'
              variant='filled'
              required
              color='primary'
              fullWidth
            />
            <TextField
              placeholder='Address'
              variant='filled'
              color='primary'
              fullWidth
            />
            <TextField
              placeholder='Age Range'
              variant='filled'
              color='primary'
              fullWidth
            />
            <button className="add-btn">Add Treatment</button>
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
