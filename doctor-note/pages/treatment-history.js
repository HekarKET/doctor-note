import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Table, Modal, DatePicker, Row, Col, Spin } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deletPatientDetailsAction,
  fetchPatientAction,
  fetchPatientNamesAction,
  updatePatientAction,
  updateTreatmentAction,
} from "../redux/actions/patientAction";
import withAuth from "../util/auth";
import { openNotification } from "../util/notification";
import { isEmpty } from "../util/util";

const TreatmentHistory = () => {
  const patientReducer = useSelector((state) => state.patientReducer);
  const userReducer = useSelector((state) => state.userReducer);
  const [patients, setpatients] = useState([]);
  const [patientNames, setpatientNames] = useState([]);
  const [total, settotal] = useState(0);
  const [count, setcount] = useState(1);
  const [recordDetails, setrecordDetails] = useState({
    _id: "61d021b832257bd886b7c445",
    patientName: "akhilesh ketkars",
    history: {
      diagnosis: "fever cw",
      treatmentDetails: {
        doctor: "61d3f6f37b167d3838939468",
        treatment: "tablet 232ww1",
      },
      _id: "61d5b637792ced989b6a0eb2",
      updatedAt: "2022-01-08T08:50:19.193Z",
      createdAt: "2022-01-08T08:50:19.193Z",
    },
    createdAt: "2022-01-01T09:41:12.414Z",
    updatedAt: "2022-01-08T08:50:19.193Z",
    __v: 0,
    address: "panvel",
  });
  const [patientNameFilter, setpatientNameFilter] = useState({});
  const [diagnosisFilter, setdiagnosisFilter] = useState("");
  const [dateFilter, setdateFilter] = useState();
  const [showModal, setshowModal] = useState(false);
  const [updateUser, setupdateUser] = useState(false);
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
    // console.log({ id, diagnosis_id, record });
    setrecordDetails(record);
    openModal();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "patientName",
      render: (text, record) => `${text} #${record._id}`,
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
      title: "Age-Range",
      dataIndex: "ageRange",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Date",
      dataIndex: "history",
      render: (text, record) => moment(text.createdAt).format("DD MMMM YYYY"),
    },
    {
      title: "Delete",
      render: (text, record) => (
        <>
          {patientReducer.action === "DELETE_PATIENT_TREATMENT" &&
          patientReducer.loading ? (
            <button
              id='delete-btn'
              className='delete-btn'
        
            >
              <Spin/>
            </button>
          ) : (
            <button
              id='delete-btn'
              className='delete-btn'
              onClick={() =>
                deleteTreatmentDetail(text._id, record.history._id, record)
              }
            >
              Delete
            </button>
          )}
        </>
      ),
    },
    {
      title: "Update",
      render: (text, record) => (
        <button
          id='update-btn'
          className='update-btn'
          onClick={() =>
            updateTreatmentDetail(text._id, record.history._id, record)
          }
        >
          Update
        </button>
      ),
    },
  ];

  const closeModal = () => {
    if (updateUser) {
      setupdateUser(false);
    }
    setshowModal(false);
  };

  const openModal = () => {
    setshowModal(true);
  };

  const patientModal = () => {
    const checkIncomplete = (variable) => {
      return variable === "";
    };

    const handleRecordDiagnosisChange = (value) => {
      let newDetails = { ...recordDetails };
      newDetails.history.diagnosis = value;
      setrecordDetails({ ...newDetails });
    };

    const handleRecordTreatmentChange = (value) => {
      let newDetails = { ...recordDetails };
      newDetails.history.treatmentDetails.treatment = value;
      setrecordDetails({ ...newDetails });
    };

    const handleRecordPatientNameChange = (value) => {
      let newDetails = { ...recordDetails };
      newDetails.patientName = value;
      setrecordDetails({ ...newDetails });
    };

    const handleRecordAgeRangeChange = (value) => {
      let newDetails = { ...recordDetails };
      newDetails.ageRange = value;
      setrecordDetails({ ...newDetails });
    };

    const handleRecordAddressChange = (value) => {
      let newDetails = { ...recordDetails };
      newDetails.address = value;
      setrecordDetails({ ...newDetails });
    };

    const handleUpdate = () => {
      if (updateUser) {
        //disaptch action to update patient
        dispatch(updatePatientAction(recordDetails));
      } else {
        dispatch(updateTreatmentAction(recordDetails));
      }
    };

    return (
      <Modal
        title={"Patient diagnosis"}
        visible={showModal}
        onOk={() => {
          handleUpdate();
          closeModal();
        }}
        confirmLoading={patientReducer.loading}
        onCancel={closeModal}
        width={1500}
      >
        {updateUser ? (
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <TextField
                variant='outlined'
                label='Patient Name *'
                placeholder='Patient Name *'
                error={checkIncomplete(recordDetails.patientName)}
                helperText={
                  checkIncomplete(recordDetails.patientName)
                    ? "Patient Name is Mandatory"
                    : null
                }
                color='primary'
                fullWidth
                value={recordDetails.patientName}
                onChange={(e) => handleRecordPatientNameChange(e.target.value)}
              />
            </Col>

            <Col span={24}>
              <TextField
                variant='outlined'
                placeholder='Address'
                label='Address'
                color='primary'
                value={recordDetails.address}
                onChange={(e) => handleRecordAddressChange(e.target.value)}
                fullWidth
              />
            </Col>

            <Col span={24}>
              <TextField
                variant='outlined'
                placeholder='Age Range'
                label='Age Range'
                color='primary'
                value={recordDetails.ageRange}
                onChange={(e) => handleRecordAgeRangeChange(e.target.value)}
                fullWidth
              />
            </Col>
          </Row>
        ) : (
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <TextField
                variant='outlined'
                color='primary'
                placeholder='Diagnosis'
                name='Diagnosis'
                label='Diagnosis'
                value={recordDetails.history.diagnosis}
                onChange={(e) => handleRecordDiagnosisChange(e.target.value)}
                fullWidth
              />
            </Col>

            <Col span={24}>
              <TextField
                variant='outlined'
                color='primary'
                placeholder='Treatment'
                name='Treatment'
                label='Treatment'
                value={recordDetails.history.treatmentDetails.treatment}
                onChange={(e) => handleRecordTreatmentChange(e.target.value)}
                fullWidth
              />
            </Col>
          </Row>
        )}
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

  useEffect(() => {
    if (patientReducer.action === "UPDATE_PATIENT_TREATMENT") {
      if (!patientReducer.loading) {
        if (patientReducer.sucess) {
          openNotification("success", "Treatment updated");
        } else {
          openNotification("error", "Sorry! Something went wrong.");
          // console.log(patientReducer);
        }
      }
    }

    if (patientReducer.action === "UPDATE_PATIENT") {
      if (!patientReducer.loading) {
        if (patientReducer.sucess) {
          openNotification("success", "Patient updated");
        } else {
          openNotification("error", "Sorry! Something went wrong.");
          // console.log(patientReducer);
        }
      }
    }

    if (patientReducer.action === "DELETE_PATIENT_TREATMENT") {
      if (!patientReducer.loading) {
        if (patientReducer.sucess) {
          openNotification("success", "Treatment Deleted");
        } else {
          openNotification("error", "Sorry! Something went wrong.");
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
              onRow={(r, i) => ({
                onClick: (e) => {
                  // console.log(e);
                  if (
                    e.target.id !== "update-btn" &&
                    e.target.id !== "delete-btn"
                  ) {
                    openModal();
                    setupdateUser(true);
                    setrecordDetails(r);
                  }
                },
              })}
              loading={patientReducer.loading}
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
