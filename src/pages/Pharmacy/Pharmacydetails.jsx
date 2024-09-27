import React from 'react'
import Headroom from 'react-headroom'
import Navbar from '../../components/Navbar'
import '../Pharmacy/pharmacydetails.css'
import Footer from '../../components/Footer'


export default function Pharmacydetails() {
  return (
    <div>



    <div className='pharmacy_web'>

    <Headroom>
<Navbar /> 
</Headroom>

    <div className="container-third">
             <div className="pharmacy-details-about flex">
               <div className="pharmacy-deatials-left">
                 <img src="images/ph1 (3).jpg" alt="" />
               </div>
               <div className="pharmacy-deatials-right flex">
                 <h2>New Emprire Pharmacy</h2>
                 <div className="pharmacy-deatails-star flex">
                   <i className="ri-star-fill" />
                   <i className="ri-star-fill" />
                   <i className="ri-star-fill" />
                   <i className="ri-star-fill" />
                   <i className="ri-star-fill" />
                 </div>
                 <div className="pharmacy-details-location flex">
                   <i className="ri-map-pin-fill" />
                   <h4>Shop No 3, Empire House, Irla, S V Road, Vile Parle West, Mumbai - 400056 (Opposite Irla Petrol Pump)</h4>
                 </div>
                 <div className="pharmacy-details-buttons flex">
                   <a className="flex pharmacy-details-buttons1" href><h4>9.00 am to 5 pm</h4></a>
                   <a className="flex pharmacy-details-buttons2" href><h4>Contact Now</h4></a>
                 </div>
               </div>
             </div>
             <div className="pharmacy-deatails-photos">
               <div className="pharmacy-details-heading">
                 <h2>Photos</h2>
               </div>



               <div className="pharmacy-details-imges wrapper">
               <div class="track">
                 <div className="logo"><img src="images/ph1 (1).jpg" alt="" /></div>
                 <div className="logo"><img src="images/ph1 (2).jpg" alt="" /></div>
                 <div className="logo"><img src="images/ph1 (4).jpg" alt="" /></div>
                 <div className="logo"><img src="images/ph1 (5).jpg" alt="" /></div>
                 <div className="logo"><img src="images/ph1 (5).jpg" alt="" /></div>
              
               </div>
               </div>



             </div>
             <div className="pharmacy-deatails-Services">
               <div className="pharmacy-details-heading">
                 <h2>Services</h2>
               </div>
               <div>
                 <div className="pharmacysevice-list flex">
                   <i className="ri-arrow-right-circle-fill" />
                   <h4>EXTEND A PRESCRIPTION</h4>
                 </div>
                 <div className="pharmacysevice-list flex">
                   <i className="ri-arrow-right-circle-fill" />
                   <h4>PRESCRIBE LABORATORY TESTS </h4>
                 </div>
                 <div className="pharmacysevice-list flex">
                   <i className="ri-arrow-right-circle-fill" />
                   <h4>PRESCRIBE A MEDICATION WHEN NO DIAGNOSIS IS NEEDED</h4>
                 </div>
                 <div className="pharmacysevice-list flex">
                   <i className="ri-arrow-right-circle-fill" />
                   <h4>ADJUST A PRESCRIPTION</h4>
                 </div>
                 <div className="pharmacysevice-list flex">
                   <i className="ri-arrow-right-circle-fill" />
                   <h4>QUALITY SERVICES TAKE TIME</h4>
                 </div>
               </div>
             </div>
           </div>
    </div>


{/* Pharmacy Mobile Screen */}

<div className="container pharmacy_mobile_screen">



{/* search box */}


{/*End search box */}

{/* Hero */}
<div className="Pha_Mob_img">
<img src="images/ph1 (3).jpg" alt="" />
</div>

{/*End Hero */}


{/* Datas */}

<h1>New Emprire Pharmacy</h1>

<div className='pharmacy_type'><h4>Allopathy</h4></div>

<div className='pharmacy_about'>
  <h4>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
  </h4>
</div>


<div className='pharmacy_location_mobile'>
   <i className="ri-map-pin-fill" />
   <h4>Shop No 3, Empire House, Irla, S V Road, Vile Parle West, Mumbai - 400056 (Opposite Irla Petrol Pump)</h4>
</div>

<a href=''>
<h4 className="time_button_mobile flex">9.00 am to 5 pm</h4>
</a>

<a href=''>
<h4 className="time_button_mobile2 flex">Contact now</h4>
</a>


{/*End Datas */}

{/* Photos */}



<div className="Pha_Mob_img">
   <img src="images/ph1 (1).jpg" alt="" />
</div>

<div className="Pha_Mob_img">
<img src="images/ph1 (2).jpg" alt="" />
</div>

<div className="Pha_Mob_img">
<img src="images/ph1 (3).jpg" alt="" />
</div>


{/*End Photos */}



</div>
{/*End Pharmacy Mobile Screen */}



<Footer />


    </div>
  )
}
