import { useEffect, useState } from "react";
import "./PreviewExamDetailsStyle.css";
import { toast } from "react-toastify";


const PreviewExamDetails = (props) => {
    const baseUrl = `${process.env.REACT_APP_BASE_URL}/exam-details`;
    const [examDetails, setExamDetails] = useState([]);
    const [loading , setLoading] = useState(true);

    const fetchExamDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(baseUrl);
            const result = await response.json();
            console.log(result);
            if (result.status) {
                setExamDetails(result.response);
            } else {
                setExamDetails([]);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        fetchExamDetails();
    }, []);

    const editQuestion = async () => {
        alert("This feature is not implemente yet..");
    };

    const deleteQuestion = async (_id) => {
        try {
            const confirm = window.confirm("Do you really want to delete.");
            if (confirm) {
                const url = `${baseUrl}/${_id}`
                const response = await fetch(url, { method: "DELETE" });
                const result = await response.json();
                if (response.status) {
                    toast.success(result.message);
                    fetchExamDetails();
                } else {
                    toast.error(result.message);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="previewExamDetailsMainContainer">
    
         {loading && <h1>Loading</h1>}

         {!loading && examDetails.length === 0  && <h1>No Data Found</h1>}

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
