import Button from "../Buttons/Button";
import ContentName from "../Heading/ContentName";
import "./QuestionDetailSection.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditExamDetails = ({changeTab}) => {
    const apibaseURL = `${process.env.REACT_APP_BASE_URL}/exam-details`
    const questionDetailsKey = "examDetails"

    const [isDisable, setDisable] = useState(true);

    const Navigate = useNavigate();
    const initialData = {
        semester: "",
        subject: "",
        examStartTime: "",
        examDuration: "",
        examDate: "",
    };
    const [Data, setData] = useState(initialData);

    const onClick = async () => {
        try {
            const response = await fetch(apibaseURL , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Data)
            })

            const result = await response.json();

            if(result.status) {
                toast.success(result.message);
                setData(initialData)
                sessionStorage.setItem(questionDetailsKey , JSON.stringify(Data));
                changeTab(2)
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onChange = (event) => {
        const { name, value } = event.target;

        if (value >= "0" && value <= "9") {
            //   toast.warning("Select the Subject Name..");
            setDisable(false);
        } else {
            setDisable(true);
        }

        setData((pre) => {
            return { ...pre, [name]: value };
        });
    };

    return (
        <>
            {/* <Header /> */}
            <div className="questionDetailSectionContainer">
                <ContentName title={"Exam Details Edit Section"} />
                <div className="innerQuestionDetailSectionContainer  ">
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

                    <br />

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
                                <option value={"Basic Electrical Engineering"}>
                                    Basic Electrical
                                </option>
                            </optgroup>
                        )}
                        {Data.semester === "2" && (
                            <optgroup label="2nd-Sem-Subject">
                                <option value={"Chemistry"}>Chemistry</option>
                                <option value={"Maths"}>Maths</option>
                                <option value={"English"}>English</option>
                                <option value={"C Language"}>C Language</option>
                            </optgroup>
                        )}

                        {Data.semester === "3" && (
                            <optgroup label="3rd-Sem-Subject">
                                <option value={"Maths"}>Maths</option>
                                <option value={"Data Structure and Algorithm"}>
                                    DSA
                                </option>
                                <option value={"Economics"}>Economics</option>
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
                                    value={"Design and Analysis for Algorithm"}
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

                    <br />

                    <label>Exam Date: </label>
                    <input
                        type="date"
                        name="examDate"
                        value={Data.examDate}
                        onChange={onChange}
                    />
                    <br />

                    <label>Exam Start Time: </label>
                    <input
                        type="time"
                        name="examStartTime"
                        value={Data.examStartTime}
                        onChange={onChange}
                    />

                    <br />

                    <label>Exam Duration: </label>

                    <select
                        value={Data.examDuration}
                        name="examDuration"
                        onChange={onChange}
                    >
                        <option value="#">***Choose Any One***</option>
                        <option value="20">20 minutes</option>
                        <option value="25">25 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="35">35 minutes</option>
                        <option value="40">40 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="50">50 minutes</option>
                        <option value="55">55 minutes</option>
                        <option value="60">60 minutes</option>
                    </select>

                    <br />

                    <Button name="Update" onClick={onClick} />
                </div>
            </div>
        </>
    );
};

export default QuestionDetailSection;
