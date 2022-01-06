import { TextField } from "@material-ui/core";
import { Table, Modal, DatePicker } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deletPatientDetailsAction,
  fetchPatientAction,
} from "../redux/actions/patientAction";

export default function treatmentHistory() {
  const patientReducer = useSelector((state) => state.patientReducer);
  const userReducer = useSelector((state) => state.userReducer);
  const [patients, setpatients] = useState([]);
  const [total, settotal] = useState(0);
  const [count, setcount] = useState(0);
  const [patientNameFilter, setpatientNameFilter] = useState("");
  const [diagnosisFilter, setdiagnosisFilter] = useState("");
  const [dateFilter, setdateFilter] = useState();
  const [showModal, setshowModal] = useState(false);
  const pageSize = 10;
  const dispatch = useDispatch();

  const deleteTreatmentDetail = (id, diagnosis_id) => {
    const data = {
      _id: id,
      diagnosis_id,
    };
    dispatch(deletPatientDetailsAction(data));
  };
  const updateTreatmentDetail = (id, diagnosis_id) => {
    console.log({ id, diagnosis_id });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "patientName",
    },
    {
      title: "Treatment",
      dataIndex: "history",
      render: (text, record) => text.treatmentDetails.treatment,
    },
    {
      title: "Dignosis",
      dataIndex: "history",
      render: (text, record) => text.diagnosis,
    },
    {
      title: "Date",
      dataIndex: "history",
      render: (text, record) =>
        moment(text.treatmentDetails.updatedAt).format("DD MMMM YYYY"),
    },
    {
      title: "Delete",
      render: (text, record) => (
        <button
          className='delete-btn'
          onClick={() => deleteTreatmentDetail(text._id, record.history._id)}
        >
          Delete
        </button>
      ),
    },
    {
      title: "Update",
      render: (text, record) => (
        <button
          className='update-btn'
          onClick={() => updateTreatmentDetail(text._id, record.history._id)}
        >
          Update
        </button>
      ),
    },
  ];

  const closeModal = () => {
    showModal(false);
  };

  const openModal = () => {
    showModal(false);
  };

  const patientModal = () => {
    return (
      <Modal
        title={"Patient diagnosis"}
        visible={showModal}
        onOk={() => {
          // handleSubResourceInfoModal();
          // handleOnOkSubResource();
        }}
        onCancel={closeModal}
        width={1500}
      ></Modal>
    );
  };

  
  
  const handleSearch = () => {
    let data = {
      _id: userReducer.user._id,
      diagnosis: diagnosisFilter !== "" ? diagnosisFilter : null,
      patientName: patientNameFilter !== "" ? patientNameFilter : null,
      startDate: dateFilter ? dateFilter[0].format("MM/DD/YYYY") : null,
      endDate: dateFilter ? dateFilter[1].format("MM/DD/YYYY") : null,
    };
    dispatch(fetchPatientAction(data, count - 1));
  };
  
  useEffect(() => {
    let data = {
      _id: userReducer.user._id,
      diagnosis: diagnosisFilter !== "" ? diagnosisFilter : null,
      patientName: patientNameFilter !== "" ? patientNameFilter : null,
      startDate: dateFilter ? dateFilter[0].format("MM/DD/YYYY") : null,
      endDate: dateFilter ? dateFilter[1].format("MM/DD/YYYY") : null,
    };
    dispatch(fetchPatientAction( data , count - 1));
  }, [count]);

  useEffect(() => {
    setpatients(patientReducer.patients);
    settotal(patientReducer.total);
  }, [patientReducer.patients.length]);

  return (
    <>
      <div className='container'>
        <div className='dashboard-container'>
          <div className='content treatment-option'>
            <div className='filters'>
              <TextField
                variant='filled'
                color='primary'
                placeholder='Patient Name'
                value={patientNameFilter}
                onChange={(e) => setpatientNameFilter(e.target.value)}
                fullWidth
              />
              <TextField
                variant='filled'
                color='primary'
                placeholder='Diagnosis'
                value={diagnosisFilter}
                onChange={(e) => setdiagnosisFilter(e.target.value)}
                fullWidth
              />

              <DatePicker.RangePicker
                format={"DD/MMMM/YYYY"}
                onChange={(datesMoment, value) => setdateFilter(datesMoment)}
                size={"large"}
              />

              <button onClick={handleSearch} className='search-btn'>Search</button>
            </div>

            <Table
              pagination={{
                defaultCurrent: 1,
                onChange: (page) => setcount(page),
                pageSize: pageSize,
                total: total,
                showSizeChanger: false,
              }}
              style={{ width: "100%" }}
              bordered
              columns={columns}
              dataSource={patients.map((item) => {
                item.key = item.history._id;
                return item;
              })}
            />
          </div>
        </div>
      </div>
    </>
  );
}
