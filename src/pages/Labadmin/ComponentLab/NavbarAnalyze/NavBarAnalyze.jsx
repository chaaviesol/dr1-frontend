import React from 'react'
import "./NavBarAnalyze.css"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
export const NavBarAnalyze = () => {
    const navigate=useNavigate()
    return (
        <>
            <div className='AnlzAdminTop'>
                <button className='AnlzAdminTopHomeBtn'>
                    <HomeOutlinedIcon id="AnlzAdminTopHomeBtnIcon" />Home
                </button>
                <div style={{cursor:"pointer"}} onClick={()=>navigate("/login")} className='AnlzAdminTopSecondSec'>
                    <p>Logout</p>
                    <LogoutIcon id="LabAdminProfileLogoutSecIcon" />
                </div>
            </div>
        </>
    )
}
