import "./TeacherDashboardStyle.css";
import "./AdminDashboardStyle.css";
import { useState } from "react";
//exam details components
import QuestionDetailSection from "../Components/QuestionSetSection/QuestionDetailSection/QuestionDetailSection";
//question set component
import QuestionSetSection from "../Components/QuestionSetSection/QuestionSetSection";
//student marks
import StudentMarks from "../Components/StudentMarks/Marks";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import QuestionPreview from "../Components/QuestionPreview/QuestionPreview";
import PreviewExamDetails from "../Components/previewExamDetails/PreviewExamDetails";

const TeacherDashboard = () => {
    const authCheckName = "teacher";
    const questionDetailsKey = "examDetails";

    const [activeTab, setActiveTab] = useState(1);
    const Navigate = useNavigate();

    const setQuestionDetails = () => {
        setActiveTab(1);
    };

    const setQuestion = () => {
        setActiveTab(2);
    };

    const previewQuestions = () => {
        setActiveTab(3);
    };

    const getMarks = () => {
        setActiveTab(4);
    };

    const previewExamDetails = async () => {
        setActiveTab(5);
    };

    const logoutTeacher = () => {
        setActiveTab(6);
        const confirm = window.confirm("Do you really want to logout..");
        if (confirm) {
            sessionStorage.removeItem(authCheckName);
            sessionStorage.removeItem(questionDetailsKey)
            Navigate("/");
        }
    };

    return (
        <div className="adminDashboardContainer">
            <div className="adminDashboardHeader">
                <h3>
                    {JSON.parse(sessionStorage.getItem(authCheckName)).name}
                </h3>
                <h1>Teacher Dashboard</h1>
                <input type="text" placeholder="Searching" />
            </div>

            <div className="adminDashboardMainContantContainer">
                <div className="adminNavbar">
                    {!sessionStorage.getItem(questionDetailsKey) && (
                        <p
                            className={activeTab === 1 ? "activeTab" : ""}
                            onClick={setQuestionDetails}
                        >
                            Set Exam Details
                        </p>
                    )}
                    {sessionStorage.getItem(questionDetailsKey) && (
                        <p
                            className={activeTab === 2 ? "activeTab" : ""}
                            onClick={setQuestion}
                        >
                            Set Questions
                        </p>
                    )}

                    {/* question details is added then only this nav is display  */}

                    {sessionStorage.getItem(questionDetailsKey) && (
                        <p
                            className={activeTab === 3 ? "activeTab" : ""}
                            onClick={previewQuestions}
                        >
                            Preview Questions
                        </p>
                    )}

                    <p
                        className={activeTab === 4 ? "activeTab" : ""}
                        onClick={getMarks}
                    >
                        Preview Marks
                    </p>

                    <p
                        className={activeTab === 5 ? "activeTab" : ""}
                        onClick={previewExamDetails}
                    >
                        Preview Exam Details
                    </p>

                    {/* 

                    

                    <p
                        className={activeTab === 6 ? "activeTab" : ""}
                        onClick={showFourthYearStudentDetails}
                    >
                        Fourth Year Student
                    </p>

                    <p
                        className={activeTab === 9 ? "activeTab" : ""}
                        onClick={showTeachersDetails}
                    >
                        Teachers Details
                    </p>

                    <p
                        className={activeTab === 7 ? "activeTab" : ""}
                        onClick={showStudentMarks}
                    >
                        Student Marks
                    </p> */}

                    <p
                        className={activeTab === 6 ? "activeTab" : ""}
                        onClick={logoutTeacher}
                    >
                        Logout
                    </p>
                </div>

                {activeTab === 1 && (
                    <QuestionDetailSection changeTab={setActiveTab} />
                )}

                {activeTab === 2 && <QuestionSetSection />}

                {activeTab === 3 && <QuestionPreview />}

                {activeTab === 4 && <StudentMarks />}

                {activeTab === 5 && <PreviewExamDetails />}
            </div>
        </div>
    );
};

export default TeacherDashboard;
