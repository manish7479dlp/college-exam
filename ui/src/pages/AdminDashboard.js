import react, { useState } from "react";
import "./AdminDashboardStyle.css";
import StudentRegistration from "../Components/Registration/StudentRegistration";
import TeacherRegistration from "../Components/Registration/TeacherRegistration";
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const url = "http://localhost:8000/api/student";

    const [activeTab, setActiveTab] = useState(1);
    const [studentData, setStudentData] = useState([]);

    const editStudentDetails = () => {
         alert("This feature is not implemented yet. (just delete the details and register again)")
    }

    const deleteStudentDetails = async (id , year) => {
        const deleteUrl = url + `/${id}`
        const verify = window.confirm("Do you Really Want to delete the student Details.");
        if(verify) {
             const response = await fetch(deleteUrl , {
                method: "DELETE"
             })

             const result = await response.json();

             if(result.status) {
                toast.success(result.message);
             } else {
                toast.error(result.message
                )
             }
        } else {

        }
    }

    const fetchStudentData = async (year) => {
        try {
            const response = await fetch(url);
            const result = await response.json();

            const data = result.response.filter((elm) => {
                return elm.year === year - 2;
            });

            setStudentData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const studentRegistration = () => {
        setActiveTab(1);
    };

    const teacherRegistration = () => {
        setActiveTab(2);
    };

    const showFirstYearStudentDetails = () => {
        setActiveTab(3);
        fetchStudentData(3);
    };

    const showSecondYearStudentDetails = () => {
        setActiveTab(4);
        fetchStudentData(4);
    };

    const showThirdYearStudentDetails = () => {
        setActiveTab(5);
        fetchStudentData(5);
    };

    const showFourthYearStudentDetails = () => {
        setActiveTab(6);
        fetchStudentData(6);
    };

    const showStudentMarks = () => {
        setActiveTab(7);
    };

    const logoutAdmin = () => {
        setActiveTab(8);
    };

    return (
        <div className="adminDashboardContainer">
            <div className="adminDashboardHeader">
                <h3>Manish Kumar</h3>
                <h1>Admin Dashboard</h1>
                <input type="text" placeholder="Searching" />
            </div>

            <div className="adminDashboardMainContantContainer">
                <div className="adminNavbar">
                    <p
                        className={activeTab === 1 ? "activeTab" : ""}
                        onClick={studentRegistration}
                    >
                        Student Registration
                    </p>

                    <p
                        className={activeTab === 2 ? "activeTab" : ""}
                        onClick={teacherRegistration}
                    >
                        Teacher Registration
                    </p>

                    <p
                        className={activeTab === 3 ? "activeTab" : ""}
                        onClick={showFirstYearStudentDetails}
                    >
                        First Year Student
                    </p>

                    <p
                        className={activeTab === 4 ? "activeTab" : ""}
                        onClick={showSecondYearStudentDetails}
                    >
                        Second Year Student
                    </p>

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
                        className={activeTab === 7 ? "activeTab" : ""}
                        onClick={showStudentMarks}
                    >
                        Student Marks
                    </p>

                    <p
                        className={activeTab === 8 ? "activeTab" : ""}
                        onClick={logoutAdmin}
                    >
                        Logout
                    </p>
                </div>

                {/* student registration */}
                {activeTab === 1 && <StudentRegistration />}

                {/* teacher registration */}
                {activeTab === 2 && <TeacherRegistration />}

                {/* first year student details */}

                { (activeTab === 3 || activeTab === 4 || activeTab === 5 || activeTab === 6) &&
                    <div className="studentDetailsShowContainer">

                        {studentData.map((data, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="eachStudentDetailSContainer"
                                >
                                    <p>
                                        UniversityRoll: <span>{data.universityRoll}</span>
                                    </p>
                                    <p>
                                        Name: <span>{data.name}</span>
                                    </p>
                                    <p>
                                        Department: <span>{data.department}</span>
                                    </p>
                                    <p>
                                        Year: <span>{data.year}</span>
                                    </p>

                                    <div className="operationButtonContainer">
                                        <button className="editButton" onClick={() => {editStudentDetails(data._id)}}>
                                            Edit
                                        </button>
                                        <button className="deleteButton" onClick={() => {deleteStudentDetails(data._id , data.year)}}>
                                            delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                }
            </div>
        </div>
    );
};

export default AdminDashboard;
