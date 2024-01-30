import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import userimg from '../assets/img/user-img.jpg';
const Navbar = ({ collapseSidebar, navbarActive }) => {
    return(
        <>
            <div className={navbarActive ? "nav-header d-flex justify-content-between align-items-center navactive" : "nav-header d-flex justify-content-between align-items-center"}>
                <div>
                    <button onClick={collapseSidebar} className="menu-btn"><FontAwesomeIcon icon={faBars} /></button>
                </div>
                <div className="d-flex gap-4 align-items-center">
                    <img src={userimg} className="userbx-img"/>
                    <span className="user-name">Lorem</span>
                </div>
            </div>
        </>
    )
}
export default Navbar;