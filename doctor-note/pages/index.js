// import Head from 'next/head'
import Image from "next/image";
import styles from "../styles/Home.module.css";

//This page will be default login page
export default function Home() {
  return (
    <>
      <div className='container'>
        <div className={styles.background}>
          <div className={styles.login_container}>
            <div className={styles.left_content}>
              {/* <Image src='/login-banner.jpg' height={"80vh"} width={"80vw"} layout='responsive' /> */}
            </div>
            <div className={styles.right_content}></div>
          </div>
        </div>
      </div>
    </>
  );
}
