import { useSelector } from "react-redux";
import Home from "../pages";
import Router from "next/router";
import { isAuth, isEmpty } from "./util";

const withAuth = (Component) => {
  const Auth = (props) => {
    const userReducer = useSelector((state) => state.userReducer);

    // If user is not logged in, return login component
    if (!isAuth()) {
      if (typeof window !== "undefined") {
        Router.push("/");
      }
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
