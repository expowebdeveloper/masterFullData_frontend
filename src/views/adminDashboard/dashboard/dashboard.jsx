import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import trash from '../../../assets/img/trash-solid.png';
import eye from '../../../assets/img/eye.png';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate()

    const handleAllUserClick = () =>{
        navigate("/all-users")
    }

    const handleUserDetails = () =>{
        navigate("/user-details/22")
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
                    <p className='total-dimensions'>15</p>
                    <p className='mb-0'>Total User</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className='dashboard-card-active-user'>
                    <p className='total-dimensions'>15</p>
                    <p className='mb-0'>Active User</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className='dashboard-card-desibled-user'>
                    <p className='total-dimensions'>15</p>
                    <p className='mb-0'>Desibled Users</p>
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
                        <tr>
                            <td>Shibdas</td>
                            <td>Kumbhakar</td>
                            <td>shibdas@avioxtechnologies.com</td>
                            <td><span className='role-pill user'>User</span></td>
                            <td>15</td>
                            <td className='d-flex justify-content-around'>
                                <span>
                                    <div className='action-span eye' onClick={handleUserDetails}><img src={eye} alt="" className='action-image'/></div>
                                </span>
                                <span>
                                    <div className='action-span trash'><img src={trash} alt="" className='action-image' /></div>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>Shibdas</td>
                            <td>Kumbhakar</td>
                            <td>shibdas@avioxtechnologies.com</td>
                            <td><span className='role-pill power-user'>Power User</span></td>
                            <td>15</td>
                            <td className='d-flex justify-content-around'>
                                <span>
                                    <div className='action-span eye'><img src={eye} alt="" className='action-image'/></div>
                                </span>
                                <span>
                                    <div className='action-span trash'><img src={trash} alt="" className='action-image' /></div>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>Shibdas</td>
                            <td>Kumbhakar</td>
                            <td>shibdas@avioxtechnologies.com</td>
                            <td><span className='role-pill admin'>Admin</span></td>
                            <td>15</td>
                            <td className='d-flex justify-content-around'>
                                <span>
                                    <div className='action-span eye'><img src={eye} alt="" className='action-image'/></div>
                                </span>
                                <span>
                                    <div className='action-span trash'><img src={trash} alt="" className='action-image' /></div>
                                </span>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </Container>
      </section>
    
    </>
  )
}

export default Dashboard