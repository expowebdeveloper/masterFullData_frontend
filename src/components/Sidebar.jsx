import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import logoimg from '../assets/img/logo-wide.png';
const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <div className="inner-sidebar h-100 d-flex justify-content-between flex-column">
                    <div>
                        <div className="text-center mb-5 pb-4">
                            <img src={logoimg} className="sidebar-logo" />
                        </div>
                        <ul className="sidebar-listing ps-0">
                            <li className="sidebar-ite">
                                <Link to="/dimensions" className="sidebar-link"><FontAwesomeIcon icon={faCodeFork} className="dimension-icon" /> Dimensions</Link>
                            </li>
                            <li className="sidebar-ite">
                                <Link to={" "} className="sidebar-link"><FontAwesomeIcon icon={faShareNodes} /> Properties</Link>
                            </li>
                            <li className="sidebar-ite">
                                <Link to={" "} className="sidebar-link"><FontAwesomeIcon icon={faForward} className="dimension-icon" /> Integrations</Link>
                            </li>
                        </ul>
                    </div>
                    <Link to={" "} className="logout-btn"><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Link>
                </div>
            </div>
        </>
    )
}
export default Sidebar;