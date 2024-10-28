import React, { useState } from 'react';
import "./billingStyles.css"

export default function Billing() {
    const [width, setWidth] = useState('50%'); // Initial width state

    const changeWidth = () => {
      setWidth((prevWidth) => (prevWidth === '50%' ? '150px' : '50%'));
    };

    const headings = ['Medicine Name', 'Batch Number', 'Frequency', 'BF/AF', 'Dose', 'Qty', 'HSN', 'MRP', 'Price']; // Custom column names

    const rows = Array.from({ length: 6 }, (_, rowIndex) => (
      <tr key={rowIndex}>
        {Array.from({ length: 9 }, (_, colIndex) => (
          <td key={colIndex}>
            <input type="text" className="billing-input" placeholder={`Row ${rowIndex + 1}, Col ${colIndex + 1}`} />
          </td>
        ))}
      </tr>
        ));

    const getWidth = (index) => {
        const widths = ['20%', '15%', '10%', '10%', '10%', '6%', '10%', '10%', '15%'];
        return widths[index];
      };

  return (
    <div className='billing-container'>
        <h1>Dr1 Billing</h1>

<div className="billingsection flex">


        <div className="billingleft flex" style={{ width }}>
              <img src="https://www.rbcinsurance.com/group-benefits/_assets-custom/images/prescription-drug-sample-receipt-en.jpg" alt="" />
              <div className='billingimagenumber flex'>
              <button><i class="ri-arrow-left-s-line"></i></button>
                   <div className='billingimagenumberdata flex'>1/2</div>
              <button><i class="ri-arrow-right-s-line"></i></button>
              </div>
              
              <button className='medmini' onClick={changeWidth}><i class="ri-fullscreen-exit-line"></i></button>
        </div>

        <div className="billingright">
        <div className="billingrighttop flex">

            <div className="billinginput">
                <h4>Patient Name</h4>
                <input type="text" placeholder='Enter Patient Name '/>
            </div>
            <div className="billinginput" >
                <h4>Name</h4>
                <input type="text" placeholder='Enter Contact Number' />
            </div>
            <div className="billinginput">
                <h4>Doctor Name</h4>
                <input type="text" placeholder='Enter Doctor Name ' />
            </div>
         
        </div>

<div className="billingaddress">
    <h4>Address</h4> 
    <input type="text" name="" id="" placeholder='Enter Address' />
</div>



<div className="billingmed">

    <h4>Medicine Details</h4>

   <table className="billing-table">
      <thead>
        <tr>
          {headings.map((heading, index) => (
            <th key={index} style={{ width: getWidth(index) }}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>



</div>


<div className="billingbutton flex">
    <button>Print Now</button>
</div>

        </div>
      
</div>

</div>
)
}