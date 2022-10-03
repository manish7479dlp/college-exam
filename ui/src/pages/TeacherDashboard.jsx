import "./TeacherDashboardStyle.css";
import "./AdminDashboardStyle.css";
import { useState } from "react";
//exam details components
import QuestionDetailSection from "../Components/QuestionSetSection/QuestionDetailSection/QuestionDetailSection"
//question set component
import QuestionSetSection from "../Components/QuestionSetSection/QuestionSetSection"
//student marks
import StudentMarks from "../Components/StudentMarks/Marks"

const TeacherDashboard = () => {
    const [activeTab, setActiveTab] = useState(1);

    const setQuestionDetails = () => {
        setActiveTab(1);
    }
    
    const setQuestion = () => {
        setActiveTab(2);
    }

    const previewQuestions = () => {
        setActiveTab(3);
    }

    const getMarks = () => {
        setActiveTab(4);
    }

    const logoutTeacher = () => {
        setActiveTab(5);
    }

    return (
        <div className="adminDashboardContainer">
            <div className="adminDashboardHeader">
                <h3>
                   Manish Kumar
                </h3>
                <h1>Teacher Dashboard</h1>
                <input type="text" placeholder="Searching" />
            </div>

            <div className="adminDashboardMainContantContainer">
                <div className="adminNavbar">
                <p
                        className={activeTab === 1 ? "activeTab" : ""}
                        onClick={setQuestionDetails}
                    >
                        Set Question Details
                    </p>
                    <p
                        className={activeTab === 2 ? "activeTab" : ""}
                        onClick={setQuestion}
                    >
                        Set Questions
                    </p>

                    <p
                        className={activeTab === 3 ? "activeTab" : ""}
                        onClick={previewQuestions}
                    >
                        Preview Questions
                    </p>

                    <p
                        className={activeTab === 4 ? "activeTab" : ""}
                        onClick={getMarks}
                    >
                        Preview Marks
                    </p>

                    

                    {/* 

                    <p
                        className={activeTab === 5 ? "activeTab" : ""}
                        onClick={showThirdYearStudentDetails}
                    >
                        Third Year Student
                    </p>

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
                        className={activeTab === 5 ? "activeTab" : ""}
                        onClick={logoutTeacher}
                    >
                        Logout
                    </p>
                </div>

                {activeTab === 1 && <QuestionDetailSection/>}

                {activeTab === 2 && <QuestionSetSection/>}

                {activeTab === 4 &&  <StudentMarks/>}
            </div>
        </div>
    );
};

export default TeacherDashboard;
