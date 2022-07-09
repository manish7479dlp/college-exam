import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../Heading/Header";
import "./ExamStarterPage.css";
import ErrorHandling from "../../404/index";

const ExamStarterPage = () => {
    const apibaseURL = process.env.REACT_APP_API_URL || "";
    const studentDetails = JSON.parse(sessionStorage.getItem("StudentDetail"));

    const Navigate = useNavigate();
    const [examDetails, setExamDetails] = useState();
    const [loading, setLoading] = useState(true);
    const [examAuth, setExamAuth] = useState([]);

    useEffect(() => {
        fetchExamDetails();

        // examDetails && fetchExamAuth();
    }, []);

    useEffect(() => {
        fetchExamAuth();
    }, [examDetails]);

    console.log(examAuth);

    function subjectNameConverter(subject) {
        subject = subject.toLowerCase();
        let res = "";
        for (let i = 0; i < subject.length; i++) {
            let ch = subject.charAt(i);
            if (ch === " ") {
                res += "_";
            } else {
                res += ch;
            }
        }

        return res;
    }

    const fetchExamAuth = async () => {
        try {
            
                const subjectName =
                    subjectNameConverter(examDetails.subject) + "_answer";
                const url = `${apibaseURL}/${subjectName}/${studentDetails.universityRoll}`;
                const response = await fetch(url);
                const result = await response.json();
                console.log();
                setExamAuth(result);
            
        } catch (error) {
            console.log(error);
        }
    };

    const fetchExamDetails = async () => {
        try {
            setLoading(true);
            const url = `${apibaseURL}/${"exam_details"}/${
                studentDetails.department
            }/${studentDetails.semester}`;
            // console.log(url);
            const response = await fetch(url);
            const result = await response.json();
            // console.log(result);

            setExamDetails(result[0]);

            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const getCurrentTime = () => {
        const DateObject = new Date();
        let hour = DateObject.getHours();
        let minute = DateObject.getMinutes();

        hour = hour >= 1 && hour <= 9 ? "0" + hour : hour;
        minute = minute >= 1 && minute <= 9 ? "0" + minute : minute;

        const result = hour + ":" + minute;

        return result;
    };

    const startExam = () => {
        sessionStorage.setItem(
            "subjectName",
            JSON.stringify(examDetails.subject)
        );
        sessionStorage.setItem("QuestionDetails", JSON.stringify(examDetails));
        const currTime = getCurrentTime();

        if (currTime >= examDetails.examStartTime) {
            Navigate("/question");
        } else {
            toast.error("Exam is not start yet");
        }

        // Navigate("/question");
    };

    const backToHome = () => {
        Navigate("/");
    };

    if (loading) {
        return <h1>Loading...</h1>;
    } else if (examDetails == null) {
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

                        <p>Examination: {examDetails.subject}</p>
                        <p>Current User: {studentDetails.name}</p>
                        <p>Total Screen/Questions: {20}</p>
                        <p>Total Duration: {30} Minutes</p>
                        <p>Marks: {20}</p>
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
