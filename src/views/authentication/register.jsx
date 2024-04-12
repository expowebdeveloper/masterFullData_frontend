import React, { useState } from "react";
import { Row, Col, Modal, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import MdButton from "../../components/common/atomic/MdButton";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../store/slices/authenticationSlice";
import { getUserList } from "../../store/slices/adminDashboardSlice";

const Register = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState(null);
  const { singleUser, allRoles, allPermissions } = useSelector(
    (state) => state.adminDashboardData
  );
  const {loading}=useSelector(state=>state.authData)
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const onSubmit = (data) => {
    let newData = {
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password,
      is_active: true,
      roles: selectedRole,
    };

    dispatch(userRegister(newData,()=>{
      handleClose()
      dispatch(getUserList(1,10))
    }))
  };
  return (
    <>
      <div className="auth-section">
        <div className="inner-auth-wrapper"></div>
      </div>

      <Modal show={show} onHide={handleClose} className="EditRole" centered>
        <Modal.Header closeButton className="flex-column authHeader">
          <Modal.Title>Create an Account</Modal.Title>
          <p className="auth-text text-white">Please create your account</p>
        </Modal.Header>
        <Modal.Body>
          <Row className="mx-0">
            <Col md={12} className="px-0">
              <div className="auth-content">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Row>
                    <Col md={6}>
                      <div className="mb-23">
                        <label className="label-text">
                          First Name <span className="highlight-req">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          className="form-control form-field shadow-none"
                          {...register("firstName", {
                            required: {
                              value: true,
                              message: "First Name is required",
                            },
                          })}
                        />
                        <p className="error-message">
                          {errors.firstName?.message}
                        </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-23">
                        <label className="label-text">
                          Last Name <span className="highlight-req">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          className="form-control form-field shadow-none"
                          {...register("lastName", {
                            required: {
                              value: true,
                              message: "Last Name is required",
                            },
                          })}
                        />
                        <p className="error-message">
                          {errors.lastName?.message}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <div className="mb-23">
                    <label className="label-text">
                      Email Address <span className="highlight-req">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-field shadow-none"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                        pattern: {
                          value:
                            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                          message: "Please Enter valid email",
                        },
                      })}
                    />
                    <p className="error-message">{errors.email?.message}</p>
                  </div>
                  <Row>
                    <Col md={6}>
                      <div className="mb-23">
                        <label className="label-text">
                          Password <span className="highlight-req">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className="form-control form-field shadow-none"
                            {...register("password", {
                              required: {
                                value: true,
                                message: "Password is required",
                              },
                            })}
                          />
                          <span className="password-eye-btn"
                          onClick={() => togglePasswordVisibility('password')}>
                            <FontAwesomeIcon icon={faEye} />
                          </span>
                        </div>
                        <p className="error-message">
                            {errors.password?.message}
                          </p>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-23">
                        <label className="label-text">
                          Reenter Password <span className="highlight-req">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="reEnterPassword"
                            className="form-control form-field shadow-none"
                            {...register("reEnterPassword", {
                              required: {
                                value: true,
                                message: "Confirm Password is required",
                              },
                            })}
                          />
                          <span className="password-eye-btn"
                          onClick={() => togglePasswordVisibility('confirmPassword')}>
                            <FontAwesomeIcon icon={faEye} />
                          </span>
                        </div>
                          <p className="error-message">
                            {errors.reEnterPassword?.message}
                          </p>
                      </div>
                    </Col>
                  </Row>
                  <div className="mb-23">
                    <label className="label-text">
                      Select Role <span className="highlight-req">*</span>
                    </label>
                    <div className="position-relative ">
                      <select className="role-field"  onChange={(e) => setSelectedRole(e.target.value)}>
                        <option>Select Role</option>
                        {allRoles.map((role, index) => (
                          <option
                            selected={
                              singleUser.roles?.name === role.name
                                ? true
                                : false
                            }
                            key={index}
                            value={role.id}
                          >
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="text-center">
                    <MdButton text="Create an account" isLoading={loading} />
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;
