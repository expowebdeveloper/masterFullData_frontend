import React, { useState } from 'react';
import UserImg from '../../../assets/img/user-profile.png';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

const Settings = () => {
    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  const [roleshow, setroleShow] = useState(false);

  const handleroleClose = () => setShow(false);
  const handleroleShow = () => setShow(true);

  return (
    <>
    <section className='main-wrapper dimensions-wrapper'>
        <div className='user-details-username d-flex justify-content-center align-items-center'>
            <h3>Settings</h3>
        </div>
            <Tabs className='SettingTabs'>
                <TabList>
                    <Tab>Get Information</Tab>
                    <Tab>Change Password</Tab>
                </TabList>

                <TabPanel>
                    <div className='userInfo'>
                        <div className='userImg'>
                            <div className='imgwrap'>
                                <img src={UserImg}/>
                                <Link>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M8 10.5C9.10457 10.5 10 9.60457 10 8.5C10 7.39543 9.10457 6.5 8 6.5C6.89543 6.5 6 7.39543 6 8.5C6 9.60457 6.89543 10.5 8 10.5Z" fill="white"/>
                                        <path d="M14.25 4.5H11.6562C11.5625 4.5 11.4462 4.43938 11.3556 4.34375L10.5031 3.00625C10.1562 2.5 10 2.5 9.4375 2.5H6.5625C6 2.5 5.8125 2.5 5.49781 3.00656L4.64437 4.34375C4.575 4.41937 4.4775 4.5 4.375 4.5V4C4.375 3.9337 4.34866 3.87011 4.30178 3.82322C4.25489 3.77634 4.1913 3.75 4.125 3.75H2.875C2.8087 3.75 2.74511 3.77634 2.69822 3.82322C2.65134 3.87011 2.625 3.9337 2.625 4V4.5H1.75C1.55109 4.5 1.36032 4.57902 1.21967 4.71967C1.07902 4.86032 1 5.05109 1 5.25V12.75C1 12.9489 1.07902 13.1397 1.21967 13.2803C1.36032 13.421 1.55109 13.5 1.75 13.5H14.25C14.4489 13.5 14.6397 13.421 14.7803 13.2803C14.921 13.1397 15 12.9489 15 12.75V5.25C15 5.05109 14.921 4.86032 14.7803 4.71967C14.6397 4.57902 14.4489 4.5 14.25 4.5ZM8.14094 11.4969C7.53626 11.5253 6.93714 11.3701 6.42229 11.0517C5.90744 10.7333 5.50096 10.2666 5.25624 9.71295C5.01153 9.15928 4.94004 8.54453 5.05116 7.94947C5.16228 7.35442 5.45082 6.8069 5.87886 6.37886C6.3069 5.95082 6.85442 5.66228 7.44947 5.55116C8.04453 5.44004 8.65928 5.51153 9.21295 5.75624C9.76663 6.00096 10.2333 6.40744 10.5517 6.92229C10.8701 7.43714 11.0253 8.03626 10.9969 8.64094C10.9611 9.38682 10.6487 10.0926 10.1206 10.6206C9.59262 11.1487 8.88682 11.4611 8.14094 11.4969Z" fill="white"/>
                                    </svg>
                                </Link>                           
                            </div>
                        </div>
                        <Form className="mt-4">
                            <Row>
                                <Col md>
                                    <Form.Group className="mb-3" controlId="formBasicFName">
                                        <Form.Label>First Name</Form.Label>
                                        <input type="text" className="common-field" name="name" placeholder=""/>
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group className="mb-3" controlId="formBasicLName">
                                        <Form.Label>Last Name</Form.Label>
                                        <input type="text" className="common-field" name="name" placeholder=""/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md>
                                    <Form.Group className="mb-3" controlId="formBasicFName">
                                        <Form.Label>Email Address</Form.Label>
                                        <input type="text" className="common-field" name="name" placeholder=""/>
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group className="mb-3" controlId="formBasicLName">
                                        <Form.Label>Role</Form.Label>
                                        <input type="text" className="common-field" name="name" placeholder=""/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='text-center'>
                                    <Button variant="primary" type="submit" className='mx-2'>
                                        Edit Details
                                    </Button>

                                    <Button variant="danger" type="submit" className=' mx-2'>
                                        Cancel
                                    </Button>

                                    <Button variant="primary" type="submit" className='mx-2'>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </TabPanel>
                <TabPanel>
                <div className='userInfo passwordChange'>
                        <Form className="mt-4">
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicLName">
                                        <Form.Label>Enter Old Password</Form.Label>
                                        <input type="Password" className="common-field" name="name" placeholder=""/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicLName">
                                        <Form.Label>Enter New Password</Form.Label>
                                        <input type="Password" className="common-field" name="name" placeholder=""/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicLName">
                                        <Form.Label>Reenter New Password</Form.Label>
                                        <input type="Password" className="common-field" name="name" placeholder=""/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className='text-center'>
                                    <Button variant="primary" type="submit" className='mx-2' onClick={handleShow}>
                                        Change Password
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </TabPanel>
            </Tabs>
    </section>

    <Modal show={show} className="changePassword" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90" fill="none">
            <mask id="mask0_5_3038" maskUnits="userSpaceOnUse" x="5" y="5" width="80" height="80">
                <path d="M45 82.5C49.9255 82.5064 54.8037 81.5393 59.3543 79.6544C63.9048 77.7694 68.038 75.0037 71.5163 71.5163C75.0037 68.038 77.7694 63.9048 79.6544 59.3543C81.5393 54.8037 82.5064 49.9255 82.5 45C82.5063 40.0745 81.5392 35.1964 79.6542 30.6458C77.7693 26.0953 75.0036 21.9621 71.5163 18.4838C68.038 14.9963 63.9048 12.2307 59.3543 10.3457C54.8037 8.46073 49.9255 7.49365 45 7.50003C40.0745 7.49375 35.1964 8.46088 30.6458 10.3458C26.0953 12.2308 21.9621 14.9964 18.4838 18.4838C14.9964 21.9621 12.2308 26.0953 10.3458 30.6458C8.46088 35.1964 7.49375 40.0745 7.50003 45C7.49365 49.9255 8.46073 54.8037 10.3457 59.3543C12.2307 63.9048 14.9963 68.038 18.4838 71.5163C21.9621 75.0036 26.0953 77.7693 30.6458 79.6542C35.1964 81.5392 40.0745 82.5063 45 82.5Z" fill="white" stroke="white" stroke-width="4" stroke-linejoin="round"/>
                <path d="M30 45L41.25 56.25L63.75 33.75" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </mask>
            <g mask="url(#mask0_5_3038)">
                <path d="M0 0H90V90H0V0Z" fill="#3AAD2A"/>
            </g>
        </svg>
        <h4>Your Password has been changed</h4>
        </Modal.Body>
    </Modal>

    <Modal show={roleshow} className="changePassword" onHide={handleroleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90" fill="none">
            <mask id="mask0_5_3038" maskUnits="userSpaceOnUse" x="5" y="5" width="80" height="80">
                <path d="M45 82.5C49.9255 82.5064 54.8037 81.5393 59.3543 79.6544C63.9048 77.7694 68.038 75.0037 71.5163 71.5163C75.0037 68.038 77.7694 63.9048 79.6544 59.3543C81.5393 54.8037 82.5064 49.9255 82.5 45C82.5063 40.0745 81.5392 35.1964 79.6542 30.6458C77.7693 26.0953 75.0036 21.9621 71.5163 18.4838C68.038 14.9963 63.9048 12.2307 59.3543 10.3457C54.8037 8.46073 49.9255 7.49365 45 7.50003C40.0745 7.49375 35.1964 8.46088 30.6458 10.3458C26.0953 12.2308 21.9621 14.9964 18.4838 18.4838C14.9964 21.9621 12.2308 26.0953 10.3458 30.6458C8.46088 35.1964 7.49375 40.0745 7.50003 45C7.49365 49.9255 8.46073 54.8037 10.3457 59.3543C12.2307 63.9048 14.9963 68.038 18.4838 71.5163C21.9621 75.0036 26.0953 77.7693 30.6458 79.6542C35.1964 81.5392 40.0745 82.5063 45 82.5Z" fill="white" stroke="white" stroke-width="4" stroke-linejoin="round"/>
                <path d="M30 45L41.25 56.25L63.75 33.75" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </mask>
            <g mask="url(#mask0_5_3038)">
                <path d="M0 0H90V90H0V0Z" fill="#3AAD2A"/>
            </g>
        </svg>
        <h4>Your Password has been changed</h4>
        </Modal.Body>
    </Modal>
    </>
  )
}

export default Settings