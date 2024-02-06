import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from "react-bootstrap";
import trash from '../../../assets/img/trash-solid.png';
import eye from '../../../assets/img/eye.png';
import searchIcon from '../../../assets/img/iconamoon_search-thin.png'
import previousIcon from '../../../assets/img/previous.png'
import nextIcon from '../../../assets/img/next.png'
import { useNavigate } from "react-router-dom";
import { getUserList, deleteUser, activeUserR } from '../../../store/slices/adminDashboardSlice';
import { useDispatch, useSelector } from "react-redux";
import DeletePropertyModal from '../../../components/singleDimensions/DeletePropertyModal';
import ReactPaginate from 'react-paginate';
import ReactSwitch from 'react-switch';



const AllUsers = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userId, setUserId] = useState('')
    const [show, setShow] = useState(false);
    const {totalUser, pageNumber ,allUser} =useSelector(state=>state.adminDashboardData)
    




    const itemsPerPage = 10
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(totalUser / itemsPerPage);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % totalUser;        
        dispatch(getUserList(event.selected + 1, itemsPerPage))
        setCurrentPage(event.selected + 1)
        setItemOffset(newOffset);
    };

    const handleUserDetails = () =>{
        navigate("/user-details/22") 
    }

    useEffect(()=>{
        dispatch(getUserList(currentPage, itemsPerPage))
    }, [])

    const deleteModal = (userId) => {
        setShow(true);
        setUserId(userId)
    };

    const handleClose = () => {
        setShow(false);
      };

    const confirmDelete=()=>{
        dispatch(deleteUser(userId))
        setShow(false)
        setUserId("")
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

    const handleActiveSwitchToggle=(userID, value)=>{
        var data = {
            user_id: userID,
            is_active:value
        }
        dispatch(activeUserR(userID, data))
    }
    

  return (
    <>
        <section className='main-wrapper dashboard-wrapper'>
        <Container fluid className='user-table'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <div className='all-user'>
                    <h3 className='mb-0'>All Users</h3>
                </div>
                <div>
                    <div className='position-relative'><input type="text" name="" id="" className='user-search border-0 ps-3 pe-5' placeholder='Search' />  <span><img src={searchIcon} alt="" className='search-icon' /></span> </div>
                </div>
            </div>

            <div className='user-table-content table-responsive'>
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col" className='user-table-header'>First Name</th>
                            <th scope="col" className='user-table-header'>Last Name</th>
                            <th scope="col" className='user-table-header'>Email Address</th>
                            <th scope="col" className='user-table-header'>Role</th>
                            {/* <th scope="col" className='user-table-header'>Total Dimensions</th> */}
                            <th scope="col" className='user-table-header'>Active</th>
                            <th scope='col' className='user-table-header'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allUser.map((user, index) => (
                            <tr  key={index}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td><span className='role-pill user'>{user.roles.name}</span></td>
                                {/* <td>15</td> */}
                                <td>
                                    <ReactSwitch
                                        checked={user.is_active}
                                        onChange={()=> handleActiveSwitchToggle(user.id, !user.is_active)}
                                    />
                                </td>
                                <td className='d-flex justify-content-around'>
                                    <span>
                                        <div className='action-span eye' onClick={handleUserDetails}><img src={eye} alt="" className='action-image'/></div>
                                    </span>
                                    <span>
                                        <div className='action-span trash' onClick={() => deleteModal(user.id)}><img src={trash} alt="" className='action-image' /></div>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='d-flex justify-content-between align-items-center mb-4 mt-2'>
                <div className='pagination-message'>
                    <h3 className='mb-0'>Showing {allUser.length} of {totalUser} results</h3>
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
                {/* <div className='row'>
                

                    <div className='pagination-card d-flex justify-content-center align-items-center col-auto mx-1'>
                        <img src={previousIcon} className='pagination-icon' alt="" />
                    </div>

                    <div className='pagination-card-inactive d-flex justify-content-center align-items-center col-auto mx-1'>
                        <h3 className='pagination-icon text-center'>1</h3>
                    </div>
                    <div className='pagination-card d-flex justify-content-center align-items-center col-auto mx-1'>
                        <h3 className='pagination-icon text-center'>2</h3>
                    </div>
                    <div className='pagination-card-inactive d-flex justify-content-center align-items-center col-auto mx-1'>
                        <h3 className='pagination-icon text-center'>3</h3>
                    </div>
                    <div className='pagination-card-inactive d-flex justify-content-center align-items-center col-auto mx-1'>
                        <h3 className='pagination-icon text-center'>4</h3>
                    </div>
                    <div className='pagination-card d-flex justify-content-center align-items-center col-auto mx-1'>
                        <img src={nextIcon} className='pagination-icon' alt="" />
                    </div>
                </div> */}
            </div>
        </Container>
        <DeletePropertyModal
            show={show}
            handleClose={handleClose}
            heading={"User"}
            message={"Are you sure, you want to delete the User?"}
            confirmDelete={confirmDelete}
            btnText={"Delete User"}
        />
        </section>
    </>
  )
}

export default AllUsers