import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const userReducer = useSelector((state) => state.userReducer);
  const [user, setuser] = useState({});
  const [currentRoute, setcurrentRoute] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      window.location.href = "/";
    }
  };
  

  useEffect(() => {
    setcurrentRoute(router.pathname.replace("/", ""));
  }, [router.pathname]);

  useEffect(() => {
    setuser(userReducer.user);
  }, [userReducer.user]);

  return (
    <>
      <nav>
        <div className='logo-website'>Doctor note</div>
        <hr />
        <div className='profile'>
          <div className='profile-logo'>{user.name && user.name[0]}</div>
          <div className='details'>
            <div className='username'>{user.userName} ,</div>
            <div className='state'>{user.state}</div>
            {/* <div className='email'>{user.email}</div> */}
          </div>
        </div>
        <hr />
        <ul>
        <Link href={'treatment-history'}>

          <li
            // onClick={()=>navTo("treatment-history")}
            className={
              currentRoute === "treatment-history"
                ? "nav-item active"
                : "nav-item"
            }
          >
            Treatment History
          </li>
          </Link>

          {/* <li className={currentRoute === 'add-treatmen' ? 'nav-item active' : 'nav-item'}>Add Treatment</li> */}
          <Link href={'profile'}>
          <li
          // onClick={()=>navTo("profile")}
            className={
              currentRoute === "profile" ? "nav-item active" : "nav-item"
            }
          >
            
            Profile
          </li>
          </Link>

          <li
            onClick={handleLogout}
            className={
              currentRoute === "logout" ? "nav-item active" : "nav-item"
            }
          >
            Logout
          </li>
        </ul>
      </nav>
    </>
  );
}
