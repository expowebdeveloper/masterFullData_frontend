import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork, faHouse } from "@fortawesome/free-solid-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import logoimg from '../assets/img/logo-wide.png';
import dashboard from '../assets/img/round-dashboard.png';
import allUserIcon from '../assets/img/users-fill.png';
import logoSmall from '../assets/img/logo-small.svg';
import { MdDashboard } from "react-icons/md";
import { PiUsersFill } from "react-icons/pi";
import { FaClipboardList } from "react-icons/fa";

const Sidebar = ({ sidebarActive }) => {
    const location=useLocation();
    const params = useParams();

    const logoutBtn = () => {
        localStorage.clear();
        window.location.href="/"
    };

    return (
        <>
            <div className={sidebarActive ? "sidebar sideactive" : 'sidebar'}>
                <div className="inner-sidebar h-100 d-flex justify-content-between flex-column">
                    <div>
                        <div className="text-center bottom-space">
                            <Link to="/"> <img src={logoimg} className="sidebar-logo" /></Link>
                           <Link to="/"><img src={logoSmall} className="sidebar-logo-small" /></Link>  
                        </div>
                        <ul className="sidebar-listing ps-0">
                            <li className="sidebar-ite">
                                <Link to="/" className={`sidebar-link ${location.pathname=="/" ?"active":""}`}><FontAwesomeIcon icon={faHouse} /> <span>Home</span></Link>
                            </li>
                            <li className="sidebar-ite">
                                <Link to="/dimensions" className={`sidebar-link ${location.pathname=="/dimensions" || location.pathname=="/single-dimension" ? "active":""}`}><FontAwesomeIcon icon={faCodeFork} className="dimension-icon" /> <span>Dimension</span></Link>
                            </li>
                            <li className="sidebar-ite">
                                <Link to="/properties" className={`sidebar-link ${location.pathname=="/properties" ?"active":""}`}><FontAwesomeIcon icon={faShareNodes} /> <span>Properties</span></Link>
                            </li>
                            <li className="sidebar-ite">
                                <Link to="/integrations" className={`sidebar-link ${location.pathname=="/integrations" ?"active":""}`}><FontAwesomeIcon icon={faForward} className="dimension-icon" /> <span>Integrations</span></Link>
                            </li>
                            <li className="sidebar-ite">
                                <Link to="/dashboard" className={`sidebar-link ${location.pathname=="/dashboard" ?"active":""}`}> <MdDashboard className="mdDash"/><span>Dashboard</span></Link>
                            </li>
                            <li className="sidebar-ite">
                                <Link to="/all-users" className={`sidebar-link ${location.pathname=="/all-users" || location.pathname==`/user-details/${params.userId}` ?"active":""}`}> <PiUsersFill /> <span>All Users</span></Link>
                            </li>
                            <li className="sidebar-ite">
                                <Link to="/user-logs" className="sidebar-link"> <FaClipboardList /> <span>User Logs</span></Link>
                            </li>
                        </ul>
                    </div>
                    <Link onClick={logoutBtn} className="logout-btn">{sidebarActive?<FontAwesomeIcon icon={faRightFromBracket} />:<><FontAwesomeIcon icon={faRightFromBracket} /> <span>Logout</span></>}</Link>
                </div>
            </div>
        </>
    )
}
export default Sidebar;