import { useEffect, useState } from "react";
import "./QuestionPreview.css";
import QuestionItem from "../QuestionItem/QuestionItem";
import { toast } from "react-toastify";

const QuestionPreview = () => {
    const apiUrl = process.env.REACT_APP_BASE_URL;
    const questionDetailsKey = process.env.REACT_APP_EXAMDETAILS_AUTH;
    let subject = JSON.parse(
        sessionStorage.getItem(questionDetailsKey)
    ).subject;

    subject = subjectNameConverter(subject);

    const [question, setQuestion] = useState([]);
    const [loading, setLoading] = useState(true);

    function subjectNameConverter(subject) {
        subject = subject.trim();
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

    const fetchQuestion = async () => {
        try {
            let subject = JSON.parse(
                sessionStorage.getItem(questionDetailsKey)
            ).subject;

            subject = subjectNameConverter(subject);
            const url = `${apiUrl}/${subject}-question`;
            setLoading(true);
            const response = await fetch(url);
            const result = await response.json();
            if (result.status) {
                setQuestion(result.response);
            } else {
                setQuestion([])
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        fetchQuestion();
    }, []);

    const deleteQuestion = async (_id) => {
        try {
            const url = `${apiUrl}/${subject}-question/${_id}`;

            const confirm = window.confirm("Are you Sure");
            if (confirm) {
                const response = await fetch(url, {
                    method: "DELETE",
                });

                const result = await response.json();
                if (result.status) {
                    toast.success(result.message);
                    fetchQuestion();
                } else {
                    toast.error(result.message);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editQuestion = (_id) => {
        alert("This feature is not yet Implemented..");
    };

    return (
        <div className="questionPreviewContainer">
            {loading && <h1>Loading...</h1>}

            {question.length === 0 && <h1>No Question Found</h1>}

            {question.length > 0 &&
                !loading &&
                question.map((data, idx) => {
                    return (
                        <QuestionItem
                            key={idx}
                            data={data}
                            questionNumber={idx + 1}
                            deleteQuestion={deleteQuestion}
                            editQuestion={editQuestion}
                        />
                    );
                })}
        </div>
    );
};

export default QuestionPreview;
