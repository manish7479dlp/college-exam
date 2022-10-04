import { useState } from "react";
import Button from "../Buttons/Button";
import "./RemoveQuestionAndInformation.css";
import ContentName from "../Heading/ContentName";
import QuestionPreview from "../QuestionPreview/QuestionPreview";
import { toast } from "react-toastify";

// internal component
const InputQuestionDetails = () => {
    const initialData = {
        semester: "",
        subject: "",
    };
    const [Data, setData] = useState(initialData);
    const [isDisable, setDisable] = useState(true);

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

    const onClick = (event) => {
        event.preventDefault();
        alert("hii");
    };

    return (
        <div className="center inputQuestionDetailsMainContainer">
            <div className="center inputQuestionDetails">
                <h2 className="title">Exam Details</h2>
                <form>
                    <p>Semester Number: </p>
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

                    <p>Subject Name: </p>
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

                    <br />

                    <div>
                        <Button name="Next" onClick={onClick} />
                    </div>
                </form>
            </div>
        </div>
    );
};

// internal component
const ExamDetailsPreview = () => {
    const removeDetails = () => {
        const confirmation = window.confirm(
            "Do you really want to delete All Details."
        );
        if (confirmation) {
            toast.success("Question Details is deleted Successfully.");
        } else {
            toast.warning("Question Details is not deleted..");
        }
    };
    return (
        <div className="center examDetailsPreviewContainer">
            <ContentName title="Exam and Question Details" />
            <div>
                <p>
                    <span>Semester: </span>
                    {"4"}
                </p>
                <p>
                    <span>Department: </span>
                    {"CSE"}
                </p>
                <p>
                    <span>Exam Start Time: </span>
                    {"10:58"}
                </p>
                <p>
                    <span>Exam Date: </span>
                    {"2022-07-10"}
                </p>
                <p>
                    <span>Exam Duration: </span>
                    {"30"} Minutes
                </p>
                <p>
                    <span>Subject: </span>
                    {"Data Structure and Algorithm"}
                </p>
            </div>
            <button className="removeDetailsButton" onClick={removeDetails}>
                X
            </button>
        </div>
    );
};

const RemoveQuestionAndInfomation = () => {
    return (
        <div className="center removeQuestionAndInformationContainer">
            {/* <InputQuestionDetails /> */}
            <ExamDetailsPreview />
            <QuestionPreview display={false} />
        </div>
    );
};

export default RemoveQuestionAndInfomation;
