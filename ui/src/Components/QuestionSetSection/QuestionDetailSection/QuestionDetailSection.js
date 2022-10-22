import Button from "../../Buttons/Button";
import ContentName from "../../Heading/ContentName";
import Header from "../../Heading/Header";
import "./QuestionDetailSection.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import data from "../../../data/data.json";

const QuestionDetailSection = ({ changeTab }) => {
    const apibaseURL = `${process.env.REACT_APP_BASE_URL}/exam-details`;
    const questionDetailsKey = process.env.REACT_APP_EXAMDETAILS_AUTH || "";

    const studentDetails = JSON.parse(sessionStorage.getItem("StudentDetail"));
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

    const examEndTimeCollection = [20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 90];

    // set the exam details into the (QuestionDetails key in session stroage..)
    // const onClick = () => {
    //     if (
    //         Data.examStartTime &&
    //         Data.semester &&
    //         Data.subject &&
    //         Data.examDate
    //     ) {
    //         const department = JSON.parse(
    //             sessionStorage.getItem("TeacherDetail")
    //         ).department;
    //         sessionStorage.setItem(
    //             "QuestionDetails",
    //             JSON.stringify({ ...Data, department })
    //         );
    //         setExamDetails();
    //         Navigate("/questionsetsection");
    //     } else {
    //         toast.warning("Please fill all the fields..");
    //     }
    // };

    // const setExamDetails = async () => {
    //     try {
    //         const url = `${apibaseURL}/${"exam_details"}`;
    //         const department = JSON.parse(
    //             sessionStorage.getItem("TeacherDetail")
    //         ).department;
    //         const finalData = { ...Data, department };
    //         // console.log(finalData);

    //         const response = await fetch(url, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(finalData),
    //         });
    //         if (response.status !== 200) {
    //             toast.warning("Question is not Added..");
    //             console.log(response);
    //         } else {
    //             toast.success("Question Details Added Successfully.");
    //             setData(initialData);
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const onClick = async () => {
        try {
            const response = await fetch(apibaseURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Data),
            });

            const result = await response.json();

            if (result.status) {
                toast.success(result.message);
                setData(initialData);
                sessionStorage.setItem(
                    questionDetailsKey,
                    JSON.stringify(Data)
                );
                changeTab(2);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                <ContentName title={"Question Details Set Section"} />
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
                                    {data.subjectName.firstYear.firstSemester.map(
                                        (subject, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={subject}
                                                >
                                                    {subject}
                                                </option>
                                            );
                                        }
                                    )}
                                </optgroup>
                            )}
                            {Data.semester === "2" && (
                                <optgroup label="2nd-Sem-Subject">
                                    {data.subjectName.firstYear.secondSemester.map(
                                        (subject, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={subject}
                                                >
                                                    {subject}
                                                </option>
                                            );
                                        }
                                    )}
                                </optgroup>
                            )}

                            {Data.semester === "3" && (
                                <optgroup label="3rd-Sem-Subject">
                                    {data.subjectName.secondYear.thirdSemester.map(
                                        (subject, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={subject}
                                                >
                                                    {subject}
                                                </option>
                                            );
                                        }
                                    )}
                                </optgroup>
                            )}

                            {Data.semester === "4" && (
                                <optgroup label="4th-Sem-Subject">
                                    {data.subjectName.secondYear.fourthSemester.map(
                                        (subject, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={subject}
                                                >
                                                    {subject}
                                                </option>
                                            );
                                        }
                                    )}
                                </optgroup>
                            )}

                            {Data.semester === "5" && (
                                <optgroup label="5th-Sem-Subject">
                                    {data.subjectName.thirdYear.fifthSemester.map(
                                        (subject, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={subject}
                                                >
                                                    {subject}
                                                </option>
                                            );
                                        }
                                    )}
                                </optgroup>
                            )}

                            {Data.semester === "6" && (
                                <optgroup label="6th-Sem-Subject">
                                    {data.subjectName.thirdYear.sixthSemester.map(
                                        (subject, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={subject}
                                                >
                                                    {subject}
                                                </option>
                                            );
                                        }
                                    )}
                                </optgroup>
                            )}

                            {Data.semester === "7" && (
                                <optgroup label="7th-Sem-Subject">
                                    {data.subjectName.fourthYear.seventhSemester.map(
                                        (subject, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={subject}
                                                >
                                                    {subject}
                                                </option>
                                            );
                                        }
                                    )}
                                </optgroup>
                            )}

                            {Data.semester === "8" && (
                                <optgroup label="8th-Sem-Subject">
                                    {data.subjectName.fourthYear.eightSemester.map(
                                        (subject, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={subject}
                                                >
                                                    {subject}
                                                </option>
                                            );
                                        }
                                    )}
                                </optgroup>
                            )}
                        </select>
                    </div>

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

                    <Button name="Next" onClick={onClick} />
                </div>
            </div>
        </>
    );
};

export default QuestionDetailSection;
