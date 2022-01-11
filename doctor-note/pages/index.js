// import Head from 'next/head'
import { TextField } from "@material-ui/core";
import { Spin } from "antd";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../redux/actions/userActions";
import styles from "../styles/Home.module.css";
import { isAuth, isEmpty } from "../util/util";

//This page will be default login page
export default function Home() {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const userReducer = useSelector((state) => state.userReducer);
  const [incomplete, setincomplete] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (userName === "" || password === "") {
      setincomplete(true);
    } else {
      const data = { userName, password };
      dispatch(loginUserAction(data));
      setuserName("");
      setpassword("");
    }
  };

  const checkIncomplete = (variable) => {
    return variable === "" && incomplete;
  };

  const redirectRegister = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/register";
    }
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

  return (
    <>
      <div className='container'>
        <div className={styles.background}>
          <div className={styles.login_container}>
            <div className={styles.left_content}>
              <img src='/login-banner.jpg' alt='login-banner' />
            </div>
            <div className={styles.right_content}>
              <div className={styles.login_content}>
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
                  type={'password'}
                  error={checkIncomplete(password)}
                  helperText={
                    checkIncomplete(password) ? "Please enter password" : ""
                  }
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  fullWidth
                />
                {userReducer.action === "LOGIN_USER" && userReducer.loading ? (
                  <button>
                    <Spin />
                  </button>
                ) : (
                  <button onClick={handleLogin}>LOGIN</button>
                )}
              </div>

              <span
                className={styles.dont_have_accont}
                onClick={redirectRegister}
              >
                {"Don't have account? Sign up here"}
              </span>
              <span className={styles.error}>
                {userReducer.error && "Incorrect Password or Username"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
