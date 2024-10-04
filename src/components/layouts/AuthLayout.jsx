import React, { useContext, useEffect } from "react";
import Header from "../Header";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User";
import Footer from "../Footer";

const AuthLayout = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);
  if (!user) return null;
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
