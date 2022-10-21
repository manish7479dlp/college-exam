import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../Heading/Header";
import "./ExamStarterPage.css";
import ErrorHandling from "../../404/index";

const ExamStarterPage = () => {
    const apibaseURL = process.env.REACT_APP_BASE_URL || "";
    const authCheckName = "student";
    const studentDetails = JSON.parse(sessionStorage.getItem(authCheckName));
    // const examDetails = "examDetails";
    const Navigate = useNavigate();
    const [examDetails, setExamDetails] = useState();
    const [loading, setLoading] = useState(true);
    const [examAuth, setExamAuth] = useState([]);

    useEffect(() => {
        fetchExamDetails();
    }, []);

    function subjectNameConverter(subject) {
        subject = subject.toLowerCase();
        let res = "";
        for (let i = 0; i < subject.length; i++) {
            let ch = subject.charAt(i);
            if (ch === " ") {
                res += "-";
            } else {
                res += ch;
            }
        }

        return res;
    }

    // const fetchExamAuth = async () => {
    //     try {
    //         const subjectName =
    //             subjectNameConverter(examDetails[0].subject) + "_answer";
    //         const url = `${apibaseURL}/${subjectName}/${studentDetails.universityRoll}`;
    //         const response = await fetch(url);
    //         const result = await response.json();
    //         console.log();
    //         setExamAuth(result);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    function yearToSemester(year) {
        if (year === 1 && new Date().getMonth() >= 7) {
            return 1;
        } else if (year === 1 && new Date().getMonth() <= 6) {
            return 2;
        } else if (year === 2 && new Date().getMonth() >= 7) {
            return 3;
        } else if (year === 2 && new Date().getMonth() <= 6) {
            return 4;
        } else if (year === 3 && new Date().getMonth() >= 7) {
            return 5;
        } else if (year === 3 && new Date().getMonth() <= 6) {
            return 6;
        } else if (year === 4 && new Date().getMonth() >= 7) {
            return 7;
        } else if (year === 4 && new Date().getMonth() <= 6) {
            return 8;
        }
    }

    const fetchExamDetails = async () => {
        try {
            setLoading(true);
            const url = `${apibaseURL}/is-any-exam-today/${yearToSemester(
                studentDetails.year
            )}`;
            const response = await fetch(url);
            const result = await response.json();

            if (result.status) {
                setExamDetails(result.response);
            } else {
                setExamDetails([]);
            }
            // sessionStorage.setItem(examDetails , JSON.stringify(result))
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    // const getCurrentTime = () => {
    //     const DateObject = new Date();
    //     let hour = DateObject.getHours();
    //     let minute = DateObject.getMinutes();

    //     hour = hour >= 1 && hour <= 9 ? "0" + hour : hour;
    //     minute = minute >= 1 && minute <= 9 ? "0" + minute : minute;

    //     const result = hour + ":" + minute;

    //     return result;
    // };

    // const startExam = () => {
    //     sessionStorage.setItem(
    //         "subjectName",
    //         JSON.stringify(examDetails.subject)
    //     );
    //     sessionStorage.setItem("QuestionDetails", JSON.stringify(examDetails));
    //     const currTime = getCurrentTime();

    //     if (currTime >= examDetails.examStartTime) {
    //         Navigate("/question");
    //     } else {
    //         toast.error("Exam is not start yet");
    //     }

    //     // Navigate("/question");
    // };

    // const startExam = () => {
    //     sessionStorage.setItem(
    //         "subjectName",
    //         JSON.stringify(examDetails.subject)
    //     );
    //     sessionStorage.setItem("QuestionDetails", JSON.stringify(examDetails));
    //     const currTime = getCurrentTime();

    //     if (currTime >= examDetails.examStartTime) {
    //         Navigate("/question");
    //     } else {
    //         toast.error("Exam is not start yet");
    //     }

    //     // Navigate("/question");
    // };

    const startExam = async () => {
        try {
            const examSubjectName = "examName";
            sessionStorage.setItem(
                examSubjectName,
                JSON.stringify(examDetails[0].subject)
            );
            Navigate("/question");
        } catch (error) {
            console.log(error);
        }
    };

    const backToHome = () => {
        Navigate("/");
    };

    if (loading) {
        return <h1>Loading...</h1>;
    } else if (examDetails.length === 0) {
        return (
            <>
                <ErrorHandling
                    title={"Hey"}
                    description={"Today"}
                    extraDes={"there is no exam found"}
                ></ErrorHandling>

                <div className="center">
                    <button className="bthbtn" onClick={backToHome}>
                        Back to Home
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="examStarterPageContainer">
                <div className="instructionContainer">
                    <div className="subjectName">{examDetails.subject}</div>

                    <h2>Exam Instruction</h2>

                    <p className="instructionDescription">
                        This is a remote invigilated/ proctored exam of{" "}
                        <strong>{20} questions of 1 mark</strong> each. Total
                        time given will be <strong>{30} minutes.</strong> Please
                        login {10} to {15} min before scheduled start time to
                        complete your login process early. You need to take this
                        exam using a <strong>Chrome browser</strong> on Windows
                        laptop.Any presence of another person or movement away
                        from the browser tab is not allowed during the duration
                        of the exam.
                        <strong>
                            If any such malpractice is noted during / after the
                            exam then the candidates exam maybe cancelled.
                        </strong>
                    </p>

                    <div className="examInformationContainer">
                        <h3>Exam Information</h3>

                        <p>
                            Examination: {examDetails[0].subject.toUpperCase()}
                        </p>
                        <p>Current User: {studentDetails.name}</p>
                        <p>Total Screen/Questions: {20 + "*"}</p>
                        <p>
                            Total Duration: {examDetails[0].examDuration}{" "}
                            Minutes
                        </p>
                        <p>Marks: {20 + "*"}</p>
                        {examAuth.length !== 0 && (
                            <p className="examAuth">
                                Exam Status:{" "}
                                <span>You have already Submitted.</span>
                            </p>
                        )}
                        <div className="subjectName btnContainer">
                            <button className="bthome" onClick={backToHome}>
                                Back To Home
                            </button>
                            {examAuth.length === 0 && (
                                <button className="sexam" onClick={startExam}>
                                    Start Exam
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExamStarterPage;
