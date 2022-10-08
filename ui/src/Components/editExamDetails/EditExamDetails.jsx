import Button from "../Buttons/Button";
import ContentName from "../Heading/ContentName";
import "../QuestionSetSection/QuestionDetailSection/QuestionDetailSection.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditExamDetails = (props) => {
    const apibaseURL = `${process.env.REACT_APP_BASE_URL}/exam-details`
    const questionDetailsKey = "examDetails"
    
    const {_id , semester , subject , examDate, examStartTime , examDuration} = props.editQuestionData;

    const Navigate = useNavigate();
    const initialData = {
        semester,
        subject,
        examStartTime,
        examDuration,
        examDate,
    };
    const [Data, setData] = useState(initialData);

    const onClick = async () => {
        try {
            const url = `${apibaseURL}/${_id}`
            console.log(url);
            const response = await fetch(url , {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(Data)
            })

            const result = await response.json();

            if(result.status) {
                toast.success(result.message);
                setData(initialData)
                props.fetchExamDetails();
                props.setEnableEditExamDetails((pre) => {
                    return (!pre)
                })
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error);
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
            {/* <Header /> */}
            <div className="questionDetailSectionContainer">
                <ContentName title={"Exam Details Edit Section"} />
                <div className="innerQuestionDetailSectionContainer  ">
                    <label>Semester Number: </label>
                    <select
                        name="semester"
                        value={Data.semester}
                        onChange={onChange}
                        disabled = {true}
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
                    
                    <h2 className="eidtExamDetailsSubjectName">{Data.subject.toUpperCase()}</h2>

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

export default EditExamDetails;
