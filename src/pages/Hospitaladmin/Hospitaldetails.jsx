import React from 'react'
import Rightnavbar from '../../components/Rightnavbar'
import Hospitaladminnotification from '../../components/Hospitaladminnotification'
import '../Hospitaladmin/hospitaldetails.css'


export default function Hospitaldetails() {
  return (
    <div>


      <div className="hospitaladmin-main flex">


        <Rightnavbar />

        <div className="hospitaladmin_right">

          <Hospitaladminnotification />


          <div className='hospital_admin_details_section flex'>

            <div className='hospital_admin_details_image'>

              <img src="images/hosptal1 (1).jpg" alt="" />




            </div>

            <div className="hospital-right-admin flex">
              <div className='hospital_admin_details_data'>



                <h2>New Empires Hospital</h2>
                <h4>Dr.Anil Yadav says "I am a hard working and have good clinical experience and work in prestigious institute AIIMS and Safdarjung Hospital".</h4>




              </div>

              <div className='hospital_admin_details_contact flex'>
                <h4><i class="ri-phone-fill"></i> +91 89753 89399 </h4>

                <h4><i class="ri-mail-fill"></i> empireshospital@gmail.com</h4>
              </div>

            </div>
          </div>

          <div hospital_admin_data_section>


          </div>










        </div>


      </div>




    </div>
  )
}
