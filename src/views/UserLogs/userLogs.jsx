import React from "react";
import { Form } from "react-bootstrap";
const UserLogs = () => {
    return (
        <>
        <section className='main-wrapper dashboard-wrapper'>
            <div className="filter-section">
                <div className="d-inline-block">
                    <label>
                        Filter By Date
                    </label>
                    <Form.Control type="date" />
                </div>
                <div className="d-inline-block">
                    <label>
                        Filter By User
                    </label>
                    <Form.Select>
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
                    <Form.Select>
                        <option value="property_create">Property Create</option>
                        <option value="property_assign">Property Assign</option>
                        <option value="dimension_create">Dimension Create</option>
                        <option value="hierarchy_add">Hierarchy Add</option>
                        <option value="hierarchy_update">Hierarchy Update</option>
                    </Form.Select>
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
                            <td><span className='dash-activity-text inner-activity-text create-text'>Create new dimension named “Test  1”</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>1 minute ago</span></td>
                        </tr>
                        <tr>
                            <td><span className="user-name-text">Lorem Ipsum</span></td>
                            <td><span className='dash-activity-text inner-activity-text update-text'>Updated Property 1</span></td>
                            <td><span className='dash-activity-text inner-activity-text update-text'>5 minutes ago</span></td>
                        </tr>
                        <tr>
                            <td><span className="user-name-text">Lorem Ipsum</span></td>
                            <td><span className='dash-activity-text inner-activity-text delete-text'>Deleted Account Node from Test 2 Dimension</span></td>
                            <td><span className='dash-activity-text inner-activity-text delete-text'>10 minutes ago</span></td>
                        </tr>
                        <tr>
                            <td><span className="user-name-text">Lorem Ipsum</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>Created new node in Test 3 Dimension</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>1 hour ago</span></td>
                        </tr>
                        <tr>
                            <td><span className="user-name-text">Lorem Ipsum</span></td>
                            <td><span className='dash-activity-text inner-activity-text update-text'>Assigned Property 3 to Test 3 & Test 4 Dimensions</span></td>
                            <td><span className='dash-activity-text inner-activity-text update-text'>1 hour ago</span></td>
                        </tr>
                        <tr>
                            <td><span className="user-name-text">Lorem Ipsum</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 4”</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                        </tr>
                        <tr>
                            <td><span className="user-name-text">Lorem Ipsum</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                        </tr>
                        <tr>
                            <td><span className="user-name-text">Lorem Ipsum</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                        </tr>
                        <tr>
                            <td><span className="user-name-text">Lorem Ipsum</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                        </tr>
                        <tr>
                            <td><span className="user-name-text">Lorem Ipsum</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                        </tr>
                        <tr>
                            <td><span className="user-name-text">Lorem Ipsum</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                        </tr>
                        <tr>
                            <td><span className="user-name-text">Lorem Ipsum</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                        </tr>
                        <tr>
                            <td><span className="user-name-text">Lorem Ipsum</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                        </tr>
                        <tr>
                            <td><span className="user-name-text">Lorem Ipsum</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                        </tr>
                        <tr>
                            <td><span className="user-name-text">Lorem Ipsum</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                        </tr>
                        <tr>
                            <td><span className="user-name-text">Lorem Ipsum</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                            <td><span className='dash-activity-text inner-activity-text create-text'>2 hours ago</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        </>
    )
}
export default UserLogs;