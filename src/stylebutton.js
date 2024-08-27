

import React, { useState } from 'react';

const StyledButton = () => {
  
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  
  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: isClicked ? '#28a745' : isHovered ? '#007bff' : '#0056b3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsClicked(false); // Reset click effect when mouse leaves
      }}
      onClick={() => setIsClicked(true)}
    >
      Click Me!
    </button>
  );
};

export default StyledButton;
