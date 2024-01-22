import React from 'react'
import { Row, Col } from 'react-bootstrap'
import authimg from  '../../assets/img/auth-img.png'
import logo from '../../assets/img/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
const ResetPassword = () => {
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
                      <input type="password" name='password' className='form-control form-field shadow-none' />
                      <button className='password-eye-btn'><FontAwesomeIcon icon={faEye}/></button>
                    </div>
                  </div>
                  <div className='mb-40'>
                    <label className='label-text'>Confirm New Password <span className='highlight-req'>*</span></label>
                    <div className='position-relative'>
                      <input type="password" name='password' className='form-control form-field shadow-none' />
                      <button className='password-eye-btn'><FontAwesomeIcon icon={faEye}/></button>
                    </div>
                  </div>
                  <div className='text-center'>
                    <button className='common-btn'>Reset Password</button>
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