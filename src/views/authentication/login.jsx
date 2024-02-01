import React, {useState} from "react";
import { Row, Col } from "react-bootstrap";
import authimg from "../../assets/img/auth-img.png";
import logo from "../../assets/img/logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import MdButton from "../../components/common/atomic/MdButton";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/slices/authenticationSlice";
const Login = () => {
  const dispatch =useDispatch()
  const {register,handleSubmit, formState: { errors ,isDirty,isValid,isSubmitting}}=useForm({});
  const {loading}=useSelector(state=>state.authData)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const onSubmit=(data)=>{
    dispatch(userLogin(data))

  }
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
                  <h2 className="auth-heading">Login</h2>
                  <p className="auth-text">Please login your account</p>
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
                  <div className="mb-40">
                    <label className="label-text">
                      Password <span className="highlight-req">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
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
                      <span className="password-eye-btn"
                      onClick={() => togglePasswordVisibility('confirmPassword')}>
                        <FontAwesomeIcon icon={faEye} />
                      </span>
                    </div>
                  </div>
                  <div className="text-end mb-40">
                    <Link to="/forgot-password" className="forgot-link">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="text-center">
                    <MdButton text="Login" isLoading={loading}/>
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

export default Login;
