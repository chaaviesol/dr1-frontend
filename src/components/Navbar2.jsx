import React, { useState } from 'react'
import '../components/Navbar2.css'


export default function Navbar2() {
    const [first, setfirst] = useState(false)

    const myFunction = () => {
        setfirst(first ? false : true)
    };


    return (
        <>
            <div className={first ?"topnav responsive":"topnav"} id="myTopnav">
                <a href="#home" className="active">
                    Home
                </a>
                <a href="#news">News</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
                <a href="javascript:void(0);" className="icon" onClick={myFunction} >
                    <i className="fa fa-bars" />
                </a>


            </div>
            <div style={{ paddingLeft: 16 }}>
                <h2>Responsive Topnav Example</h2>
                <p>Resize the browser window to see how it works.</p>
            </div>
        </>
    )
}
