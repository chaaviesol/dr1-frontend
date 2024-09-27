import React from 'react';

function AddButton({onClick,isAddingToCart}) {
  return (
    <button
    disabled={isAddingToCart}
    onClick={onClick}
      style={{
        width: '70px',
        height: '30px',
        padding: '10px 20px',
        backgroundColor: '#3A65FD',
        color: 'white',
        border: 'none',
        borderRadius: '15px',
        cursor: 'pointer',
        fontSize: '10px',
        letterSpacing: '-0.41px',
        lineHeight: '13px',
        fontWeight: '600',
      }}
    >
      Add
    </button>
  );
}

export default AddButton;
