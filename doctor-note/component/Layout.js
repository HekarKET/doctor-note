import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const [valid, setvalid] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router.pathname === "/" || router.pathname === "/register") {
      setvalid(false);
    } else {
      setvalid(true);
    }
  }, [router.pathname]);

  return (
    <>
      <Header />
      {valid && <Navbar />}
      {children}
    </>
  );
}
