import React from "react";
import { Row, Col } from "react-bootstrap";
import authimg from "../../assets/img/auth-img.png";
import logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import MdButton from "../../components/common/atomic/MdButton";
import { useDispatch } from "react-redux";
import { userRegister } from "../../store/slices/authenticationSlice";

const Register = () => {
  const dispatch =useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});


  const onSubmit=(data)=>{
    dispatch(userRegister(data))
  }
  return (
    <>
      <div className="auth-section">
        <div className="inner-auth-wrapper">
          <Row className="mx-0">
            <Col md={6} className="px-0">
              <div className="auth-content">
                <div className="text-center">
                  <img src={logo} className="auth-logo" />
                </div>
                <div className="mb-4">
                  <h2 className="auth-heading">Create an Account</h2>
                  <p className="auth-text">Please create your account</p>
                </div>
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
                          {...register("firstName",{
                            required:{
                                value:true,
                                message:"First Name is required"
                            }
                          })}
                        />
                        <p className="error-message">{errors.firstName?.message}</p>
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
                          {...register("lastName",{
                            required:{
                                value:true,
                                message:"Last Name is required"
                            }
                          })}
                        />
                        <p className="error-message">{errors.lastName?.message}</p>
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
                      {...register("email",{
                        required:{
                          value:true,
                          message:"Email is required"
                      },
                        pattern:{
                            value:/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                            message:"Please Enter valid email"
                        }
                      })}
                    />
                     <p className="error-message">{errors.email?.message}</p>
                  </div>
                  <div className="mb-23">
                    <label className="label-text">
                      Password <span className="highlight-req">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type="password"
                        name="password"
                        className="form-control form-field shadow-none"
                        {...register("password",{
                          required:{
                              value:true,
                              message:"Password is required"
                          }
                        })}
                      />
                       <p className="error-message">{errors.password?.message}</p>
                      <button className="password-eye-btn">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </div>
                  </div>
                  <div className="mb-23">
                    <label className="label-text">
                      Reenter Password <span className="highlight-req">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type="password"
                        name="reEnterPassword"
                        className="form-control form-field shadow-none"
                        {...register("reEnterPassword",{
                          required:{
                              value:true,
                              message:"Confirm Password is required"
                          }
                        })}
                      />
                       <p className="error-message">{errors.reEnterPassword?.message}</p>
                      <button className="password-eye-btn">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </div>
                  </div>
                  <div className="text-center">
                    <MdButton text="Create an account"/>
                  </div>
                </form>
              </div>
            </Col>
            <Col md={6} className="px-0">
              <div className="auth-img-wrapper text-center position-relative h-100">
                <div className="box-blur"></div>
                <img src={authimg} className="auth-img" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Register;
