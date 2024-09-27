import React from 'react'

export default function Rightnavbar({ data }) {

  return (


    <div className="hospitaladmin_left flex">
      <div className="hospitaladmin_image_title flex">
        <img src={data?.image || "images/doc.jpg"} alt="" />
        <h2>{data?.name}</h2>
        {/* <h2>Hospital Name</h2> */}

      </div>

      <div className="hospitaladmin_navlinks">

        <h4>Dashboard</h4>
        <h4>Hospital</h4>
        <h4>Doctors</h4>
        <h4>Settings</h4>

      </div>

      <div className="hospitaladmin_logout">

        <h2>Logout</h2>

      </div>
    </div>


  )
}
