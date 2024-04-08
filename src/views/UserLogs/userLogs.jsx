import React from "react";
import { Form } from "react-bootstrap";
import { GoDownload } from "react-icons/go";
const UserLogs = () => {
    return (
        <>
        <section className='main-wrapper dashboard-wrapper'>
            <div className="px-3 pt-3">
                <div className="filter-section d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2 flex-wrap">
                        <div className="d-inline-block">
                            <label>
                                Filter By Date
                            </label>
                            <Form.Control type="date" className="shadow-none" />
                        </div>
                        <div className="d-inline-block">
                            <label>
                                Filter By User
                            </label>
                            <Form.Select className="shadow-none">
                                <option value="lorem-ipsum">Lorem Ipsum</option>
                                <option value="lorem-ipsum">Lorem Ipsum</option>
                                <option value="lorem-ipsum">Lorem Ipsum</option>
                                <option value="lorem-ipsum">Lorem Ipsum</option>
                                <option value="lorem-ipsum">Lorem Ipsum</option>
                            </Form.Select>
                        </div>
                        <div className="d-inline-block">
                            <label>
                                Filter By Type
                            </label>
                            <Form.Select className="shadow-none">
                                <option value="property_create">Property Create</option>
                                <option value="property_assign">Property Assign</option>
                                <option value="dimension_create">Dimension Create</option>
                                <option value="hierarchy_add">Hierarchy Add</option>
                                <option value="hierarchy_update">Hierarchy Update</option>
                            </Form.Select>
                        </div>
                    </div>
                    <div>
                        <button className="common-btn min-w-1 d-flex align-items-center justify-content-center gap-2 shadow-none"><GoDownload/> Download Logs</button>
                    </div>
                </div>
                <div className='table-responsive activity-table-responsive user-log-responsive'>
                    <table className='table activity-table-user user-logs-table'>
                        <thead>
                            <tr>
                                <th className='activity-tablehead'>User</th>
                                <th className='activity-tablehead'>Recent Activity</th>
                                <th className='activity-tablehead'>Activity Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text create-text'>Create new dimension named “Test  1”</span></td>
                                <td><span className='dash-activity-text inner-activity-text create-text'>1 minute ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text update-text'>Updated Property 1</span></td>
                                <td><span className='dash-activity-text inner-activity-text update-text'>5 minutes ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text delete-text'>Deleted Account Node from Test 2 Dimension</span></td>
                                <td><span className='dash-activity-text inner-activity-text delete-text'>10 minutes ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text create-text'>Created new node in Test 3 Dimension</span></td>
                                <td><span className='dash-activity-text inner-activity-text create-text'>1 hour ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text update-text'>Assigned Property 3 to Test 3 & Test 4 Dimensions</span></td>
                                <td><span className='dash-activity-text inner-activity-text update-text'>1 hour ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 4”</span></td>
                                <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                                <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                                <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                                <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                                <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                                <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                                <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                                <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                                <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                                <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                                <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        </>
    )
}
export default UserLogs;