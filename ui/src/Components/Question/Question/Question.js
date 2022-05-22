import "./Question.css";

const Question = (props) => {
  const { question, opt1, opt2, opt3, opt4, answer } = props.data;

  return (
    <>
      <div className="mainQuestionContainer">
        <p className="question">
          <span>{props.questionNumber}). </span>
          {question}
        </p>
        <div className="optionContainer">
          <ol>
            <li>
              <input
                type="radio"
                id="a"
                name="option"
                onClick={props.onOptionChange}
              />
              <label htmlFor="a">{opt1}</label>
            </li>
            <li>
              <input
                type="radio"
                id="b"
                name="option"
                onClick={props.onOptionChange}
              />
              <label htmlFor="b">{opt2}</label>
            </li>
            <li>
              <input
                type="radio"
                id="c"
                name="option"
                onClick={props.onOptionChange}
              />
              <label htmlFor="c">{opt3}</label>
            </li>
            <li>
              <input
                type="radio"
                id="d"
                name="option"
                onClick={props.onOptionChange}
              />
              <label htmlFor="d">{opt4}</label>
            </li>
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
