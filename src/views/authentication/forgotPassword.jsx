import React from 'react'
import { Row, Col } from 'react-bootstrap'
import authimg from  '../../assets/img/auth-img.png'
import logo from '../../assets/img/logo.svg'
const ForgotPassword = () => {
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
                  <h2 className='auth-heading'>Forgot Password</h2>
                  <p className='auth-text'>Please enter email address</p>
                </div>
                <form>
                  <div className='mb-23'>
                    <label className='label-text'>Email Address <span className='highlight-req'>*</span></label>
                    <input type="email" name='email' className='form-control form-field shadow-none' />
                  </div>
                  <div className='text-center'>
                    <button className='common-btn'>Forgot Password</button>
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

export default ForgotPassword