import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogs } from "../../store/slices/userAuditLogsSlice";
import SmallSpinner from "../../components/common/atomic/SmallSpinner";
import { GoDownload } from "react-icons/go";





const UserLogs = () => {

    const { UserLogsList, loading } = useSelector((state) => state.userLogsData);
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getUserLogs())
    },[])


    function getTimeDifference(DateTime) {
        const serverDateTime = new Date(DateTime);
        const now = new Date();
        const differenceInSeconds = (now - serverDateTime) / 1000;
        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

        const thresholds = [
            { limit: 60, div: 1, unit: 'second' },
            { limit: 3600, div: 60, unit: 'minute' },
            { limit: 86400, div: 3600, unit: 'hour' },
            { limit: 2592000, div: 86400, unit: 'day' },
            { limit: 31536000, div: 2592000, unit: 'month' },
            { div: 31536000, unit: 'year' },
        ];

        for (const t of thresholds) {
            if (!t.limit || Math.abs(differenceInSeconds) < t.limit) {
                console.log(rtf.format(Math.round(differenceInSeconds / t.div), t.unit))
                let formattedTime = rtf.format(Math.round(differenceInSeconds / t.div), t.unit) + " ago";
                formattedTime = formattedTime.replace(/^in\s+/, "");
                return formattedTime
            }
        }
    }

    const activityString = (item) =>{
        if(item.action === "create_dimension"){
            return `Create new dimension named “${item.data?.name}”`
        }else if(item.action === "delete_dimension"){
            return `Deleted “${item.data?.dimension_name}” Dimension`
        }
        else if(item.action === "assign_dimensions"){
            return `Assign “${item.data?.property_name}” Prpperty with “${item.data?.dimension}” dimension`
        }
        else if(item.action === "delete_node"){
            return `Deleted “${item.data?.name}” Node from Test “${item.data?.dimension}”`
        }
    }


    return (
        <>
        <section className='main-wrapper dashboard-wrapper'>
            <div className="px-3 pt-3">
                <div className="filter-section d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2 flex-wrap">
                        <div className="d-inline-block">
                            <label className="font-14">
                                Filter By Date
                            </label>
                            <Form.Control type="date" />
                        </div>
                        <div className="d-inline-block">
                            <label className="font-14">
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
                            <label className="font-14">
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
                    <div>
                        <button className="common-btn min-w-1 d-flex align-items-center justify-content-center gap-2 shadow-none"><GoDownload/> Download Logs</button>
                    </div>
                </div>
                <div className='table-responsive activity-table-responsive user-log-responsive'>
                {loading ? (
                    <div className="text-center py-3"><SmallSpinner /></div>
                ) : (
                    <table className='table activity-table-user user-logs-table'>
                        <thead>
                            <tr>
                                <th className='activity-tablehead'>User</th>
                                <th className='activity-tablehead'>Recent Activity</th>
                                <th className='activity-tablehead'>Activity Time</th>
                            </tr>
                        </thead>
                        
                        <tbody>

                        {UserLogsList.map((item, index) => (
                             <tr key={index}>
                                <td><span className="user-name-text">{item.user_email}</span></td>
                                <td className="px-0"><span className={`dash-activity-text inner-activity-text ${item.request_type === "POST" ? "create-text" : item.request_type === "PUT"  ? "update-text" : item.request_type === "DELETE" ? "delete-text" : ""}`}>{activityString(item)}</span>
                                    </td>
                                <td><span className='dash-activity-text inner-activity-text create-text'>{getTimeDifference(item.date)}</span></td>
                            </tr>
                        ))}

                            {/* <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text update-text'>Updated Property 1</span></td>
                                <td><span className='dash-activity-text inner-activity-text update-text'>5 minutes ago</span></td>
                            </tr>
                            <tr>
                                <td><span className="user-name-text">Lorem Ipsum</span></td>
                                <td className="px-0"><span className='dash-activity-text inner-activity-text delete-text'>Deleted Account Node from Test 2 Dimension</span></td>
                                <td><span className='dash-activity-text inner-activity-text delete-text'>10 minutes ago</span></td>
                            </tr> */}
                        </tbody>
                    </table>
                )}
                </div>
            </div>
        </section>
        </>
    )
}
export default UserLogs;