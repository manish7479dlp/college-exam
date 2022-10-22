import react, { useState } from "react";
import {toast} from "react-toastify"
import "./StudentRegistrationStyle.css";

const TeacherRegistration = () => {
    const initialData = {
        name: "",
        department: "",
        subject: "",
        userId: "",
    };

    const [inputFieldData, setInputFieldData] = useState(initialData);

    const onChangeHandler = (event) => {
        setInputFieldData((preData) => {
            return { ...preData, [event.target.name]: event.target.value };
        });
    };

    const submitStudentDetails = async () => {
        const url = `${process.env.REACT_APP_BASE_URL}/teacher`;


        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(inputFieldData),
        });

        const result = await response.json();

        if (result.status) {
            toast.success(result.message);
            setInputFieldData(initialData);
        } else {
            toast.error(result.message);
        }
    };
    return (
        <>
            <div className="studentRegistrationContainer">
                <div className="registrationInputFieldContainer">
                    <h2>Teacher Registration</h2>

                    <div>
                        <label>User Id:</label>
                        <br />
                        <input
                            type="number"
                            name="userId"
                            value={inputFieldData.userId}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div>
                        <label>Name:</label>
                        <br />
                        <input
                            type="text"
                            name="name"
                            value={inputFieldData.name}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div>
                        <label>Department:</label>
                        <br />
                        <select
                            name="department"
                            value={inputFieldData.department}
                            onChange={onChangeHandler}
                        >
                            <option>**Choose**</option>
                            <option value={"CE"}>CE</option>
                            <option value={"EE"}>EE</option>
                            <option value={"CSE"}>CSE</option>
                            <option value={"ECE"}>ECE</option>
                        </select>
                    </div>

                    <div>
                        <label>Subject:</label>
                        <br />
                        <select
                            name="subject"
                            value={inputFieldData.subject}
                            onChange={onChangeHandler}
                        >
                            <option>**Choose**</option>
                            <option>Generic</option>
                            <option>None</option>
                            
                        </select>
                    </div>

                    <div id="submitButtonContainer">
                        <button type="submit" onClick={submitStudentDetails}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherRegistration;
