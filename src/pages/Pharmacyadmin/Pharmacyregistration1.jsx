import React, { useState } from 'react'

export default function Pharmacyregistration1() {
    const [fileName, setFileName] = useState('No file selected');

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
  
      if (selectedFile) {
        const isImage = selectedFile.type.startsWith('image/');
        if (isImage) {
          setFileName(selectedFile.name);
          // Process the image file or perform additional actions if needed
        } else {
          alert('Please select a valid image file.');
          // Optionally, you can clear the file input
          event.target.value = null;
        }
      } else {
        setFileName('No file selected');
      }
    };

  return (


<div>

<div>
               <div className="main-register flex">
          <div className="register-png-div">
            <img src="images/Group 72.png" alt="" />
          </div>
          <div className="registration-form">
            <div>
              <h1 style={{color: 'white'}}>Pharmacy Register</h1>
            </div>
  <div className='upload-image flex'>
            <label for="inputTag">
                 <h4  className='select-file'>Upload Photo</h4> 
              <input onChange={handleFileChange} id="inputTag" type="file"/>
            </label>
  
            <h4 id="fileNameDisplay">   {fileName} </h4>
  </div>
  
               {/* <label className="photo-upload">
               <h4>Upload Photo</h4>
                  <input type="file" />
               </div> */}


               <div  className='hospitalname_input'>
                 <h4>Pharmacy Name</h4>
                 <input type="text" />
               </div>
  
            <div className="register-input-section flex">


              <div className="register-left-section">
             
                <div>
                  <h4>Phone Number</h4>
                  <input type="text" />
                </div>
                <div>
                  <h4>Email</h4>
                  <input type="text" />
                </div>
              </div>
              <div className="register-right-section">
              
                <div>
                  <h4>Password</h4>
                  <input type="text" /> 
                </div>
                <div>
                  <h4>Confirm Password</h4>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="register-button-section flex">
              <a className="flex" href="/"><h4>Next</h4></a>
            </div>
          </div>
          <div className="register-png-div2 register-png-div flex">
            <img src="images/Group 73.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
