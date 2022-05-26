import react, { useState } from "react";
import "./DailogBox.css";
import { useNavigate } from "react-router-dom";

const DailogBox = () => {
  const Navigate = useNavigate();

  return (
    <>
      <div className="center dailogboxContainer" >
        <h2>Choose Any One of the follwoing...</h2>
        <button
          onClick={() => {
            Navigate("/questiondetailsection");
          }}
        >
          Question Set Section
        </button>
        <button
          onClick={() => {
            Navigate("/studentmarks");
          }}
        >
          Student Marks Section
        </button>
      </div>
    </>
  );
};

export default DailogBox;
