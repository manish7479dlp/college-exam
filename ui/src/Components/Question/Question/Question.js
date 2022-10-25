import { useEffect } from "react";
import "./Question.css";

const Question = (props) => { 
    const { question, opt1, opt2, opt3, opt4} = props.data;
    let preCheckedOption = JSON.parse(localStorage.getItem(props.questionNumber));

    if(preCheckedOption) {
      preCheckedOption = preCheckedOption.answer;
    }

  
    

    const onChange = () => {
      // defalutChecked();
      console.log("hii");
    }
    
  return (
    <>
      <div className="mainQuestionContainer">
        <p className="question">
          <span>{props.questionNumber}). </span>
          {question}
        </p>
        <div className="optionContainer">
          <ol >
              
          
            <li>
              <input
                type="radio"
                id="a"
                name="option"
                onClick={props.onOptionChange}
                checked = {preCheckedOption === "a" ? true : !preCheckedOption ? true : false}
                onChange = {() => {}}
              />
              <label htmlFor="a">{opt1}</label>
            </li>
            <li>
              <input
                type="radio"
                id="b"
                name="option"
                onClick={props.onOptionChange}
                checked = {preCheckedOption === "b" ? true : !preCheckedOption ? true : false}
                onChange = {() => {}}
              />
              <label htmlFor="b">{opt2}</label>
            </li>
            <li>
              <input
                type="radio"
                id="c"
                name="option"
                onClick={props.onOptionChange}
                checked = {preCheckedOption === "c" ? true : !preCheckedOption ? true : false}
                onChange = {() => {}}
              />
              <label htmlFor="c">{opt3}</label>
            </li>
            <li>
              <input
                type="radio"
                id="d"
                name="option"
                onClick={props.onOptionChange}
                checked = {preCheckedOption === "d" ? true : !preCheckedOption ? true : false}
                onChange = {() => {}}
              />
              <label htmlFor="d">{opt4}</label>
            </li>

            <input
                type="radio"
                // id="x"
                name="option"
                // onClick={props.onOptionChange}
                checked = {!preCheckedOption ? true : false}
                onChange = {()=>{}}
                style = {{display : "none"}} 
              />
          </ol>
        </div>

        {/* Question Navigation Button code */}

        <div className="center questionNavigationBtn">
          {props.questionNumber === 1 ? null : (
            <button onClick={props.preQuestion} className="preBtn">
              Previous
            </button>
          )}

          <button
            onClick={() => {
              props.nextQuestion(props.questionNumber);
            }}
            className="nextBtn"
          >
            {props.questionNumber === props.totalQuestion ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Question;
