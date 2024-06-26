import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from "react-bootstrap";
import trash from '../../../assets/img/trash-solid.png';
import eye from '../../../assets/img/eye.png';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserList, deleteUser, getRoles, activeUserR } from '../../../store/slices/adminDashboardSlice';
import DeletePropertyModal from '../../../components/singleDimensions/DeletePropertyModal';
import Register from '../../authentication/register';
import ReactSwitch from 'react-switch';


const Dashboard = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userId, setUserId] = useState('')
    const [show, setShow] = useState(false);
    const [showAddUser,setShowAddUser]=useState(false)
    const {allUser, activeUser, inActiveUser, totalUser} = useSelector(state=>state.adminDashboardData)
   

    useEffect(()=>{
        dispatch(getRoles())
    },[])

    const handleAllUserClick = () =>{
        navigate("/all-users")
    }

    const handleUserDetails = (userId) =>{
        navigate(`/user-details/${userId}`)
    }

    useEffect(()=>{
        dispatch(getUserList(1,10))
    }, [])

    const deleteModal = (userId) => {
        setShow(true);
        setUserId(userId)
    };

    const handleClose = () => {
        setShow(false);
        setShowAddUser(false)
        
      };

    const confirmDelete=()=>{
        dispatch(deleteUser(userId))
        setShow(false)
        setUserId("")
    }

    const handleAddUser=()=>{
        setShowAddUser(true)
    }

    const handleActiveSwitchToggle=(userID, value)=>{
        var data = {
            user_id: userID,
            is_active:value
        }
        dispatch(activeUserR(userID, data))
    }

  return (
    <>
        <section className="main-wrapper dashboard-wrapper">
        <Container fluid>
          <div className='inner-main-wrapper pt-3'>
            <h3 className='welcome-text mb-4'>Welcome Back, <span className='name-login'>{localStorage.getItem("user")}</span></h3>
            <Row>
              <Col lg={4}>
                <div className='dashboard-card-total-user mb-2'>
                    <p className='total-dimensions'>{totalUser}</p>
                    <p className='mb-0 dashboardCardTitle'>Total User</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className='dashboard-card-active-user mb-2'>
                    <p className='total-dimensions'>{activeUser}</p>
                    <p className='mb-0 dashboardCardTitle'>Active User</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className='dashboard-card-desibled-user mb-2'>
                    <p className='total-dimensions'>{inActiveUser}</p>
                    <p className='mb-0 dashboardCardTitle'>Disabled Users</p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>

        <Container fluid className='user-table'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <div className='all-user'>
                    <h3 className='inner-card-heading mb-0'>All Users</h3>
                </div>
                <div>
                    <button className='common-btn-sm me-4 mb-2' onClick={handleAddUser}>+ Add User</button>
                    <button className='outline-common-btn-sm  mb-2' onClick={handleAllUserClick}>View All</button>
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
                            <tr key={index}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td><span className={`role-pill ${user.roles.name.toLowerCase()}`}>{user.roles.name}</span></td>
                                {/* <td>15</td> */}
                                <td>
                                    <ReactSwitch
                                        checked={user.is_active}
                                        onChange={()=> handleActiveSwitchToggle(user.id, !user.is_active)}
                                    />
                                </td>
                                <td>
                                    <div className='d-flex gap-3'>
                                        <span>
                                            <div className='action-span eye' onClick={() => handleUserDetails(user.id)}><img src={eye} alt="" className='action-image'/></div>
                                        </span>
                                        <span>
                                            <div className='action-span trash' onClick={() => deleteModal(user.id)}><img src={trash} alt="" className='action-image' /></div>
                                        </span>
                                    </div>
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
        {showAddUser?<Register show={showAddUser} handleClose={handleClose}/>:""}
      </section>
    
    </>
  )
}

export default Dashboard