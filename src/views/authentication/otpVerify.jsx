import React , {useState} from "react";
import { Row, Col } from "react-bootstrap";
import authimg from "../../assets/img/auth-img.png";
import logo from "../../assets/img/logo.svg";
import { useDispatch } from "react-redux";
import {
    verifyOtp
} from "../../store/slices/authenticationSlice";
import MdButton from "../../components/common/atomic/MdButton";
import { useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const OtpVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const { userId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});

  const onSubmit = (data) => {
    if (otp.length === 6){
        var data = {
            otp: otp,
            user_id: userId
        }
        dispatch(verifyOtp(data, () => {
            navigate(`/reset-password/${userId}`) 
        }))
    }
  };

  const handleOtpInputChange = (otp) => {
    setOtp(otp)
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
                  <h2 className="auth-heading">Verify OTP</h2>
                  <p className="auth-text">Enter OTP code for reset password</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="mb-23">
                    <label className="label-text">
                      Enter One Time Password(OTP) <span className="highlight-req">*</span>
                    </label>
                    <OTPInput
                      value={otp}
                      onChange={handleOtpInputChange}
                      numInputs={6}
                      renderInput={(props) => (
                        <input
                          {...props}
                          placeholder="-"
                          className="otpInput"
                        />
                      )}
                      isInputNum={true}
                      containerStyle="OTPInputContainer"
                    />
                    {/* <p className="error-message">{errors.email?.message}</p> */}
                  </div>
                  <div className="text-center">
                    <MdButton text="Verify OTP" />
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

export default OtpVerify;
