import { useState } from "react";
import { toast } from "react-toastify";
import Header from "../Heading/Header";
import { useNavigate } from "react-router-dom";
import "./Marks.css";

const Marks = () => {
  const apibaseURL = process.env.REACT_APP_API_URL || "";
  const initialData = { semester: "", subject: "" };
  const [Data, setData] = useState(initialData);
  const [isDisable, setDisable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [Marks, setMarks] = useState([]);
  const Navigate = useNavigate();

  const removeMarks = () => {
    if (Marks.length === 0) {
      toast.error("No Marks Found..");
    } else {
      const inputPassword = window.prompt("Enter Your Password.");
      const tDeatils = JSON.parse(sessionStorage.getItem("TeacherDetail"));
      if (inputPassword === tDeatils.password) {
        try {
          let subject = subjectNameConverter(Data.subject);
          subject = subject + "_answer";
          const url = `${apibaseURL}/${subject}`;
          const response = fetch(url, { method: "DELETE" });
          setMarks([]);
          toast.info("Successfully Deleted.");
        } catch {
          toast.warning("Some Technical Problem Found..");
        }
      } else {
        toast.warning("Incorrect Password.");
      }
    }
  };

  const fetchMarks = async (subjectName) => {
    try {
      setLoading(true);
      let subject = subjectNameConverter(subjectName);
      subject = subject + "_answer";

      console.log(subject);

      const url = `${apibaseURL}/${subject}`;
      //   console.log(url);
      const response = await fetch(url);
      const result = await response.json();

      setMarks(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  function subjectNameConverter(subject) {
    subject = subject.toLowerCase();
    let res = "";
    for (let i = 0; i < subject.length; i++) {
      let ch = subject.charAt(i);
      if (ch === " ") {
        res += "_";
      } else {
        res += ch;
      }
    }

    return res;
  }

  const onChange = (event) => {
    const { name, value } = event.target;

    if (value >= "0" && value <= "9") {
      toast.warning("Select the Subject Name..");
      setDisable(false);
    } else {
      setDisable(true);
    }

    if (name === "subject") {
      fetchMarks(value);
    }

    setData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  return (
    <>
      <Header />

      <div className="postionFixed">
        <h1 className="studentMarksHeading">Student Marks</h1>

        <div className="center marksFilter">
          <div>
            <label>Semester Number: </label>
            <select name="semester" value={Data.semester} onChange={onChange}>
              <option value="#">***Choose Any One***</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>
          </div>

          <div>
            <label>Subject Name: </label>
            <select
              name="subject"
              value={Data.subject}
              onChange={onChange}
              disabled={isDisable}
            >
              <option value="#">***Choose Any One***</option>
              <option value={"Data Structure and Algorithm"}>DSA</option>
              <option value={"Basic Electric"}>Basic Electric</option>
              <option value={"CA"}>CA</option>
              <option value={"Math1"}>Math1</option>
              <option value={"Physics"}>Physics</option>
              <option value={"Environmental Science"}>EVS</option>
              <option value={"Biology"}>Biology</option>
              <option value={"Automata"}>Automata</option>
              
            </select>
          </div>

          <button className="removeMarksBtn" onClick={removeMarks}>
            Remove Marks
          </button>
        </div>
      </div>

      {loading === true ? (
        <h1 className="center" style={{color: "red"}}>Loading...</h1>
      ) : (
        <div className="marksContainer">
          <table>
            <tbody>
              <tr>
                <th>Student Name</th>
                <th>University Roll</th>
                <th>Department</th>
                <th>Marks</th>
              </tr>

              {Marks.map((elm, idx) => {
                return (
                  <tr key={idx}>
                    <td>{elm.name}</td>
                    <td>{elm.universityRoll}</td>
                    <td>{elm.department}</td>
                    <td>{elm.marks}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Marks;
