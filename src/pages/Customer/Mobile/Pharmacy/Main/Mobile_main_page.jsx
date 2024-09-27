import React from 'react'
import ProfileIcon from '../components/ProfileIcon'
import ScrollableButtonRow from '../components/ScrollableButtons'

export default function Mobile_main_page() {
  return (
    <div className='mobile_main_page'>
      <div className="row">
        <div className='col'>
          <img src="Mobile images/Icons/Vector.png" alt="location picker" />
        </div>
        <div className="col">
        <h1 className='headline'>Select your location</h1>
        <h2 className='location_name'>Kozhikode</h2>
        </div>
        <div className="col">
          <ProfileIcon/>
        </div>
      </div>
      <ScrollableButtonRow/>
    
    </div>
  )
}
