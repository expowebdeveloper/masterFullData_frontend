import React from 'react'
import errorImg from '../../../assets/img/warning-icon.gif'
const NoDataFound = () => {
  return (
    <div className='no-data mt-5'><img src={errorImg} />No Property Selected</div>
  )
}

export default NoDataFound