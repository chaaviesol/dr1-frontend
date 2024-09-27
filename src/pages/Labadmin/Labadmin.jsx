import React from 'react'
import Hospitaladminnotification from '../../components/Hospitaladminnotification'
import Rightnavbar from '../../components/Rightnavbar'

export default function Labadmin() {
  return (
    <div>

<div className="hospitaladmin-main flex">



<Rightnavbar />

<div className="hospitaladmin_right"> 


  <Hospitaladminnotification />

  <div className='manage flex'>
    <div className="hospitaladmin_title flex">
        <h1>Manage Your</h1>
        <h1 className='color-blue'>Lab</h1>
    </div>

    <div className="hospitaladmin_cards flex">

        <a href='' className="hospitaladmin_card hospitaladmin_card1 flex">

          <div>
                <div className='hospitaladmin_number hospitaladmin_number1 flex' ><h2>24</h2></div>
          </div>

<div>
<h4>Enquiries</h4>
</div>
        </a>

        <a href='' className="hospitaladmin_card hospitaladmin_card2 flex">

<div>
<div className='hospitaladmin_number hospitaladmin_number2 flex' ><h2>24</h2></div>
</div>

<div>
<h4>Enquiries</h4>
</div>
</a>


    <a href='' className="hospitaladmin_card hospitaladmin_card3 flex">

          <div>
                <div className='hospitaladmin_number hospitaladmin_number3 flex' ><h2>24</h2></div>
          </div>

<div>
<h4>Enquiries</h4>
</div>
        </a>   


    </div>

  </div>

<div className='hospitaladmin_images flex' >

<img src="images/hos.jpeg" alt="" />
<img src="images/hosptal1 (1).jpg" alt="" />
<img src="images/hosptal1 (2).jpg" alt="" />
<img src="images/hosptal1 (3).jpg" alt="" />
</div>


</div>


</div>


    </div>



  )
}
