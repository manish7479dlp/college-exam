import "./QuestionItem.css";
const QuestionItem = (props) => {
    const { question, opt1, opt2, opt3, opt4 , answer} = props.data;


    return (
        <div className="QuestionItemContainer">
            <p className="actualQuestion">
                <span>{props.questionNumber})</span> {question}
            </p>
            <p className="actualQuestionOption">
                <span>A.)</span> {opt1}
            </p>
            <p className="actualQuestionOption">
                <span>B.)</span> {opt2}
            </p>
            <p className="actualQuestionOption">
                <span>C.)</span> {opt3}
            </p>
            <p className="actualQuestionOption">
                <span>D.)</span> {opt4}
            </p>
            <p className="correctOption">{answer}</p>

            <div className="center QuestionItemOperationContainer">
                <button className="deleteBtn" onClick={() => {props.deleteQuestion(props.data._id)}}>
                    Delete
                </button>
                <button className="editBtn" onClick={() => {props.editQuestion(props.data)}}>
                    Edit
                </button>
            </div>
        </div>
    );
};

export default QuestionItem;
