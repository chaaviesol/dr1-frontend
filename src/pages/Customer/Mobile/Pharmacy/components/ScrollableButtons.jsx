import React, { useState } from 'react';
import styled from 'styled-components';
import './scrollableButtons.css';

// const ScrollableRow = styled.div`
//   display: flex;
//   overflow-x: auto;
//   white-space: nowrap;
//   padding: 10px;
// `;

// const StyledButton = styled.button`
//   display: flex;
//   align-items: center;
//   background-color: ${(props) => (props.isSelected ? '#f' : 'white')};
//   color: ${(props) => (props.isSelected ? 'blue' : 'black')};
//   border: 1px solid #ccc;
//   margin-right: 10px;
//   cursor: pointer;

//   &:focus {
//     outline: none;
//   }

//   & > span {
//     margin-left: 5px;
//   }
// `;



const buttonsData = [
  { id: 1, name: 'Allopathy' },
  { id: 2, name: 'Specialization' },
  { id: 3, name: 'Gender' },
  { id: 4, name: 'Experience' },
  { id: 5, name: 'Allopathy2' },
  { id: 6, name: 'Specialization2' },
];

export default function ScrollableButtonRow() {
  const [selectedButtonId, setSelectedButtonId] = useState(null);

  const handleClick = (id) => {
    setSelectedButtonId(id);
  };

  return (
    <div className="scrollablerow">
      {buttonsData.map((button) => (
        <div className="styled_button">
          <span>{button.name}</span>
          <i class="ri-arrow-down-s-fill"></i>
        </div>

        // <StyledButton
        //   key={button.id}
        //   isSelected={button.id === selectedButtonId}
        //   onClick={() => handleClick(button.id)}
        // >
        //   {/* <FaUser /> */}
        //   <span>{button.name}</span>
        // </StyledButton>

      ))}
    </div>
  );
}
