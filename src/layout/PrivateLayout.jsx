import React, {useEffect, useState} from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";
import { getToken } from "../utils/common";

const PrivateLayout = () => {
  let isToken = getToken();
const [isSidebarActive, setIsSidebarActive] = useState(false);
const [isNavbarActive, setIsNavbarActive] = useState(false);
const location =useLocation()
console.log(location.pathname,"location")

useEffect(()=>{
  setIsNavbarActive(location.pathname=="/single-dimension"?true:false)
  setIsSidebarActive(location.pathname=="/single-dimension"?true:false)
},[])

  const handleButtonClick = () => {
    setIsNavbarActive(!isNavbarActive);
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <>
      {isToken ? (
        <>
          <Navbar navbarActive={isNavbarActive} collapseSidebar={handleButtonClick} />
          <Sidebar sidebarActive={isSidebarActive} />
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateLayout;
