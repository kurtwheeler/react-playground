import React from "react";

const FilterButton = ({filter, setFiltering, isPressed}) =>{
  function handleClick(e) {
    setFiltering(filter)
  }

  return (
    <button type="button" className="btn toggle-btn" aria-pressed={isPressed} onClick={handleClick}>
      <span className="visually-hidden">Show </span>
      <span>{filter}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
