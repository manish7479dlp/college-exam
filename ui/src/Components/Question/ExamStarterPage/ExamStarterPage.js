import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../Heading/Header";
import "./ExamStarterPage.css";

const ExamStarterPage = () => {
    const apibaseURL = process.env.REACT_APP_API_URL || "";
    const studentDetails = JSON.parse(sessionStorage.getItem("StudentDetail"));

    const Navigate = useNavigate();
    const [examDetails, setExamDetails] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExamDetails();
    }, []);

    const fetchExamDetails = async () => {
        try {
            setLoading(true);
            const url = `${apibaseURL}/${"exam_details"}/${
                studentDetails.department
            }/${studentDetails.semester}`;
            console.log(url);
            const response = await fetch(url);
            const result = await response.json();
            // console.log(result[0]);
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
      
      hour = (hour >= 1 && hour <= 9) ? "0" + hour : hour;
      minute = (minute >= 1 && minute <= 9) ? "0" + minute : minute;

      const result = hour + ":" + minute;

      return result;
    }


    const startExam = () => {
        sessionStorage.setItem("subjectName", JSON.stringify(examDetails.subject));
        const currTime = getCurrentTime();
        
        if(currTime >= examDetails.examStartTime) {
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
    } else if(examDetails == null) {
      return <h1 >No Exam Found..</h1>
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

                        <div className="subjectName btnContainer">
                            <button className="bthome" onClick={backToHome}>
                                Back To Home
                            </button>
                            <button className="sexam" onClick={startExam}>
                                Start Exam
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExamStarterPage;
