import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from "react-bootstrap";
import trash from '../../../assets/img/trash-solid.png';
import eye from '../../../assets/img/eye.png';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserList, deleteUser } from '../../../store/slices/adminDashboardSlice';
import DeletePropertyModal from '../../../components/singleDimensions/DeletePropertyModal';


const Dashboard = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userId, setUserId] = useState('')
    const [show, setShow] = useState(false);
    const {allUser, activeUser, inActiveUser, totalUser} = useSelector(state=>state.adminDashboardData)

    const handleAllUserClick = () =>{
        navigate("/all-users")
    }

    const handleUserDetails = (userId) =>{
        navigate(`/user-details/${userId}`)
    }

    useEffect(()=>{
        dispatch(getUserList())
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


  return (
    <>
        <section className='main-wrapper dashboard-wrapper'>
        <Container fluid>
          <div className='inner-main-wrapper'>
            <h3 className='welcome-text mb-4'>Welcome Back, <span className='name-login'>Lorem Ipsum</span></h3>
            <Row>
              <Col lg={4}>
                <div className='dashboard-card-total-user'>
                    <p className='total-dimensions'>{totalUser}</p>
                    <p className='mb-0 dashboardCardTitle'>Total User</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className='dashboard-card-active-user'>
                    <p className='total-dimensions'>{activeUser}</p>
                    <p className='mb-0 dashboardCardTitle'>Active User</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className='dashboard-card-desibled-user'>
                    <p className='total-dimensions'>{inActiveUser}</p>
                    <p className='mb-0 dashboardCardTitle'>Desibled Users</p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>

        <Container fluid className='user-table'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <div className='all-user'>
                    <h3 className='mb-0'>All Users</h3>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={handleAllUserClick}>View All</button>
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
                            <th scope="col" className='user-table-header'>Total Dimensions</th>
                            <th scope='col' className='user-table-header'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allUser.map((user, index) => (
                            <tr key={index}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td><span className={`role-pill ${user.roles.name.toLowerCase()}`}>{user.roles.name}</span></td>
                                <td>15</td>
                                <td className='d-flex justify-content-around'>
                                    <span>
                                        <div className='action-span eye' onClick={() => handleUserDetails(user.id)}><img src={eye} alt="" className='action-image'/></div>
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

export default Dashboard