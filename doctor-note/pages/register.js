// import Head from 'next/head'
import { TextField } from "@material-ui/core";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  loginUserAction,
  registerUserAction,
} from "../redux/actions/userActions";
import styles from "../styles/Home.module.css";
import { stateDistrictData } from "../util/rawData";
import SelectCustom from "../util/Select";

export default function register() {
  const [userName, setuserName] = useState("");
  const [name, setname] = useState("");
  const [state, setstate] = useState("Maharashtra");
  const [district, setdistrict] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const userReducer = useSelector((state) => state.userReducer);
  const [incomplete, setincomplete] = useState(false);
  const dispatch = useDispatch();
  const data = stateDistrictData;
  const [stateList, setstateList] = useState([]);
  const [districtList, setdistrictList] = useState([]);

  const handleLogin = () => {
    if (
      name === "" ||
      district === "" ||
      state === "" ||
      address === "" ||
      userName === "" ||
      password === ""
    ) {
      setincomplete(true);
    } else {
      const data = {
        name,
        userName,
        state,
        district,
        address,
        email,
        password,
      };
      dispatch(registerUserAction(data));
    }
  };

  const checkIncomplete = (variable) => {
    return variable === "" && incomplete;
  };

  useEffect(() => {
    if (userReducer.success) {
      if (typeof window !== "undefined") {
        Router.push("/profile");
      }
    }
  }, [userReducer.success]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isEmpty(userReducer.user)) {
        window.location.href = "/profile";
      }
    }
  }, []);

  useEffect(() => {
    let list = data.map((item) => item.state);
    setstateList(list);
  }, []);

  useEffect(() => {
    let list = data.filter((item) => item.state === state)[0];
    if(list){
      setdistrictList(list.districts);
    }
    
  }, [state]);

  return (
    <>
      <div className='container'>
        <div className={styles.background}>
          <div className={styles.login_container}>
            <div className={styles.left_content}>
              <img src='/login-banner.jpg' alt='login-banner' />
            </div>
            <div className={styles.right_content}>
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

              <TextField
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
              />
              <button
                size='large'
                color='primary'
                variant='contained'
                fullWidth
                onClick={handleLogin}
              >
                REGISTER
              </button>

              {/* <span>{userReducer.user.name}</span> */}
              <span className={styles.error}>
                {userReducer.error && userReducer.message}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
