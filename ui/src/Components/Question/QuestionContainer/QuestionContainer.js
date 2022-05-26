import { useEffect, useState } from "react";
import "./QuestionContainer.css";
import Header from "../../Heading/Header";
import ContentName from "../../Heading/ContentName";
import Question from "../Question/Question";
import StudentDetails from "../../Cards/StudentDetails";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const QuestionContainer = () => {
  const apibaseURL = process.env.REACT_APP_API_URL || '';

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quesNumber, setQuesNumber] = useState(1);
  const [subjectName, setSubjectName] = useState("");

   const Navigate  = useNavigate();


  useEffect(() => {
    setSubjectName(JSON.parse(sessionStorage.getItem("ExamSubjectName")));

    if (subjectName) {
      fetchQuestion();
    }
  }, [subjectName]);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      let subject = subjectNameConverter(subjectName);
      subject = subject + "_question";

      // console.log(subject);

      const url = `${apibaseURL}/${subject}`;

      const response = await fetch(url);
      const result = await response.json();
      setData(result);
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
        res += "_";
      } else {
        res += ch;
      }
    }

    return res;
  }

  // let StudentDetail = localStorage.getItem("StudentDetail");
  let StudentDetail = sessionStorage.getItem("StudentDetail");
  StudentDetail = JSON.parse(StudentDetail);

  if (loading) {
    return <h1>Loading..</h1>;
  } else if (data.length === 0) {
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
        if (window.confirm("Do you really want to submit the Questions.")) {
          const marksSheet = onAnswerCheck();
          console.log(marksSheet);
          sumitMarks(marksSheet);
          toast.success("Answer Submitted Successfully.");
          Navigate("/");
        }
      }
    };

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
        department: StudentDetail.department
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

    return (
      <>
        <Header />
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
          <ContentName title={subjectName} />

          <div className="center examInfo">
            <p>Exam Duration: 45 Minutes</p>
            <p>Time Left: 36 Minutes</p>
            <p>Name: {StudentDetail ? StudentDetail.name : "*****"}</p>
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
      </>
    );
  }
};

export default QuestionContainer;
