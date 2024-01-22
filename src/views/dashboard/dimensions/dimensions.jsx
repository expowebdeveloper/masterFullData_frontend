import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from '../../../components/Sidebar'
import Navbar from '../../../components/navbar';
const MdDashboard = () => {
  return (
    <>
      <Navbar />
      <Sidebar/>
      <section className='main-wrapper dimensions-wrapper'>
        <h3 className='page-name mb-4'>Dimensions</h3>
        <Container fluid>
          <div className='inner-main-wrapper'>
            <Row className='justify-content-center'>
              <Col xxl={10} xl={11}>
                <div className='create-dimension-card'>
                  <h4 className='dimension-head'>Create Dimensions</h4>
                  <Row className='mb-4'>
                    <Col lg={6}>
                      <div>
                        <label className='label-form'>Dimension Name</label>
                        <input type='text' className='common-field' />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div>
                        <label className='label-form'>Top Node</label>
                        <input type='text' className='common-field' />
                      </div>
                    </Col>
                  </Row>
                  <div className='text-center'>
                    <button className='common-btn shadow-none'>Create Dimension</button>
                  </div>
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