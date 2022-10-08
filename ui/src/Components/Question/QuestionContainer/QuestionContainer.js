import { useEffect, useState } from "react";
import "./QuestionContainer.css";
import Header from "../../Heading/Header";
import ContentName from "../../Heading/ContentName";
import Question from "../Question/Question";
import StudentDetails from "../../Cards/StudentDetails";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const QuestionContainer = () => {
    const apibaseURL = process.env.REACT_APP_BASE_URL || "";
  const authCheckName = "student";


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quesNumber, setQuesNumber] = useState(1);
    const [subjectName, setSubjectName] = useState("");
    const [examDurationLeft, setExamDurationLeft] = useState(-1);

    const Navigate = useNavigate();
    let StudentDetail = sessionStorage.getItem(authCheckName);
    StudentDetail = JSON.parse(StudentDetail);

    useEffect(() => {
        const examSubjectName = "examName";

        setSubjectName(JSON.parse(sessionStorage.getItem(examSubjectName)));

        if (subjectName) {
            fetchQuestion();
            // fetchExamDuration();
        } else {
            setLoading(false);
        }
    }, [subjectName]);


    // this code is used to make time left counter but there is bug...
    
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setExamDurationLeft((pre) => {
    //             return pre - 1;
    //         });
    //     }, 1000);
    //     // console.log(examDurationLeft);

    //     return () => clearInterval(interval);
    // }, [examDurationLeft]);



    // const fetchExamDuration = async () => {
    //     try {
    //         const studentDetails = JSON.parse(
    //             sessionStorage.getItem("StudentDetail")
    //         );
    //         const url = `${apibaseURL}/${"exam_duration_left"}/${
    //             studentDetails.department
    //         }/${studentDetails.semester}`;
    //         // console.log(url);
    //         const response = await fetch(url);
    //         const result = await response.json();
    //         // console.log(result.edl);
    //         setExamDurationLeft(result.edl * 60); // edl = examDurationLeft
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const fetchQuestion = async () => {
        try {
            setLoading(true);
            let subject = subjectNameConverter(subjectName);
            subject = subject + "-question";

            // console.log(subject);

            const url = `${apibaseURL}/${subject}`;

            console.log(url);

            const response = await fetch(url);
            const result = await response.json();
            if(result.status) {
                setData(result.response);
            } else {
                setData([]);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

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

    const onAnswerCheck = () => {
        let marks = 0;
        for (let i = 1; i <= data.length; i++) {
            let answerDetail = localStorage.getItem(i);
            localStorage.removeItem(i);
            if (answerDetail) {
                answerDetail = JSON.parse(answerDetail);
                if (answerDetail.universal === answerDetail.predict) {
                    marks++;
                }
            }
        }

        console.log(marks);

        const marksSheet = {
            name: StudentDetail.name,
            universityRoll: StudentDetail.universityRoll,
            marks,
            department: StudentDetail.department,
        };

        console.log(marksSheet);
        return marksSheet;
    };

    const sumitMarks = async (marksSheet) => {
        try {
            let subject = subjectNameConverter(subjectName);
            subject = subject + "_answer";
            const answernUrl = `${apibaseURL}/${subject}`;
            const response = await fetch(answernUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(marksSheet),
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const switchToQuestionNumber = (ques) => {
        setQuesNumber(ques);
    };

    const onOptionChange = (event) => {
        const studentAnswerDetail = {
            questionNumber: quesNumber,
            universal: "everi" + data[quesNumber - 1].answer + "nning",
            predict: "everi" + event.target.id + "nning",
        };

        localStorage.setItem(quesNumber, JSON.stringify(studentAnswerDetail));
    };

    // if the exam time is complete this code is executed and question is automatically submitted.

    if (examDurationLeft == 0) {
        const marksSheet = onAnswerCheck();
        console.log(marksSheet);
        sumitMarks(marksSheet);
        toast.success("Answer Submitted Successfully.");
        Navigate("/examstarterpage");
    }
    

    if (loading) {
        return <h1>Loading..</h1>;
    } else if (data.length === 0 ) {
        return <h1>No Question Found..</h1>;
    } else {
        const preQuestion = () => {
            if (quesNumber > 1) {
                setQuesNumber((pre) => {
                    return pre - 1;
                });
            }
        };
        const nextQuestion = (qNum) => {
            if (quesNumber < data.length) {
                setQuesNumber((pre) => {
                    return pre + 1;
                });
            }

            if (qNum === data.length) {
                if (
                    window.confirm(
                        "Do you really want to submit the Questions."
                    )
                ) {
                    const marksSheet = onAnswerCheck();
                    console.log(marksSheet);
                    sumitMarks(marksSheet);
                    toast.success("Answer Submitted Successfully.");
                    Navigate("/examstarterpage");
                }
            }
        };

        return (
            <div className="questionContainerFullContainer">
                <Header />
                <label className="toggleDetail" htmlFor="toggleDetail">
                    x
                </label>
                <input id="toggleDetail" type="checkbox" />
                <div className="center questionDetailsContainer">
                    <StudentDetails />
                    <div className="center questionListContainer">
                        {data.map((elm, idx) => {
                            return idx === quesNumber - 1 ? (
                                <p className="active" key={idx}>
                                    {idx + 1}
                                </p>
                            ) : (
                                <p
                                    onClick={() => {
                                        switchToQuestionNumber(idx + 1);
                                    }}
                                    key={idx}
                                >
                                    {idx + 1}
                                </p>
                            );
                        })}
                    </div>
                </div>
                <div className="questionContainer">
                    <ContentName title={subjectName.toUpperCase()} />

                    <div className="center examInfo">
                        <p className="examDuration">
                            Exam Duration:{" "}
                            {
                                "xyz"
                            }{" "}
                            Min
                        </p>
                        <p className="examTimeLeft">
                            Time Left: {parseInt(examDurationLeft / 60)} :{" "}
                            <span className="secondCounter">
                                {examDurationLeft % 60}
                            </span>{" "}
                            Min
                        </p>
                        <p className="studentName">
                            Name: {StudentDetail ? StudentDetail.name : "*****"}
                        </p>
                    </div>

                    <Question
                        preQuestion={preQuestion}
                        nextQuestion={nextQuestion}
                        questionNumber={quesNumber}
                        data={data[quesNumber - 1]}
                        totalQuestion={data.length}
                        onOptionChange={onOptionChange}
                    />
                </div>
            </div>
        );
    }
};

export default QuestionContainer;
