import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import logoimg from '../assets/img/logo-wide.png';
import dashboard from '../assets/img/round-dashboard.png';
import allUserIcon from '../assets/img/users-fill.png';
import logoSmall from '../assets/img/logo-small.svg';

const Sidebar = ({ sidebarActive }) => {
    const location=useLocation();
    const params = useParams();

    const logoutBtn = () => {
        localStorage.clear();
        window.location.href="/"
    };

    console.log(location.pathname,'-------------------------')
    return (
        <>
            <div className={sidebarActive ? "sidebar sideactive" : 'sidebar'}>
                <div className="inner-sidebar h-100 d-flex justify-content-between flex-column">
                    <div>
                        <div className="text-center mb-xxl-5 pb-4">
                            <img src={logoimg} className="sidebar-logo" />
                            <img src={logoSmall} className="sidebar-logo-small" />
                        </div>
                        <ul className="sidebar-listing ps-0">
                            <li className="sidebar-ite">
                                <Link to="/dimensions" className={`sidebar-link ${location.pathname=="/dimensions" ?"active":""}`}><FontAwesomeIcon icon={faCodeFork} className="dimension-icon" /> <span>Dimensions</span></Link>
                            </li>
                            <li className="sidebar-ite">
                                <Link to="/properties" className={`sidebar-link ${location.pathname=="/properties" ?"active":""}`}><FontAwesomeIcon icon={faShareNodes} /> <span>Properties</span></Link>
                            </li>
                            <li className="sidebar-ite">
                                <Link to="/integrations" className={`sidebar-link ${location.pathname=="/integrations" ?"active":""}`}><FontAwesomeIcon icon={faForward} className="dimension-icon" /> <span>Integrations</span></Link>
                            </li>
                            <li className="sidebar-ite">
                                <Link to="/dashboard" className={`sidebar-link ${location.pathname=="/dashboard" ?"active":""}`}> <img src={dashboard} alt="" className="dashboard-icon" /><span>Dashboard</span></Link>
                            </li>
                            <li className="sidebar-ite">
                                <Link to="/all-users" className={`sidebar-link ${location.pathname=="/all-users" || `/user-details/${params.userId}` ?"active":""}`}> <img src={allUserIcon} alt="" className="dashboard-icon" /> <span>All Users</span></Link>
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