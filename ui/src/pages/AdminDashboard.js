import react, { useState } from "react";
import "./AdminDashboardStyle.css";
import StudentRegistration from "../Components/Registration/StudentRegistration";
import TeacherRegistration from "../Components/Registration/TeacherRegistration";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState(1);



    const studentRegistration = () => {
        setActiveTab(1)

    }

    const teacherRegistration = () => {
        setActiveTab(2)
    }

    const showFirstYearStudentDetails = () => {
        setActiveTab(3)

    }

    const showSecondYearStudentDetails = () => {
        setActiveTab(4)

    }

    const showThirdYearStudentDetails = () => {
        setActiveTab(5)

    }

    const showFourthYearStudentDetails = () => {
        setActiveTab(6)

    }

    const showStudentMarks = () => {
        setActiveTab(7)

    }

    const logoutAdmin = () => {
        setActiveTab(8)

    }
    

    return (
        <div className="adminDashboardContainer">
            <div className="adminDashboardHeader">
                <h3>Manish Kumar</h3>
                <h1>Admin Dashboard</h1>
                <input type="text" placeholder="Searching" />
            </div>

            <div className="adminDashboardMainContantContainer">
                <div className="adminNavbar">
                    <p className= {activeTab === 1 ? "activeTab" : ""} onClick={studentRegistration}>Student Registration</p>

                    <p className= {activeTab === 2 ? "activeTab" : ""} onClick={teacherRegistration}>Teacher Registration</p>

                    <p className= {activeTab === 3 ? "activeTab" : ""} onClick={showFirstYearStudentDetails}>First Year Student</p>

                    <p className= {activeTab === 4 ? "activeTab" : ""} onClick={showSecondYearStudentDetails}>Second Year Student</p>

                    <p className= {activeTab === 5 ? "activeTab" : ""} onClick={showThirdYearStudentDetails}>Third Year Student</p>

                    <p className= {activeTab === 6 ? "activeTab" : ""} onClick={showFourthYearStudentDetails}>Fourth Year Student</p>

                    <p className= {activeTab === 7 ? "activeTab" : ""} onClick={showStudentMarks}>Student Marks</p>

                    <p className= {activeTab === 8 ? "activeTab" : ""} onClick={logoutAdmin}>Logout</p>

                </div>

                {/* student registration */}
                {
                    activeTab === 1 && <StudentRegistration/>
                }

                {/* teacher registration */}
                {
                    activeTab === 2 && <TeacherRegistration/>
                }

                
            </div>
        </div>
    );
};

export default AdminDashboard;
