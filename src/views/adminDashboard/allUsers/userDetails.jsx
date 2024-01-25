import React, { useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import userProfileImage from '../../../assets/img/user-profile.png'

const UserDetails = () => {
const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
        <>
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
                                    <p className='user-card-para mb-0'><a className='edit-role' onClick={handleShow}>Edit Role</a></p>
                                </div>
                                <Link className='deleteBtn'>Delete User</Link>
                            </div>
                        </Col>
                        <Col lg={7}>
                            <div className='user-profile-dimension-card'>
                                <div className="dimensionTable userDimension">
                                    <h4 className="dimension-head">Total Dimensions : 15</h4>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                            <th>Dimension Name</th>
                                            <th>Top Node</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Test 1</td>
                                                <td>CFO</td>
                                            </tr>
                                            <tr>
                                                <td>Test 1</td>
                                                <td>CFO</td>
                                            </tr>
                                            <tr>
                                                <td>Test 1</td>
                                                <td>CFO</td>
                                            </tr>
                                            <tr>
                                                <td>Test 1</td>
                                                <td>CFO</td>
                                            </tr>
                                            <tr>
                                                <td>Test 1</td>
                                                <td>CFO</td>
                                            </tr>
                                        </tbody>
                                        </Table>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Modal show={show} className="EditRole" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form className="mt-4">
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicFName">
                            <Form.Label>Select Role</Form.Label>
                            <select>
                                <option>Select Role</option>
                                <option>Role 1</option>
                                <option>Role 2</option>
                                <option>Role 3</option>
                            </select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicFName">
                            <Form.Label>Select Permissions</Form.Label>
                            <select>
                                <option>Select Permissions</option>
                                <option>Role 1</option>
                                <option>Role 2</option>
                                <option>Role 3</option>
                            </select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="primary" onClick={handleClose}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserDetails