import Button from "../../Buttons/Button";
import ContentName from "../../Heading/ContentName";
import Header from "../../Heading/Header";
import "./QuestionDetailSection.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const QuestionDetailSection = () => {
  const Navigate = useNavigate();
  const initialData = { semester: "", subject: "", examStartTime: "" };
  const [Data, setData] = useState(initialData);

   // set the exam details into the (QuestionDetails key in session stroage..)
  const onClick = () => {
    if (Data.examStartTime && Data.semester && Data.subject) {
      sessionStorage.setItem("QuestionDetails", JSON.stringify(Data));
      Navigate("/questionsetsection");
    } else {
      toast.warning("Please fill all the fields..");
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  return (
    <>
      <Header />
      <div className="questionDetailSectionContainer">
        <ContentName title={"Question Details Set Section"} />
        <div className="innerQuestionDetailSectionContainer">
          <label>Semester Number: </label>
          <select name="semester" value={Data.semester} onChange={onChange}>
            <option value= "#">***Choose Any One***</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>

          <br />

          <label>Subject Name: </label>
          <select name="subject" value={Data.subject} onChange={onChange}>
            <option value= "#">***Choose Any One***</option>
            <option value={"Data Structure and Algorithm"}>DSA</option>
            <option value={"Basic Electric"}>Basic Electric</option>
            <option value={"CA"}>CA</option>
            <option value={"Math1"}>Math1</option>
            <option value={"Physics"}>Physics</option>
            <option value={"Environmental Science"}>EVS</option>
            <option value={"Biology"}>Biology</option>
            <option value={"Automata"}>Automata</option>
            {/* <option value={"Data Structure and Algorithm"}>DSA</option>
            <option value={"Computer Organization"}>CO</option>
            <option value={"CA"}>CA</option>
            <option value={"Design and Analysis of Algorithm"}>DAA</option>
            <option value={"Maths"}>Maths</option>
            <option value={"Environmental Science"}>EVS</option>
            <option value={"Biology"}>Biology</option>
            <option value={"Automata"}>Automata</option> */}
          </select>

          <br />

          <label>Exam Start Time: </label>
          <input
            type="time"
            name="examStartTime"
            value={Data.examStartTime}
            onChange={onChange}
          />

          <br />

          <Button name="Next" onClick={onClick} />
        </div>
      </div>
    </>
  );
};

export default QuestionDetailSection;
