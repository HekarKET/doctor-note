// import Head from 'next/head'
import { TextField } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../redux/actions/userActions";
import styles from "../styles/Home.module.css";

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
    }
  };

  const checkIncomplete = (variable) => {
    return variable === "" && incomplete;
  };

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
                LOGIN
              </button>

              <span>{userReducer.user.name}</span>
              <span>{userReducer.error && "Incorrect password"}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
