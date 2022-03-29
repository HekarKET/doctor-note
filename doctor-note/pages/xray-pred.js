import React, { useEffect, useState } from "react";
import { Button, message, Upload } from "antd";
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
 const [resultPneumonia, setresultPneumonia] = useState(null);

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
  try {
   fmData.append("image", file);
   const data = await uploadImagepneumonia(fmData);
   setresultPneumonia(data.data[0]);
   onSuccess("Ok");
  } catch (error) {
   onError(error);
  }
 };

 return (
  <div className="container">
   <div className=" dashboard-container ">
    <div className="content xraypred">
     <h1>Upload X-Ray Image</h1>
     <div className="upload-container">
      <h2>Upload Xray image to detect pneumonia</h2>
      
      <Upload
       style={{ width: "100%" }}
       listType={"picture"}
       name="file"
       onChange={handleOnChange}
       customRequest={uploadImage}
       beforeUpload = {file => {
         console.log(file.type)
        const isPNG = file.type === 'image/jpeg';
        if (!isPNG) {
          message.error(`${file.name} is not a jpeg file`);
        }
        return isPNG || Upload.LIST_IGNORE;}
      }
      >
       <Button
        // icon={!file ? <UploadOutlined /> : null}
        style={!file ? beforeUploadStyle : afterUploadStyle}
       >
        UPLOAD
       </Button>
       
        {resultPneumonia === null
         ? null
         : resultPneumonia === 1
         ? <h2 style={{color: " #4b9667"}}>Normal</h2>
         : <h2 style={{color: "red"}}>Pneumonia detected</h2>}
       
      </Upload>
     </div>
    </div>
   </div>
  </div>
 );
}
