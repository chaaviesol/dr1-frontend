import React from 'react'
import '../Pharmacyadmin/pharmacyadminregister2.css'

export default function Pharmacyadminregister2() {
  return (




    <div>
                
                <div className='hospitaladminregistration2 flex'>
     
     <h1>Pharmacy Registration</h1>

     <div className='hospitaladminregistration_first2 flex'>

        <div  className='image_card_ho_ad flex'>
        <h4>Add Photos</h4> 
<div className='image_card_ho_ad2 flex' >
            <div className='image_card_ho_ad_section flex'>

                <img src="images/hosptal1 (1).jpg" alt="" />
                <img src="images/hosptal1 (1).jpg" alt="" />
                <img src="images/hosptal1 (1).jpg" alt="" />

                <div className='image_card_ho_ad_add_image flex'>
                <i class="ri-add-line"></i>
                </div>
            
            </div> 
</div>
 </div>
</div>

<div className='pharmacyinput flex'>

    <div>

        <h4>License Number</h4>
        <input type="" />

    </div>

    <div>
    <h4>Type</h4>
        <input type="" />
    </div>

    <div>
       
    <h4>Timming</h4>
        <input type="" />
    
    </div>
</div>



     <div className='hospitaladminregistration_second flex' >
             
             <div>
                <h4>About</h4>
                <textarea name="" id="" cols="30" rows="10"></textarea>
             </div>

             <div>
                <h4>Address</h4>
                <textarea name="" id="" cols="30" rows="10"></textarea>
             </div>


     </div>

     <div className='ho_ad_re_button flex'>
        <a href=""><h4>Finish</h4></a>
     </div>

</div>               
</div>
  )
}
