import { useState } from "react";
import { toast } from "react-toastify";
import Header from "../Heading/Header";
import { useNavigate } from "react-router-dom";
import "./Marks.css";

const Marks = () => {
    const authCheckName = "teacher";
    const apibaseURL = process.env.REACT_APP_BASE_URL || "";
    const initialData = { semester: "", subject: "" };
    const [Data, setData] = useState(initialData);
    const [isDisable, setDisable] = useState(true);
    const [loading, setLoading] = useState(true);
    const [Marks, setMarks] = useState([]);
    const Navigate = useNavigate();

    const removeMarks = async () => {
        if (Marks.length === 0) {
            toast.error("No Marks Found..");
        } else {
            const confirmation = window.confirm(
                "Do you really want to delete the marks.."
            );

            if (confirmation) {
                try {
                    let subject = subjectNameConverter(Data.subject);
                    subject = subject + "-result";
                    const url = `${apibaseURL}/${subject}`;
                    const response = await fetch(url, { method: "DELETE" });
                    const result = await response.json();

                    if (result.status) {
                        toast.success(result.message);
                        setMarks([]);
                    } else {
                        toast.error(result.message);
                    }
                } catch {
                    toast.warning("Some Technical Problem Found..");
                }
            }
        }
    };

    const fetchMarks = async (subjectName) => {
        try {
            setLoading(true);
            let subject = subjectNameConverter(subjectName);
            subject = subject + "-result";

            console.log(subject);

            const url = `${apibaseURL}/${subject}`;
            //   console.log(url);
            const response = await fetch(url);
            const result = await response.json();

            if (result.status) {
                setMarks(result.response);
            } else {
                toast.warning("unable to fetch result.");
                setMarks([]);
            }

            setLoading(false);
        } catch (error) {
            setMarks([]);
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
                res += "-";
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
        <div className="studentMarksMainContainer">
            {/* <Header /> */}
            <div className="positionFixed">
                <h1 className="studentMarksHeading">Student Marks</h1>

                <div className="center marksFilter">
                    <div>
                        <label>Semester Number: </label>
                        <select
                            name="semester"
                            value={Data.semester}
                            onChange={onChange}
                        >
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

                            {Data.semester === "1" && (
                                <optgroup label="1st-Sem-Subject">
                                    <option value={"Physics"}>Physics</option>
                                    <option value={"Maths"}>Maths</option>
                                    <option
                                        value={"Basic Electrical Engineering"}
                                    >
                                        Basic Electrical
                                    </option>
                                </optgroup>
                            )}
                            {Data.semester === "2" && (
                                <optgroup label="2nd-Sem-Subject">
                                    <option value={"Chemistry"}>
                                        Chemistry
                                    </option>
                                    <option value={"Maths"}>Maths</option>
                                    <option value={"English"}>English</option>
                                    <option value={"C Language"}>
                                        C Language
                                    </option>
                                </optgroup>
                            )}

                            {Data.semester === "3" && (
                                <optgroup label="3rd-Sem-Subject">
                                    <option value={"Maths"}>Maths</option>
                                    <option
                                        value={"Data Structure and Algorithm"}
                                    >
                                        DSA
                                    </option>
                                    <option value={"Economics"}>
                                        Economics
                                    </option>
                                    <option value={"Digital Electronics"}>
                                        Digital Electronics
                                    </option>
                                    <option value={"Computer Organization"}>
                                        Computer Organization
                                    </option>
                                </optgroup>
                            )}

                            {Data.semester === "4" && (
                                <optgroup label="4th-Sem-Subject">
                                    <option value={"Environmental Science"}>
                                        EVS
                                    </option>
                                    <option value={"Biology"}>Biology</option>
                                    <option
                                        value={
                                            "Design and Analysis for Algorithm"
                                        }
                                    >
                                        DAA
                                    </option>
                                    <option value={"Automata Theory"}>
                                        Automata Theory
                                    </option>
                                    <option value={"Computer Architecture"}>
                                        Computer Architecture
                                    </option>
                                    <option value={"Discrete Mathematics"}>
                                        Discrete Mathematics
                                    </option>
                                </optgroup>
                            )}

                            {Data.semester === "5" && (
                                <optgroup label="5th-Sem-Subject">
                                    <option value={"CA"}>CA</option>
                                    <option value={"oops"}>OOPS</option>
                                    <option value={"Automata"}>Automata</option>
                                </optgroup>
                            )}

                            {Data.semester === "6" && (
                                <optgroup label="6th-Sem-Subject">
                                    <option value={"CA"}>CA</option>
                                </optgroup>
                            )}

                            {Data.semester === "7" && (
                                <optgroup label="7th-Sem-Subject">
                                    <option value={"Biology"}>Biology</option>
                                    <option value={"Automata"}>Automata</option>
                                </optgroup>
                            )}

                            {Data.semester === "8" && (
                                <optgroup label="8th-Sem-Subject">
                                    <option value={"Environmental Science"}>
                                        EVS
                                    </option>
                                </optgroup>
                            )}
                        </select>
                    </div>

                    {!sessionStorage.getItem(authCheckName) && (
                        <button
                            className="removeMarksBtn"
                            onClick={removeMarks}
                        >
                            Remove Marks
                        </button>
                    )}
                </div>
            </div>
            {!loading && Marks.length === 0 && (
                <h1 className="center" style={{ color: "red", marginTop: 80, fontSize: 80 }}>
                    No Result Found
                </h1>
            )}
            {loading === true && (
                <h1 className="center" style={{ color: "red", marginTop: 80, fontSize: 80 }}>
                    Loading...
                </h1>
            )}
            {!loading && Marks.length > 0 && (
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
        </div>
    );
};

export default Marks;
