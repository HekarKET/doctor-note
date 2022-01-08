import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Table, Modal, DatePicker } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deletPatientDetailsAction,
  fetchPatientAction,
  fetchPatientNamesAction,
} from "../redux/actions/patientAction";
import withAuth from "../util/auth";
import { isEmpty } from "../util/util";

const treatmentHistory = () => {
  const patientReducer = useSelector((state) => state.patientReducer);
  const userReducer = useSelector((state) => state.userReducer);
  const [patients, setpatients] = useState([]);
  const [patientNames, setpatientNames] = useState([]);
  const [total, settotal] = useState(0);
  const [count, setcount] = useState(0);
  const [recordDetails, setrecordDetails] = useState({})
  const [patientNameFilter, setpatientNameFilter] = useState({});
  const [diagnosisFilter, setdiagnosisFilter] = useState("");
  const [dateFilter, setdateFilter] = useState();
  const [showModal, setshowModal] = useState(false);
  const pageSize = 10;
  const dispatch = useDispatch();

  const deleteTreatmentDetail = (id, diagnosis_id, record) => {
    const data = {
      _id: id,
      diagnosis_id,
    };
    dispatch(deletPatientDetailsAction(data));
  };
  const updateTreatmentDetail = (id, diagnosis_id, record) => {
    console.log({ id, diagnosis_id, record });
    setrecordDetails(record);
    openModal()
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
      render: (text, record) => moment(text.createdAt).format(),
    },
    {
      title: "Delete",
      render: (text, record) => (
        <button
          className='delete-btn'
          onClick={() => deleteTreatmentDetail(text._id, record.history._id, record)}
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
          onClick={() => updateTreatmentDetail(text._id, record.history._id, record)}
        >
          Update
        </button>
      ),
    },
  ];

  const closeModal = () => {
    setshowModal(false);
  };

  const openModal = () => {
    setshowModal(true);
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
      >

      {  /*  Textfield treatment, diagnosis (default value record) */}


      </Modal>
    );
  };

  const handlePatientName = (patientNameFilter) => {
    if (patientNameFilter && !isEmpty(patientNameFilter)) {
      if (patientNameFilter.patientName) {
        return patientNameFilter.patientName;
      }
    }
    return null;
  };

  const handleSearch = () => {
    let data = {
      _id: userReducer.user._id,
      diagnosis: diagnosisFilter !== "" ? diagnosisFilter : null,
      patientName: handlePatientName(patientNameFilter),
      startDate: dateFilter ? dateFilter[0].format("MM/DD/YYYY") : null,
      endDate: dateFilter ? dateFilter[1].format("MM/DD/YYYY") : null,
    };
    dispatch(fetchPatientAction(data, count - 1));
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

  useEffect(() => {
    let data = {
      _id: userReducer.user._id,
      diagnosis: diagnosisFilter !== "" ? diagnosisFilter : null,
      patientName: handlePatientName(patientNameFilter),
      startDate: dateFilter ? dateFilter[0].format("MM/DD/YYYY") : null,
      endDate: dateFilter ? dateFilter[1].format("MM/DD/YYYY") : null,
    };
    dispatch(fetchPatientAction(data, count - 1));
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
              <Autocomplete
                value={patientNameFilter}
                options={patientNames}
                // placeholder='Patient Names'
                variant='filled'
                onChange={(e, v) => setpatientNameFilter(v)}
                getOptionLabel={(option) => option.patientName}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Patient Name'
                    variant='filled'
                  />
                )}
              />{" "}
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
              <button onClick={handleSearch} className='search-btn'>
                Search
              </button>
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

      {patientModal()}
    </>
  );
};

export default withAuth(treatmentHistory);
