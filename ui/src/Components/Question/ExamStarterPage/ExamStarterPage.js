import { useNavigate } from "react-router-dom";
import Header from "../../Heading/Header";
import "./ExamStarterPage.css";

const ExamStarterPage = () => {
    const Navigate = useNavigate();

    const startExam = () => {
      Navigate("/question");
    }

    const backToHome = () => {
      Navigate("/");
    }

    return (
        <>
            <Header />
            <div className="examStarterPageContainer">
                <div className="instructionContainer">
                    <div className="subjectName">
                        Data Structure and Algorithm
                    </div>

                    <h2>Exam Instruction</h2>

                    <p className="instructionDescription">
                        This is a remote invigilated/ proctored exam of{" "}
                        <strong>{30} questions of 1 mark</strong> each. Total
                        time given will be <strong>{90} minutes.</strong> Please
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

                        <p>Examination: {"Data Structure And Algorithm"}</p>
                        <p>Current User: {"Manish Kumar"}</p>
                        <p>Total Screen/Questions: {20}</p>
                        <p>Total Duration: {30} Minutes</p>
                        <p>Marks: {20}</p>

                        <div className="subjectName btnContainer">
                            <button className="bthome" onClick={backToHome}>Back To Home</button>
                            <button className="sexam" onClick={startExam}>Start Exam</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExamStarterPage;
