import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from '../../../components/Sidebar'
import Navbar from '../../../components/navbar';
import CreateDimensions from '../../../components/dimensions/CreateDimensions';
const MdDashboard = () => {
  return (
    <>
      <Navbar />
      <Sidebar/>
      <section className='main-wrapper dimensions-wrapper'>
        <h3 className='page-name mb-4'>Dimensions</h3>
        <Container fluid>
          <div className='inner-main-wrapper'>
           <CreateDimensions/>
          </div>
        </Container>
      </section>
    </>
  )
}

export default MdDashboard