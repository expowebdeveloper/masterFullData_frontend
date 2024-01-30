import React, {useState} from 'react'
import { Row, Col } from 'react-bootstrap'
import authimg from  '../../assets/img/auth-img.png'
import logo from '../../assets/img/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { resetPassword } from '../../store/slices/authenticationSlice'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const ResetPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userId } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = () => {
    console.log(password, confirmPassword)
    if (password === confirmPassword) {
      var data = {
        user_id: userId,
        password: password
      }
      dispatch(resetPassword(data, () => {
        console.log('-------------------------')
        navigate('/login')
      }))
    }else{
      console.log('pasword not matched')
    }
  }

  return (
    <>
      <div className='auth-section'>
        <div className='inner-auth-wrapper min-h-90vh'>
          <Row className='mx-0 min-h-90vh'>
            <Col md={6} className='px-0'>
              <div className='auth-content'>
                <div className='text-center'>
                  <img src={logo} className='auth-logo'/>
                </div>
                <div className='mb-4'>
                  <h2 className='auth-heading'>Reset Password</h2>
                  <p className='auth-text'>Please create new password for your account</p>
                </div>
                <form>
                  <div className='mb-40'>
                    <label className='label-text'>Enter New Password <span className='highlight-req'>*</span></label>
                    <div className='position-relative'>
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='form-control form-field shadow-none' />
                      <span 
                        className='password-eye-btn'
                        onClick={() => togglePasswordVisibility('password')}>
                          <FontAwesomeIcon icon={faEye}/>
                      </span>
                    </div>
                  </div>
                  <div className='mb-40'>
                    <label className='label-text'>Confirm New Password <span className='highlight-req'>*</span></label>
                    <div className='position-relative'>
                      <input 
                        type={showConfirmPassword ? 'text' : 'password'}
                        name='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='form-control form-field shadow-none' 
                      />
                      <span 
                        className='password-eye-btn'
                        onClick={() => togglePasswordVisibility('confirmPassword')}>
                          <FontAwesomeIcon icon={faEye}/>
                        </span>
                    </div>
                  </div>
                  <div className='text-center'>
                    <span className='common-btn' onClick={handleSubmit}>Reset Password</span>
                  </div>
                </form>
              </div>
            </Col>
            <Col md={6} className='px-0'>
              <div className='auth-img-wrapper text-center position-relative h-100'>
                  <div className='box-blur'></div>
                  <img src={authimg} className='auth-img'/>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default ResetPassword