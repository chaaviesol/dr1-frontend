import React from 'react'
import Mainadminsidebar from '../../../components/Mainadminsidebar/Mainadminsidebar'
import Mainadminnavbar from '../../../components/Mainadminnavbar/Mainadminnavbar'

export default function Mainadminlabsapprove() {
  return (
 
                   <>

                    
               <div className="mainadmindoctordatas flex">
    
               <div className="mainadmindoctordatas_profile flex">
    
                     <img className='mainadmindoctordatas_profile_photo' src="/images/doc.jpg" alt="" />
    
                            <div className="mainadmindoctordatas_profile_data flex">
    
                              <div className='flex'>  <h2>Prime Medical Labs</h2> <h4 className='highlight_data' style={{background:"#2A9D8F", color:"white",marginLeft:"10px"}}>10:00 AM - 04:00 PM</h4></div>
    
                                <h4 className='highlight_data' style={{background:"#3A65FD", color:"white",}}>LIP874657467</h4>
    
                                <div className='flex'>
                                    <div className='flex texticonset'>
                                        <i class="fi fi-sr-call-outgoing"></i>
                                        <h4 style={{marginLeft:"10px"}}>+91 9878898346</h4>
    
                                    </div>
                                   
                                </div>
    
                                <div className='flex texticonset'>
                                    <i class="fi fi-sr-envelope"></i>
                                    <h4 style={{marginLeft:"10px"}}>anilyadhav@gmail.com</h4>
                                </div>
                                
    
    
                            </div>
    
    
                
             </div>
    
            
    
    
    
                            
                
               </div>
    
    
               <div className="photosdivadmin">
               <h3 style={{marginBottom:"1.3vw"}}>Images</h3>
               <div className="photosdivadminsection flex">
                       
                       <img  src="/images/doc.jpg" alt="" />
                       <img  src="/images/doc.jpg" alt="" />
                       <img  src="/images/doc.jpg" alt="" />
    
    
               </div>
               </div>
    
               <div className="mainadmindoctoraboutavail flex">
    
               <div className="mainadmindoctorabout ">
    
    
    <h3 style={{marginBottom:"1.3vw"}}>About</h3>
    {/* <div className='flex' style={{marginBottom:"1vw"}}><h4 className='highlight_data' style={{background:"#2A9D8F", color:"white",}}>Allopathy</h4> <h4 className='highlight_data' style={{marginLeft:"20px", background:"#FB8500", color:"white",}}>Epilepsy</h4></div> */}
    
    
    <h4 style={{marginBottom:"1.3vw"}}>Open-source neutral-style system symbols elaborately crafted for designers and developers.
    All of the icons are free for both personal and commercial use.</h4>
    <h3 style={{marginBottom:"1.3vw"}}>Address</h3>  
    
    <h4 style={{marginBottom:"1vw"}}>Fifth Floor Arcadia Market Sec 49 South City 2, Gurgaon</h4>
    <div className='flex adimindoctorpin'>
        <h4 style={{background:"#3A65FD" , color:"white"}}>986744</h4>
        <h4 style={{background:"#F3F6FF" , color:"#6B8CFE"}}>Kozhikode</h4>
    </div>
    </div>
    
    <div className="mainadmindoctoravilability mainadmindoctoravilability2">
    
    
    
    <div className='admin_fea_avai flex'>
       
        <div className='admin_fea_avai_left'>
        <h3 style={{marginBottom:"1.3vw"}}>Features</h3>
        <h4 style={{marginBottom:"1.3vw"}}><i class="ri-arrow-right-circle-fill"></i>Features 1</h4>
        <h4 style={{marginBottom:"1.3vw"}}><i class="ri-arrow-right-circle-fill"></i>Features 1</h4>
        <h4 style={{marginBottom:"1.3vw"}}><i class="ri-arrow-right-circle-fill"></i>Features 1</h4>
        <h4 style={{marginBottom:"1.3vw"}}><i class="ri-arrow-right-circle-fill"></i>Features 1</h4>
        </div>
    
        <div className='admin_fea_avai_right'>
        <h3 style={{marginBottom:"1.3vw"}}>Services</h3>
    
        <h4 style={{marginBottom:"1.3vw"}}><i class="ri-arrow-right-circle-fill"></i>Features 1</h4>
        <h4 style={{marginBottom:"1.3vw"}}><i class="ri-arrow-right-circle-fill"></i>Features 1</h4>
        <h4 style={{marginBottom:"1.3vw"}}><i class="ri-arrow-right-circle-fill"></i>Features 1</h4>
        <h4 style={{marginBottom:"1.3vw"}}><i class="ri-arrow-right-circle-fill"></i>Features 1</h4>
        </div>
    
    
    
    
    </div>
    
    
    
                
    </div>
    
    
    
    
    
    
    
    
    
    
    
               </div>
    
<div className='admin_disable_section admin_disable_section2  flex'>
    <div className='flex'>
   <i class="fi fi-sr-exclamation"></i>
   <h4 style={{marginLeft:"0.6vw"}} >Waiting for your response</h4>
   </div>

   <div className='admin_disable_button flex'>
     <h4>Reject</h4>
     <h4 style={{marginLeft:"0.6vw", backgroundColor:"rgb(42, 157, 143)" }}>Approve</h4>
   </div>
   </div>
</>
  )
}
