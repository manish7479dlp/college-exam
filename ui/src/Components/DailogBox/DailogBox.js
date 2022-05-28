import react, { useState } from "react";
import "./DailogBox.css";
import { useNavigate } from "react-router-dom";

const DailogBox = ({opt1 , opt2 , opt1Url , opt2Url}) => {
  const Navigate = useNavigate();

  return (
    <>
      <div className="center dailogboxContainer" >
        <h2>Choose Any One of the follwoing...</h2>
        <button
          onClick={() => {
            Navigate(opt1Url);
          }}
        >
          {opt1}
        </button>
        <button
          onClick={() => {
            Navigate(opt2Url);
          }}
        >
          {opt2}
        </button>
      </div>
    </>
  );
};

export default DailogBox;
