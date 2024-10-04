import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

const CodeLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col ">
      <Header />
      <Outlet />
    </div>
  );
};

export default CodeLayout;
