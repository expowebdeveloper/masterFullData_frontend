import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogs } from "../../store/slices/userAuditLogsSlice";
import SmallSpinner from "../../components/common/atomic/SmallSpinner";
import { GoDownload } from "react-icons/go";
import ReactPaginate from "react-paginate";
import previousIcon from '../../assets/img/previous.png'
import nextIcon from '../../assets/img/next.png'





const UserLogs = () => {

    const { UserLogsList, loading, totalLogs,  pageNumber} = useSelector((state) => state.userLogsData);
    const dispatch = useDispatch()



    const itemsPerPage = 50
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(totalLogs / itemsPerPage);


    useEffect(() => {
        dispatch(getUserLogs(currentPage, itemsPerPage))
    }, [])


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

    const activityString = (item) => {
        if (item.action === "create_dimension") {
            return `Create new dimension named “${item.data?.name}”`
        } else if (item.action === "delete_dimension") {
            return `Deleted “${item.data?.dimension_name}” Dimension`
        }
        else if (item.action === "assign_dimensions") {
            return `Assign “${item.data?.property_name}” Prpperty with “${item.data?.dimension}” dimension`
        }
        else if (item.action === "delete_node") {
            return `Deleted “${item.data?.name}” Node from Test “${item.data?.dimension}”`
        } else if (item.action === "assign_property_value") {
            return `Assign Property on “${item.data?.dimension}” dimension`
        } else if (item.action === "assign_all_properties_to_new_node") {
            return `Assign Properties on “${item.data?.child}” new created dimension`
        } else if (item.action === "add_node") {
            return `Create New “${item.data?.child}” node under “${item.data?.parent}” Parent`
        } else if (item.action === "define_property") {
            return `New “${item.data?.name}” property created on “${item.data?.dimensions[0]}” dimensions`
        } else if (item.action.includes("delete_property")) {
            const queryString = item.action.split('?')[1];
            const params = new URLSearchParams(queryString);
            const propertyName = params.get('property_name');
            const dimension = params.get('dimension');
            return `“${propertyName}” property deleted from “${dimension}” dimensions`
        }
    }


    const customPreviousLabel = (
        <div className='pagination-card d-flex justify-content-center align-items-center col-auto mx-1'>
            <img src={previousIcon} className='pagination-icon' alt="" />
        </div>
    );

    const customNextLabel = (
        <div className='pagination-card d-flex justify-content-center align-items-center col-auto mx-1'>
            <img src={nextIcon} className='pagination-icon' alt="" />
        </div>
    );

    const customPageLabel = (page) => (
        <div className={currentPage === page ? 'pagination-card  d-flex justify-content-center align-items-center col-auto mx-1' : 'pagination-card-inactive d-flex justify-content-center align-items-center col-auto mx-1'}>
            <h3 className='pagination-icon text-center'>{page}</h3>
        </div>
    );

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % totalLogs;
        dispatch(getUserLogs(event.selected + 1, itemsPerPage))
        setCurrentPage(event.selected + 1)
        setItemOffset(newOffset);
    };


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
                            <button className="common-btn min-w-1 d-flex align-items-center justify-content-center gap-2 shadow-none"><GoDownload /> Download Logs</button>
                        </div>
                    </div>
                    <div className='table-responsive activity-table-responsive user-log-responsive'>
                        {loading ? (
                            <div className="text-center py-3"><SmallSpinner /></div>
                        ) : (
                            <>
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
                                                <td className="px-0"><span className={`dash-activity-text inner-activity-text ${item.request_type === "POST" ? "create-text" : item.request_type === "PUT" ? "update-text" : item.request_type === "DELETE" ? "delete-text" : ""}`}>{activityString(item)}</span>
                                                </td>
                                                <td><span className={`dash-activity-text inner-activity-text create-text ${item.request_type === "POST" ? "create-text" : item.request_type === "PUT" ? "update-text" : item.request_type === "DELETE" ? "delete-text" : ""}`}>{getTimeDifference(item.date)}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                    <div className='d-flex justify-content-between align-items-center mb-2 mt-1'>
                        <div className='pagination-message'>
                            <h3 className='mb-0'>Showing {UserLogsList.length} of {totalLogs} results</h3>
                        </div>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel={customNextLabel}
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={10}
                            pageCount={pageCount}
                            previousLabel={customPreviousLabel}
                            renderOnZeroPageCount={null}
                            pageLabelBuilder={customPageLabel}
                            className='pagination-section'
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
export default UserLogs;