import React from 'react'
import { Row, Col } from 'react-bootstrap'
import authimg from  '../../assets/img/auth-img.png'
import logo from '../../assets/img/logo.svg'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
const Login = () => {
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
                  <h2 className='auth-heading'>Login</h2>
                  <p className='auth-text'>Please login your account</p>
                </div>
                <form>
                  <div className='mb-23'>
                    <label className='label-text'>Email Address <span className='highlight-req'>*</span></label>
                    <input type="email" name='email' className='form-control form-field shadow-none' />
                  </div>
                  <div className='mb-40'>
                    <label className='label-text'>Password <span className='highlight-req'>*</span></label>
                    <div className='position-relative'>
                      <input type="password" name='password' className='form-control form-field shadow-none' />
                      <button className='password-eye-btn'><FontAwesomeIcon icon={faEye}/></button>
                    </div>
                  </div>
                  <div className='text-end mb-40'>
                    <Link to={" "} className='forgot-link'>Forgot Password?</Link>
                  </div>
                  <div className='text-center'>
                    <button className='common-btn'>Login</button>
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

export default Login