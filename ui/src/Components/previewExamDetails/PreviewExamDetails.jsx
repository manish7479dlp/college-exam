import { useEffect, useState } from "react";
import "./PreviewExamDetailsStyle.css";
import { toast } from "react-toastify";
import EditExamDetails from "../editExamDetails/EditExamDetails";

const PreviewExamDetails = () => {
    const baseUrl = `${process.env.REACT_APP_BASE_URL}/exam-details`;
    const [examDetails, setExamDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enableEditExamDetails, setEnableEditExamDetails] = useState(false);
    const [editData, setEditData] = useState({});
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

    const editQuestion = async (data) => {
        const confirm = window.confirm("Do you really want to Edit.");
        if (confirm) {
            setEnableEditExamDetails(true);
            setEditData(data);
        }
        // alert("This feature is not implemente yet..");
    };

    const deleteQuestion = async (_id) => {
        try {
            const confirm = window.confirm("Do you really want to delete.");
            if (confirm) {
                const url = `${baseUrl}/${_id}`;
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

            {!enableEditExamDetails && !loading && examDetails.length === 0 && (
                <h1>No Data Found</h1>
            )}

            {!enableEditExamDetails &&
                examDetails.map((data, idx) => {
                    return (
                        <div key={idx} className="eachExamDetailsContainer">
                            <p>
                                <span>Semester: </span> {data.semester}
                            </p>

                            

                            <p>
                                <span>Exam Date: </span> {data.examDate}
                            </p>

                            <p>
                                <span>Exam Start Time: </span>{" "}
                                {data.examStartTime}
                            </p>

                            <p>
                                <span>Exam Duration: </span> {data.examDuration}{" "}
                                Minutes
                            </p>

                            <p>
                                <span>Subject: </span>{" "}
                                {data.subject}
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
                                        editQuestion(data);
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    );
                })}

            {enableEditExamDetails && (
                <EditExamDetails
                    fetchExamDetails={fetchExamDetails}
                    setEnableEditExamDetails={setEnableEditExamDetails}
                    editQuestionData={editData}
                />
            )}
        </div>
    );
};

export default PreviewExamDetails;
