import React from 'react';

const NavItem = ({ title, subtitle, iconClass, onClick }) => (
  <div className="flex mob-profile-nav" onClick={onClick}>
    <div className="mob-profile-nav-icon-data flex">
      <div className="flex mob-profile-nav-icon">
        <i className={iconClass}></i>
      </div>
      <div>
        <h3
         style={{
            fontWeight:"600"
        }} 
        >{title}</h3>
        <h4
        style={{
            color:"#777777"
        }} 
        >{subtitle}</h4>
      </div>
    </div>
    <div className="mob-profile-nav-icon2 flex">
      <i className="ri-arrow-right-line"></i>
    </div>
  </div>
);

export default NavItem;