import React, { useState, useRef, useEffect } from "react";
import "./customdropdown.css"; // Custom styles

const CustomDropdown = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false); // Toggle dropdown
  const [selected, setSelected] = useState(null); // Track selected option
  const dropdownRef = useRef(null); // For closing dropdown when clicked outside

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle selecting an option
  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false); // Close dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="dropdown-container4" ref={dropdownRef}>
      <div className="dropdown-header4" onClick={toggleDropdown}>
        {selected ? selected : placeholder}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
          &#9662;
        </span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-list-item4"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
