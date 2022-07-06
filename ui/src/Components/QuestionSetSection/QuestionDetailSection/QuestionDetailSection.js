import Button from "../../Buttons/Button";
import ContentName from "../../Heading/ContentName";
import Header from "../../Heading/Header";
import "./QuestionDetailSection.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const QuestionDetailSection = () => {
  const apibaseURL = process.env.REACT_APP_API_URL || "";
  const studentDetails = JSON.parse(sessionStorage.getItem("StudentDetail"));

  const Navigate = useNavigate();
  const initialData = { semester: "", subject: "", examStartTime: "" , examDate: "" };
  const [Data, setData] = useState(initialData);

   // set the exam details into the (QuestionDetails key in session stroage..)
  const onClick =  () => {
    if (Data.examStartTime && Data.semester && Data.subject && Data.examDate) {
      const department =  JSON.parse(sessionStorage.getItem("TeacherDetail")).department;
      sessionStorage.setItem("QuestionDetails", JSON.stringify({...Data , department }));
      setExamDetails();
      Navigate("/questionsetsection");
    } else {
      toast.warning("Please fill all the fields..");
    }
  };

  const setExamDetails = async () => {
    try {
      const url = `${apibaseURL}/${"exam_details"}`;
      const department =  JSON.parse(sessionStorage.getItem("TeacherDetail")).department;
      const finalData = {...Data , department};
      // console.log(finalData);
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });
      if (response.status !== 200) {
        toast.warning("Question is not Added..");
        console.log(response);
      } else {
        toast.success("Question Details Added Successfully.");
        setData(initialData);
      }
    } catch(err) {
      console.log(err);
    }
  }

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
            <option value={"Computer Architecture"}>CA</option>
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

          <label>Exam Date: </label>
          <input
            type="date"
            name="examDate"
            value={Data.examDate}
            onChange={onChange}
          />
          <br/>

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
