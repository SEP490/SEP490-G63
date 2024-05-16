import React from "react";
import Navbar from "~/layout/UserLayout/NavBar/Navbar";
import { Outlet, Link } from "react-router-dom";
import Footer from "~/layout/UserLayout/Footer";
// import OrderPopup from "../components/OrderPopup/OrderPopup";

const Layout = () => {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      {/* <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} /> */}
    </>
  );
};

export default Layout;
