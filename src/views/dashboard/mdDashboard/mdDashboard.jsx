import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from '../../../components/Sidebar'
import Navbar from '../../../components/navbar';


const MdDashboard = () => {

  return (
    <>
      <section className='main-wrapper dashboard-wrapper'>
        <Container fluid>
          <div className='inner-main-wrapper'>
            <h3 className='welcome-text mb-4'>Welcome Back, <span className='name-login'>Lorem Ipsum</span></h3>
            <Row>
              <Col lg={4}>
                <div className='dashboard-card'>
                    <p className='total-dimensions'>15</p>
                    <p className='mb-0'>Dimensions</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className='dashboard-card'>
                    <p className='total-dimensions'>15</p>
                    <p className='mb-0'>Dimensions</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className='dashboard-card'>
                    <p className='total-dimensions'>15</p>
                    <p className='mb-0'>Dimensions</p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  )
}

export default MdDashboard