import { useEffect, useState } from "react";
import "./PreviewExamDetailsStyle.css";

const PreviewExamDetails = (props) => {
    const baseUrl = `${process.env.REACT_APP_BASE_URL}/exam-details`;
    const [examDetails, setExamDetails] = useState([]);

    const fetchExamDetails = async () => {
        try {
            const response = await fetch(baseUrl);
            const result = await response.json();

            if (result.status) {
                setExamDetails(result.response);
            } else {
                setExamDetails([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchExamDetails();
    }, []);
  
    const editQuestion = async () => {}

    const deleteQuestion = async () => {}


    return (
        <div className="previewExamDetailsMainContainer">
            {examDetails.map((data, idx) => {
                return (
                    <div key={idx} className="eachExamDetailsContainer">
                        <p>
                            <span>Semester: </span> {data.semester}
                        </p>

                        <p>
                            <span>Subject: </span> {data.subject.toUpperCase()}
                        </p>

                        <p>
                            <span>Exam Date: </span> {data.examDate}
                        </p>

                        <p>
                            <span>Exam Start Time: </span> {data.examStartTime}
                        </p>

                        <p>
                            <span>Exam Duration: </span> {data.examDuration}{" "}
                            Minutes
                        </p>

                        <div className="center QuestionItemOperationContainer">
                            <button
                                className="deleteBtn"
                                onClick={() => {
                                    deleteQuestion(data._id);
                                }}
                            >
                                Delete
                            </button>
                            <button
                                className="editBtn"
                                onClick={() => {
                                    editQuestion(data._id);
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PreviewExamDetails;
