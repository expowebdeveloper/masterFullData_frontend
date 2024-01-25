import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import userProfileImage from '../../../assets/img/user-profile.png'

const UserDetails = () => {
    return (
        <section className='main-wrapper dimensions-wrapper'>
            <div className='user-details-username d-flex justify-content-center align-items-center'>
                <h3>Lorem Ipsum</h3>
            </div>

            <Container fluid className='profile-section'>
                <Row>
                    <Col lg={5}>
                        <div className='user-profile-card'>
                            <div className='text-center'>
                                <img className='user-profile-img' src={userProfileImage} alt="" />
                                <h4 className='user-name mt-5'>Lorem Ipsum</h4>
                            </div>
                            <div className='d-flex justify-content-between align-items-center user-heading-border pt-2 pb-1'>
                                <h3 className='user-card-headings mb-0'>Email</h3>
                                <p className='user-card-para mb-0'>loremipsum@gmail.com</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center user-heading-border pt-2 pb-1'>
                                <h3 className='user-card-headings mb-0'>Phone No</h3>
                                <p className='user-card-para mb-0'>123456789</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center user-heading-border pt-2 pb-1 border-0'>
                                <h3 className='user-card-headings mb-0'>Email</h3>
                                <a className='user-btn role-pill user'>User</a>
                                <p className='user-card-para mb-0'><a className='edit-role'>Edit Role</a></p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={7}>
                        <div className='user-profile-dimension-card'>
                            <h3>Total Dimensions : 15</h3>
                            
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default UserDetails