import { useState } from "react";
import { toast } from "react-toastify";
import Header from "../Heading/Header";
import "./QuestionSetSection.css";

const QuestionSetSection = () => {
    const apibaseURL = "http://localhost:8000/api";
    const questionDetailsKey = "examDetails";

    const initialData = {
        question: "",
        opt1: "",
        opt2: "",
        opt3: "",
        opt4: "",
        answer: "",
    };

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

    const [data, setData] = useState(initialData);
    const onSubmit = async (event) => {
        try {
            event.preventDefault();
            let subject = JSON.parse(
                sessionStorage.getItem(questionDetailsKey)
            ).subject;
            subject = subjectNameConverter(subject);
            subject = subject + "-question";
            const url = `${apibaseURL}/${subject}`; //
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            // console.log("Status code is : " + response.status);
            const result = await response.json();
            if(result.status) {
                toast.success(result.message);
                setData(initialData)
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setData((pre) => {
            return { ...pre, [name]: value };
        });
    };
    return (
        <>
            {/* <Header /> */}
            <div className=" questionSetSectionContainer center">
                <div className="questionSetSection">
                    <h2 className="questionHeading">Question Set Section</h2>

                    <form onSubmit={onSubmit}>
                        <label>Question:</label>
                        <br></br>
                        <input
                            className="question"
                            type="text"
                            name="question"
                            value={data.question}
                            onChange={onInputChange}
                            // placeholder="How are you?"
                        />
                        <ol>
                            <li className="opt1">
                                <input
                                    type="text"
                                    name="opt1"
                                    value={data.opt1}
                                    onChange={onInputChange}
                                    // placeholder="Fine."
                                />
                            </li>
                            <li className="opt2">
                                <input
                                    type="text"
                                    name="opt2"
                                    value={data.opt2}
                                    onChange={onInputChange}
                                    // placeholder="Not Fine."
                                />
                            </li>
                            <li className="opt3">
                                <input
                                    type="text"
                                    name="opt3"
                                    value={data.opt3}
                                    onChange={onInputChange}
                                    // placeholder="Not Well."
                                />
                            </li>
                            <li className="opt4">
                                <input
                                    type="text"
                                    name="opt4"
                                    value={data.opt4}
                                    onChange={onInputChange}
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
                                value={data.answer}
                                onChange={onInputChange}
                            />
                            <button type="submit">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default QuestionSetSection;
