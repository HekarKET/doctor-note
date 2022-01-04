import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../redux/actions/userActions";
import withAuth from "../util/auth";
import {notification} from "../util/notification";
import { stateDistrictData } from "../util/rawData";
import SelectCustom from "../util/Select";

const profile = () => {
  const userReducer = useSelector((state) => state.userReducer);
  const [userName, setuserName] = useState("");
  const [name, setname] = useState("");
  const [state, setstate] = useState("Maharashtra");
  const [district, setdistrict] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  // const [password, setpassword] = useState("");
  const [incomplete, setincomplete] = useState(false);
  const dispatch = useDispatch();
  const data = stateDistrictData;
  const [stateList, setstateList] = useState([]);
  const [districtList, setdistrictList] = useState([]);

  const handleUpdate = () => {
    if (
      name === "" ||
      district === "" ||
      state === "" ||
      address === "" ||
      userName === ""
      // password === ""
    ) {
      setincomplete(true);
    } else {
      let data = {
        _id: userReducer.user._id,
        name,
        userName,
        state,
        district,
        address,
        email,
      };

      dispatch(updateUserAction(data));
    }
  };

  const checkIncomplete = (variable) => {
    return variable === "" && incomplete;
  };

  const setBasicDetails = () => {
    setname(userReducer.user.name);
    setuserName(userReducer.user.userName);
    setemail(userReducer.user.email);
    setstate(userReducer.user.state);
    setdistrict(userReducer.user.district);
    setaddress(userReducer.user.address);
    // setpassword(userReducer.user.password);
  };

  useEffect(() => {
    let list = data.map((item) => item.state);
    setstateList(list);
    setBasicDetails();
  }, []);

  useEffect(() => {
    if (userReducer.success) {
      notification('sc',"Profile updated");
    }
  }, [userReducer.success]);

  useEffect(() => {
    let list = data.filter((item) => item.state === state)[0];
    // console.log({ list, state });
    setdistrictList(list.districts);
  }, [state]);

  return (
    <>
      <div className='container'>
        <div className='profile-container'>
          <div className='content'>
            <TextField
              variant='filled'
              color='primary'
              placeholder='Name'
              error={checkIncomplete(name)}
              helperText={checkIncomplete(name) ? "Please enter Name" : ""}
              value={name}
              onChange={(e) => setname(e.target.value)}
              fullWidth
            />

            <TextField
              variant='filled'
              color='primary'
              placeholder='Username'
              error={checkIncomplete(userName)}
              helperText={
                checkIncomplete(userName) ? "Please enter username" : ""
              }
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              fullWidth
            />

            <TextField
              variant='filled'
              color='primary'
              type={"email"}
              placeholder='Email'
              error={checkIncomplete(email)}
              helperText={checkIncomplete(email) ? "Please enter Email" : ""}
              value={email}
              onChange={(e) => setemail(e.target.value)}
              fullWidth
            />

            <TextField
              variant='filled'
              color='primary'
              placeholder='Address'
              error={checkIncomplete(address)}
              helperText={
                checkIncomplete(address) ? "Please enter Address" : ""
              }
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              fullWidth
            />

            <SelectCustom
              menuitem={stateList}
              variable={state}
              setVariable={setstate}
              placeholder={"State"}
              error={checkIncomplete(state)}
              variant={"filled"}
            />

            <SelectCustom
              menuitem={districtList}
              variable={district}
              setVariable={setdistrict}
              placeholder={"District"}
              error={checkIncomplete(district)}
              variant={"filled"}
            />

            {/* <TextField
                variant='filled'
                color='primary'
                type={"password"}
                error={checkIncomplete(password)}
                helperText={
                  checkIncomplete(password) ? "Please enter password" : ""
                }
                placeholder='Password'
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                fullWidth
              /> */}
            <button
              size='large'
              color='primary'
              variant='contained'
              fullWidth
              onClick={handleUpdate}
            >
              UPDATE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(profile);
