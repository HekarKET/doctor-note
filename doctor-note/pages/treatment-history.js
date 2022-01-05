import { Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchPatientAction } from "../redux/actions/patientAction";

export default function treatmentHistory() {
  const patientReducer = useSelector((state) => state.patientReducer);
  const userReducer = useSelector((state) => state.userReducer);
  const [patients, setpatients] = useState([]);
  const [total, settotal] = useState(0);
  const [count, setcount] = useState(0);
  const pageSize = 10;
  const dispatch = useDispatch();

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
  ];

  useEffect(() => {
    dispatch(fetchPatientAction({ _id: userReducer.user._id }, count));
  }, [count]);

  useEffect(() => {
    setpatients(patientReducer.patients);
    settotal(patientReducer.total);
  }, [patientReducer.patients.length]);

  return (
    <>
      <div className='container'>
        <div className='dashboard-container'>
          <div className='content'>

  

            <Table
              pagination={{
                defaultCurrent: 0,
                onChange: (page) => setcount(page),
                pageSize: pageSize,
                total: total,
                showSizeChanger: false,
              }}
              // onRow={(r, i) => ({
              //   onClick: (e) => {
              //     if (
              //       e.target.id !== "btn-delete" &&
              //       e.target.id !== "btn-reject" &&
              //       e.target.id !== "btn-edit" &&
              //       e.target.id !== "btn-accept"
              //     ) {
              //       // console.log({ e : e.target.id});
              //       showModal();
              //       setmodalInfo(r);
              //     }
              //   },
              // })}
              style={{fontSize: 20}}
              bordered
              columns={columns}
              dataSource={patients.map((item) => {
                item.key = item._id;
                return item;
              })}
            />
          </div>
        </div>
      </div>
    </>
  );
}
