import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import userProfileImage from '../../../assets/img/user-profile.png'
import { getUser, deleteUser, getRoles, getPermissions, updateUser } from '../../../store/slices/adminDashboardSlice';
import DeletePropertyModal from '../../../components/singleDimensions/DeletePropertyModal';
import Select from 'react-select';
import { MdModeEdit } from "react-icons/md";



const UserDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const params = useParams();
    const [userId, setUserId] = useState('')
    const [deleteShow, setDeleteShow] = useState(false);
    const {singleUser, allRoles, allPermissions} = useSelector(state=>state.adminDashboardData)
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);


    useEffect(()=>{
        dispatch(getUser(params.userId))
        dispatch(getRoles())
        dispatch(getPermissions())
    }, [])

    useEffect(() =>{
        setSelectedOption(singleUser?.permissions)
        setSelectedRole(singleUser?.roles?.id)
    },[singleUser?.permissions, singleUser?.roles])
    
    const deleteModal = (userId) => {
        setDeleteShow(true);
        setUserId(userId)
    };

    const handleDeleteClose = () => {
        setDeleteShow(false);
      };

    const confirmDelete=()=>{
        dispatch(deleteUser(userId))
        setDeleteShow(false)
        setUserId("")
        navigate("/dashboard")
    }

    const handleSubmit = () =>{
        setShow(false)
        const data = {
            roles: selectedRole,
            permissions: selectedOption.map((item) => item.id)
        }
        dispatch(updateUser(singleUser.id, data))

    };
    const handleShow = () => setShow(true);

    return (
        <>
            <section className='main-wrapper dimensions-wrapper'>
                <div className='user-details-username d-flex justify-content-center align-items-center'>
                    <h3>{singleUser.first_name} {singleUser.last_name}</h3>
                </div>

                <Container fluid className='profile-section'>
                    <Row>
                        <Col lg={4}>
                            <div className='user-profile-card mb-2'>
                                <div className='text-center'>
                                    <img className='user-profile-img' src={userProfileImage} alt="" />
                                    <h4 className='user-name mt-5 mb-3'>{singleUser.first_name} {singleUser.last_name}</h4>
                                </div>
                                <div className='d-flex justify-content-between align-items-center user-heading-border py-2'>
                                    <h3 className='user-card-headings mb-0'>Email</h3>
                                    <p className='user-card-para mb-0'>{singleUser.email}</p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center user-heading-border py-2'>
                                    <h3 className='user-card-headings mb-0'>Phone No</h3>
                                    <p className='user-card-para mb-0'>123456789</p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center user-heading-border py-2 border-0'>
                                    <h3 className='user-card-headings mb-0'>Role</h3>
                                    <a className={`user-btn role-pill ${singleUser.roles?.name.toLowerCase()}`}>{singleUser.roles?.name}</a>
                                    <p className='user-card-para mb-0'><a className='edit-role' onClick={handleShow}><MdModeEdit /></a></p>
                                </div>
                                <Link className='deleteBtn' onClick={() => deleteModal(singleUser.id)}>Delete User</Link>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div className='user-profile-dimension-card mb-2'>
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
            <Modal show={show} className="EditRole" onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form className="mt-4">
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicFName">
                            <Form.Label>Select Role</Form.Label>
                            <select onChange={(e) => setSelectedRole(e.target.value)}>
                                <option>Select Role</option>
                                {allRoles.map((role, index) => (
                                    <option selected={singleUser.roles?.name === role.name ? true : false} key={index} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicFName">
                            <Form.Label>Select Permissions</Form.Label>
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={allPermissions}
                                isMulti={true}
                                className='edit-permission'
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option.id}
                            />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <DeletePropertyModal
            show={deleteShow}
            handleClose={handleDeleteClose}
            heading={"User"}
            message={"Are you sure, you want to delete the User?"}
            confirmDelete={confirmDelete}
            btnText={"Delete User"}
        />
        </>
    )
}

export default UserDetails