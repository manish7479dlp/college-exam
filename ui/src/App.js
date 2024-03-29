import React from "react";
// import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginDashboard from "./Components/DashBoard/LoginDashboard/LoginDashboard";
import Home from "./Components/Pages/Home.js";
import StudentLogin from "./Components/Login/StudentLogin";
import TeacherLogin from "./Components/Login/TeacherLogin";
import AdminLogin from "./Components/Login/AdminLogin";
import Question from "./Components/Question/QuestionContainer/QuestionContainer";
import StudentLoginPrivateComponent from "./Components/PrivateComponent/StudentLoginPrivateComponent";
import TeacherLoginPrivateComponent from "./Components/PrivateComponent/TeacherLoginPrivateComponent";
import AdminLoginPrivateComponent from "./Components/PrivateComponent/AdminLoginPrivateComponent";
import ExamStarterPage from "./Components/Question/ExamStarterPage/ExamStarterPage";

import QuestionDetailSection from "./Components/QuestionSetSection/QuestionDetailSection/QuestionDetailSection";
import StudentInfoDetails from "./Components/DetailsEntry/StudentDetails/StudentInfoDetails";
import TeacherDetails from "./Components/DetailsEntry/TeacherDetails/TeacherDetails";
import QuestionSetSection from "./Components/QuestionSetSection/QuestionSetSection";
import Marks from "./Components/StudentMarks/Marks";
import DailogBox from "./Components/DailogBox/DailogBox";

import AdminDashboard from "./pages/AdminDashboard";

// 404 page not fount
import NotFound from "./Components/404";
import TeacherDashboard from "./pages/TeacherDashboard";
import PreviewExamDetails from "./Components/previewExamDetails/PreviewExamDetails";

function App() {
    return (
        <>
            <BrowserRouter>
                <ToastContainer position="top-center" theme="colored" />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/logindashboard"
                        element={<LoginDashboard />}
                    />
                    <Route path="/studentlogin" element={<StudentLogin />} />
                    <Route path="/teacherlogin" element={<TeacherLogin />} />
                    <Route path="/adminlogin" element={<AdminLogin />} />

                    <Route element={<AdminLoginPrivateComponent />}>
                        <Route
                            path="/admin-dashboard"
                            element={<AdminDashboard />}
                        />
                    </Route>

                    <Route element={<TeacherLoginPrivateComponent />}>
                        <Route
                            path="/teacher-dashboard"
                            element={<TeacherDashboard />}
                        />
                    </Route>

                    <Route element={<StudentLoginPrivateComponent />}>
                        <Route
                            path="/exam-starter-page"
                            element={<ExamStarterPage />}
                        />
                        <Route path="/question" element={<Question />} />
                    </Route>

                </Routes>
                {/* <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/logindashboard"
                        element={<LoginDashboard />}
                    />
                    <Route path="/studentlogin" element={<StudentLogin />} />
                    <Route path="/teacherlogin" element={<TeacherLogin />} />
                    <Route path="/adminlogin" element={<AdminLogin />} />
                    <Route element={<AdminLoginPrivateComponent />}>
                        <Route
                            path="/teacherdetails"
                            element={<TeacherDetails />}
                        />
                        <Route
                            path="/studentinfodetails"
                            element={<StudentInfoDetails />}
                        />
                    </Route>
                    <Route element={<StudentLoginPrivateComponent />}>
                        <Route
                            path="/examstarterpage"
                            element={<ExamStarterPage />}
                        />
                        <Route path="/question" element={<Question />} />
                    </Route>

                    <Route element={<TeacherLoginPrivateComponent />}>
                        <Route
                            path="/questiondetailsection"
                            element={<QuestionDetailSection />}
                        />
                        <Route path="/studentmarks" element={<Marks />} />
                        <Route path="/dailogbox" element={<DailogBox />} />
                        <Route
                            path="/questionsetsection"
                            element={<QuestionSetSection />}
                        />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes> */}
            </BrowserRouter>
        </>
    );
}

export default App;
