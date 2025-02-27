import React from 'react'

const BooleanButton = ({ disable,booleanValue, onClick }) => {
    return (
      <button
        className={`btn ${booleanValue ? "btn-outline-primary" : "btn-outline-danger"} rounded-0 w-100`}
        onClick={onClick}
        disabled={disable}
      >
        {booleanValue ? "Yes" : "No"}
      </button>
    );
  };
  
  export default BooleanButton;
  