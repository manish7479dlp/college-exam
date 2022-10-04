import react, { useState, useEffect } from "react";
import "./QuestionPreview.css";
import Header from "../Heading/Header";
import QuestionItem from "../QuestionItem/QuestionItem";
import { toast } from "react-toastify";
import ContentName from "../Heading/ContentName";

const QuestionPreview = ({display}) => {
    const apibaseURL = process.env.REACT_APP_API_URL || "";
    const [subjectName, setSubjectName] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [editPopUp, setEditPopUp] = useState(false);
    const [editQuestionData, setEditQuestionData] = useState({});

    useEffect(() => {
        // setSubjectName(JSON.parse(sessionStorage.getItem("subjectName")));

        setSubjectName("Data Structure and Algorithm");

        if (subjectName) {
            setLoading(true);
            fetchQuestion();
        } else {
            setLoading(false);
        }
    }, [subjectName, refresh]);

    const QuestionEditComponent = (props) => {
        const apibaseURL = process.env.REACT_APP_API_URL || "";
        const initialData = {
            question: "",
            opt1: "",
            opt2: "",
            opt3: "",
            opt4: "",
            answer: "",
        };
        const [editData, setEditData] = useState(props.data);

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

        const onSubmit = async (event) => {
            try {
                event.preventDefault();
                // let subject = JSON.parse(
                //     sessionStorage.getItem("QuestionDetails")
                // ).subject;
                let subject = "Data Structure and Algorithm";
                subject = subjectNameConverter(subject);
                subject = subject + "_question";
                const url = `${apibaseURL}/${subject}/${editData._id}`; //
                const response = await fetch(url, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editData),
                });
                const result = await response.json();
                console.log(result);
                if (response.status !== 200) {
                    toast.warning("Question is not Updated..");
                    console.log(response);
                } else {
                    toast.success("Question Updated Successfully.");
                    setEditData(initialData);
                }
                setEditPopUp((pre) => {
                    return !pre;
                });
                setRefresh((pre) => {
                    return !pre;
                });
            } catch (error) {
                console.log(error);
            }
        };

        const onInputChange = (event) => {
            const { name, value } = event.target;
            setEditData((pre) => {
                return { ...pre, [name]: value };
            });
        };

        return (
            <>
                <div className=" questionEditComponentContainer center">
                    <div className="questionEditComponentQuestionSetSection questionSetSection">
                        <h2 className="questionHeading">
                            Question Edit Section
                        </h2>
                        <form onSubmit={onSubmit}>
                            <label>Question:</label>
                            <br></br>
                            <input
                                className="question"
                                type="text"
                                name="question"
                                value={editData.question}
                                onChange={onInputChange}
                                required
                                // placeholder="How are you?"
                            />
                            <ol>
                                <li className="opt1">
                                    <input
                                        type="text"
                                        name="opt1"
                                        value={editData.opt1}
                                        onChange={onInputChange}
                                        required
                                        // placeholder="Fine."
                                    />
                                </li>
                                <li className="opt2">
                                    <input
                                        type="text"
                                        name="opt2"
                                        value={editData.opt2}
                                        onChange={onInputChange}
                                        required
                                        // placeholder="Not Fine."
                                    />
                                </li>
                                <li className="opt3">
                                    <input
                                        type="text"
                                        name="opt3"
                                        value={editData.opt3}
                                        onChange={onInputChange}
                                        required
                                        // placeholder="Not Well."
                                    />
                                </li>
                                <li className="opt4">
                                    <input
                                        type="text"
                                        name="opt4"
                                        value={editData.opt4}
                                        onChange={onInputChange}
                                        required
                                        // placeholder="None of these."
                                    />
                                </li>
                            </ol>

                            <div className="center answerAndSubmitContainer">
                                <input
                                    className="answer"
                                    type="text"
                                    placeholder="Ans"
                                    name="answer"
                                    value={editData.answer}
                                    onChange={onInputChange}
                                    required
                                />
                                <button type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    };

    const editPopUpCloseButton = () => {
        setEditPopUp(!editPopUp);
    };

    const fetchQuestion = async () => {
        try {
            setLoading(true);
            let subject = subjectNameConverter(subjectName);
            subject = subject + "-question";

            const url = `${apibaseURL}/${subject}`;

            const response = await fetch(url);
            const result = await response.json();
            // console.log(result);
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

    const deleteQuestion = async (_id) => {
        const areYouSure = window.confirm("Are You Sure.");

        if (areYouSure) {
            try {
                let subject = subjectNameConverter(subjectName);
                subject = subject + "_question";

                const url = `${apibaseURL}/${subject}/${_id}`;
                const response = await fetch(url, {
                    method: "DELETE",
                });
                const result = await response.json();
                setRefresh((pre) => {
                    return !pre;
                });
                toast.success("Deleted Successfully.");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const editQuestion = (data) => {
        setEditQuestionData(data);
        setEditPopUp(!editPopUp);
    };

    const backButton = () => {
        window.history.back();
    }

    if (loading) {
        return <h1>Loading...</h1>;
    } else if (data.length == 0) {
        return <h1>Question not found...</h1>;
    }
    
    QuestionPreview.defaultProps = {
        display: true
    }

    return (
        <div className="questionPreviewMainContainer">
            {/* <Header /> */}
            {display && <ContentName title = {subjectName}/> }
            
            {display && <div className=" questionPreviewContainer">
                {data.map((item, idx) => {
                    return (
                        <QuestionItem
                            data={item}
                            key={idx}
                            questionNumber={idx + 1}
                            deleteQuestion={deleteQuestion}
                            editQuestion={editQuestion}
                        />
                    );
                })}

                 {/* this button work it is used to go back to previous open page */}
                {/* <button onClick= {backButton} className="backButton">
                 ◄
                </button> */}
            </div>}
            {!display && <div className=" questionPreviewContainer questionPreviewContainerHeight">
                {data.map((item, idx) => {
                    return (
                        <QuestionItem
                            data={item}
                            key={idx}
                            questionNumber={idx + 1}
                            deleteQuestion={deleteQuestion}
                            editQuestion={editQuestion}
                        />
                    );
                })}

                 {/* this button work it is used to go back to previous open page */}
                {/* <button onClick= {backButton} className="backButton">
                 ◄
                </button> */}
            </div>}

            <div
                className={
                    editPopUp
                        ? `${"editQuestionComponentContainer"}`
                        : `${"editQuestionComponentContainer displayNone"}`
                }
            >
                <QuestionEditComponent data={editQuestionData} />
                <button onClick={editPopUpCloseButton} className="closeBtn">
                    x
                </button>
                
            </div>
        </div>
    );
};

export default QuestionPreview;
