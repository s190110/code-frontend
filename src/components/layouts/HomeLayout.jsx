import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

const HomeLayout = () => {
  return (
    <div className="">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;

// bg-gradient-to-r from-yellow-100 to-red-300 via-orange-100
