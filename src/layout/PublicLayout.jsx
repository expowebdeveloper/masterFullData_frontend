import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from '../utils/common';

const PublicLayout = () => {
const  isToken=getToken()
console.log(isToken,"isi")
  return (
    <div>{!isToken? <Outlet/>:<Navigate to="/"/>}</div>
  )
}

export default PublicLayout