import React from 'react'
import '../Aboutus/about.css'
import Headroom from 'react-headroom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'


export default function About() {
  return (
    <div>

<Headroom>
<Navbar /> 
</Headroom>


        <div className="container-third about-us flex">
            <div className="about-us-image">
                  <img src="images/doc.jpg" alt="" />
            </div>

            <div className='about-para'>
<h1>ABOUT <span className='color-blue'> US</span></h1>
<h4>We believe in a patient-centric approach, tailoring treatments to address individual needs and concerns. Our practice emphasizes open communication and patient education, ensuring that you are well-informed and empowered to make informed decisions about your health.</h4>
<h4>We believe in a patient-centric approach, tailoring treatments to address individual needs and concerns. Our practice emphasizes open communication and patient education, ensuring that you are well-informed and empowered to make informed decisions about your health.</h4>
  
            </div>
        </div>

<Footer />
    </div>
  )
}
