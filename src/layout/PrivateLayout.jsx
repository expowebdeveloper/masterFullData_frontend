import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";
import { getToken } from "../utils/common";

const PrivateLayout = () => {
  let isToken = getToken();
  return (
    <>
      {isToken ? (
        <>
          <Navbar />
          <Sidebar />
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateLayout;
