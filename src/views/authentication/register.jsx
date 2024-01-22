import React from 'react'
import { Row, Col } from 'react-bootstrap'
import authimg from  '../../assets/img/auth-img.png'
import logo from '../../assets/img/logo.svg'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
const Register = () => {
  return (
    <>
      <div className='auth-section'>
        <div className='inner-auth-wrapper'>
          <Row className='mx-0'>
            <Col md={6} className='px-0'>
              <div className='auth-content'>
                <div className='text-center'>
                  <img src={logo} className='auth-logo'/>
                </div>
                <div className='mb-4'>
                  <h2 className='auth-heading'>Create an Account</h2>
                  <p className='auth-text'>Please create your account</p>
                </div>
                <form>
                  <Row>
                      <Col md={6}>
                        <div className='mb-23'>
                          <label className='label-text'>First Name <span className='highlight-req'>*</span></label>
                          <input type="text" name='firstname' className='form-control form-field shadow-none' />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className='mb-23'>
                          <label className='label-text'>Last Name <span className='highlight-req'>*</span></label>
                          <input type="text" name='firstname' className='form-control form-field shadow-none' />
                        </div>
                      </Col>
                  </Row>
                  <div className='mb-23'>
                    <label className='label-text'>Email Address <span className='highlight-req'>*</span></label>
                    <input type="email" name='email' className='form-control form-field shadow-none' />
                  </div>
                  <div className='mb-23'>
                    <label className='label-text'>Password <span className='highlight-req'>*</span></label>
                    <div className='position-relative'>
                      <input type="password" name='password' className='form-control form-field shadow-none' />
                      <button className='password-eye-btn'><FontAwesomeIcon icon={faEye}/></button>
                    </div>
                  </div>
                  <div className='mb-23'>
                    <label className='label-text'>Reenter Password <span className='highlight-req'>*</span></label>
                    <div className='position-relative'>
                      <input type="password" name='reenterpassword' className='form-control form-field shadow-none' />
                      <button className='password-eye-btn'><FontAwesomeIcon icon={faEye}/></button>
                    </div>
                  </div>
                  <div className='text-center'>
                    <button className='common-btn'>Create an account</button>
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

export default Register