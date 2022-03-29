import React, { useEffect, useState } from "react";
import { Button, Upload } from "antd";
import { uploadImagepneumonia } from "../util/api";

const beforeUploadStyle = {
  fontSize: "16px",
  fontWeight: "normal",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: 2.25,
  letterSpacing: "normal",
  color: "#1a75e8",
  width: "100%",
  height: "56px",
  borderRadius: "4px",
  backgroundColor: "#e1ecff",
  textAlign: "center",
};

const afterUploadStyle = {
  fontSize: "16px",
  fontWeight: "normal",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: 2.25,
  letterSpacing: "normal",
  color: " #4b9667",
  width: "100%",
  height: "56px",
  borderRadius: "4px",
  backgroundColor: "#e1fff1",
  textAlign: "left",
};

export default function testXray() {
  const [file, setfile] = useState(null);

  useEffect(() => {}, []);

  const handleOnChange = ({ file, fileList, event }) => {
    console.log(file, fileList, event);
    //Using Hooks to update the state to the current filelist
    setfile(fileList);
    //filelist - [{uid: "-1",url:'Some url to image'}]
  };

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log((event.loaded / event.total) * 100);
        onProgress({ percent: (event.loaded / event.total) * 100 }, file);
      },
    };
    fmData.append("image", file);
    const data = await uploadImagepneumonia(fmData);
    console.log(data);
  };

  return (
    <div className='container'>
      <Upload
        style={{ width: "100%" }}
        listType={"picture"}
        name='file'
        onChange={handleOnChange}
        customRequest={uploadImage}
        // showUploadList={showImage}
        // action='http://localhost:3005/pred/pneumonia'
      >
        <Button
          // icon={!file ? <UploadOutlined /> : null}
          style={!file ? beforeUploadStyle : afterUploadStyle}
        >
          UPLOAD
        </Button>
      </Upload>
    </div>
  );
}
