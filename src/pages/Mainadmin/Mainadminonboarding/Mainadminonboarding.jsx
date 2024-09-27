import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { port } from '../../../config'
import { useNavigate } from 'react-router-dom'

export default function Mainadminonboarding() {
  const [PendingDatas, setPendingDatas] = useState([])
  const [initialData, setinitialData] = useState([])
  useEffect(() => {
    axios.get(`${port}/user/getunapproveuser`).then((res) => {
      setPendingDatas(res?.data?.data)
      setinitialData(res?.data?.data)
    })
  }, [])

  const navigate = useNavigate()

  const SearchData = (e) => {
    const { name, value } = e?.target;
    let tempData = initialData;
    console.log(value)
    if (!value) {
      setPendingDatas(PendingDatas);
      return;
    }

    tempData = tempData.filter(item => {
      let itemValue = item?.[name];
      if (itemValue !== undefined && itemValue !== null) {
        // Convert itemValue to string for comparison
        itemValue = itemValue.toString().toLowerCase();
        return itemValue.includes(value.toLowerCase());
      }
      return false;
    });

    setPendingDatas(tempData);
  };
  const linkPage = (data) => {
    console.log("data>>>", data)
    if (data?.type === "Doctor") {
      navigate("/mainadmindoctorapprove", { state: data })
    } else if (data?.type === "Hospital") {
      navigate("/mainadminhospitalapprove", { state: data })

    } else if (data?.type === "Lab") {
      navigate("/mainadminlabsapprove", { state: data })

    }

  }
  return (
    <>

      <div className="mainadmindoctordatas_chart mainadmindoctordatas_chart_doctor flex">


        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart10 flex">

          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon10 flex">
            <i class="fi fi-sr-hospital"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>200</h2>
            <h4>Approved</h4>
          </div>


        </div>

        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 mainadmindoctordatas_chart11  flex">

          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon11 flex">
            <i class="ri-rest-time-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>200</h2>
            <h4>Pending</h4>
          </div>
        </div>

        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 mainadmindoctordatas_chart12 flex">

          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon12 flex">
            <i class="ri-close-circle-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>200</h2>
            <h4>Rejected</h4>
          </div>
        </div>


      </div>


      <h3 style={{ marginBottom: "1.3vw", marginTop: "1.3vw" }}>Onboarding</h3>
      <table className='doctortable'>
        <tr className='doctortableTr'>
          <th>No</th>
          <th className='OnBoardingtableTh'>Type
            <input type="text" onChange={SearchData} name='type' placeholder='Search Type' />
          </th>
          <th>Name
            <input type="text" onChange={SearchData} name='name' placeholder='Search Name' />

          </th>
          <th style={{ display: 'flex', flexDirection: 'column' }}>Number
            <input type="text" onChange={SearchData} name='phone_no' placeholder='Search Number' />

          </th>
          <th>Pincode
            <input type="text" onChange={SearchData} name='pincode' placeholder='Search Pincode' />
          </th>
          <th>Registration Date
            <input type="text" onChange={SearchData} name='Datetime' placeholder='Search Pincode' />
          </th>
          <th>Status
            <input type="text" onChange={SearchData} name='status' placeholder='Search Status' />
          </th>
        </tr>
        {PendingDatas.map((ele, index) =>

          <tr onClick={() => linkPage(ele)}>
            <td>{index + 1}</td>
            <td>{ele?.type}</td>
            <td>{ele?.name}</td>
            <td>{ele?.phone_no}</td>
            <td>{ele?.pincode}</td>
            <td>{ele?.datetime}</td>
            <td>{ele?.status}</td>
          </tr>
        )}



      </table>


    </>
  )
}
