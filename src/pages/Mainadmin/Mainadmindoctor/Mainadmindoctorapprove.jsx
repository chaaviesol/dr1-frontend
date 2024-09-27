import axios from 'axios'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { port } from '../../../config'
import { toast } from 'react-toastify'

export default function Mainadmindoctorapprove() {
  const location = useLocation()
  const DetailedData = location?.state
  console.log("DetailedData>>>>", DetailedData)

  const ResponseAdmin = (which) => {
    let data = ''
    if (which === "reject") {
      data = {
        id: DetailedData?.id,
        status: "R"
      }
    } else {
      data = {
        id: DetailedData?.id,
        status: "Y"
      }
    }
    console.log("data>>>>>", data)
    if (data?.id && data?.status) {
      axios.post(`${port}/doctor/approvedr`, data).then((res) => {
        toast.success(res?.data?.message)
      }).catch(err => {
        toast.info(err?.response.data.message)
      })
    }

  }
  return (


    <>

      <div style={{ padding: '20px' }}>

        <div className="mainadmindoctordatas flex">

          <div className="mainadmindoctordatas_profile flex">

            <img className='mainadmindoctordatas_profile_photo' src="/images/doc.jpg" alt="" />

            <div className="mainadmindoctordatas_profile_data flex">

              <div className='flex'>  <h2>{DetailedData?.name}</h2> <h4 className='highlight_data' style={{ background: "#2A9D8F", color: "white", marginLeft: "10px" }}>{DetailedData?.sector}</h4></div>

              <h4 className='highlight_data' style={{ background: "#3A65FD", color: "white", }}>{DetailedData?.education_qualification}({DetailedData?.specialization})</h4>

              <div className='flex'>
                <div className='flex texticonset'>
                  <i class="fi fi-sr-call-outgoing"></i>
                  <h4 style={{ marginLeft: "10px" }}>+91 {DetailedData?.phone_no}</h4>

                </div>
                <div className='flex texticonset' style={{ marginLeft: "20px" }}>
                  <i class="fi fi-sr-city"></i>    <h4 style={{ marginLeft: "10px" }}>{DetailedData?.phone_office}</h4>
                </div>
              </div>

              <div className='flex texticonset'>
                <i class="fi fi-sr-envelope"></i>
                <h4 style={{ marginLeft: "10px" }}>{DetailedData?.email}</h4>
              </div>



            </div>
          </div>







        </div>

        <div className="mainadmindoctoraboutavail flex">

          <div className="mainadmindoctorabout">
            <h3 style={{ marginBottom: "1.3vw" }}>About</h3>
            <div className='flex' style={{ marginBottom: "1vw" }}><h4 className='highlight_data' style={{ background: "#2A9D8F", color: "white", }}>Allopathy</h4> <h4 className='highlight_data' style={{ marginLeft: "20px", background: "#FB8500", color: "white", }}>Epilepsy</h4></div>
            <h4 style={{ marginBottom: "1.3vw" }}>{DetailedData?.about}</h4>
          </div>

          <div className="mainadmindoctoraddress">

            <h3 style={{ marginBottom: "1.3vw" }}>Address</h3>

            <h4 style={{ marginBottom: "1vw" }}>{DetailedData?.address}</h4>
            <div className='flex adimindoctorpin'>
              <h4 style={{ background: "#3A65FD", color: "white" }}>{DetailedData.pincode}</h4>
            </div>

          </div>



        </div>

        <div className='admin_disable_section admin_disable_section2 flex'>
          <div className='flex'>
            <i class="fi fi-sr-exclamation"></i>
            <h4 style={{ marginLeft: "0.6vw" }} >Waiting for your response</h4>
          </div>

          <div className='admin_disable_button flex'>
            <h4 onClick={() => ResponseAdmin("reject")}>Reject</h4>
            <h4 onClick={() => ResponseAdmin("approve")} style={{ marginLeft: "0.6vw", backgroundColor: "rgb(42, 157, 143)" }}>Approve</h4>
          </div>
        </div>
      </div>

    </>

  )
}
