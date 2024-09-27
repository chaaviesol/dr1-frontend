import React, { useState, useRef, useEffect } from 'react';
import './editprofileselect.css';

const CustomSelect = ({ options, placeholder, value, onChange }) => {
  const [selected, setSelected] = useState(value || placeholder);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onChange(option);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  return (
    <div className="custom-select" ref={selectRef}>
      <div className={`select-selected ${isOpen ? 'active' : ''}`} onClick={toggleDropdown}>
        <span>{selected}</span>
      </div>
      {isOpen && (
        <div className="select-items">
          {options.map((option) => (
            <div
              key={option}
              className={selected === option ? 'same-as-selected' : ''}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;

