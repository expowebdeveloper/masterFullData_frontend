import React from "react";
import { Row, Col } from "react-bootstrap";
import authimg from "../../assets/img/auth-img.png";
import logo from "../../assets/img/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  forGotPassword,
  userRegister,
} from "../../store/slices/authenticationSlice";
import MdButton from "../../components/common/atomic/MdButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});

  const {loading}=useSelector(state=>state.authData)

  const onSubmit = (data) => {
    dispatch(forGotPassword(data, (userId)=>{
      navigate(`/opt-verify/${userId}`) 
    }));
  };

  return (
    <>
      <div className="auth-section">
        <div className="inner-auth-wrapper min-h-90vh">
          <Row className="mx-0 min-h-90vh">
            <Col md={6} className="px-0">
              <div className="auth-content">
                <div className="text-center">
                  <img src={logo} className="auth-logo" />
                </div>
                <div className="mb-4">
                  <h2 className="auth-heading">Forgot Password</h2>
                  <p className="auth-text">Please enter email address</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                  <div className="text-center">
                    <MdButton text="Forgot Password" isLoading={loading} />
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

export default ForgotPassword;
