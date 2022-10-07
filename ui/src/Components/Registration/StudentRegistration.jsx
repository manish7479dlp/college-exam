import react, { useState } from "react";
import {toast} from "react-toastify"
import "./StudentRegistrationStyle.css";

const StudentRegistration = () => {
    const initialData = {
        name: "",
        department: "",
        year: "",
        universityRoll: "",
    };

    const [inputFieldData, setInputFieldData] = useState(initialData);

    const onChangeHandler = (event) => {
        setInputFieldData((preData) => {
            return { ...preData, [event.target.name]: event.target.value };
        });
    };

    const submitStudentDetails = async () => {
        const url = `${process.env.REACT_APP_BASE_URL}/student`;

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
                    <h2>Student Registration</h2>

                    <div>
                        <label>University Roll:</label>
                        <br />
                        <input
                            type="number"
                            name="universityRoll"
                            value={inputFieldData.universityRoll}
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
                        <label>Year:</label>
                        <br />
                        <select
                            name="year"
                            value={inputFieldData.year}
                            onChange={onChangeHandler}
                        >
                            <option>**Choose**</option>
                            <option value={1}>1st</option>
                            <option value={2}>2nd</option>
                            <option value={3}>3rd</option>
                            <option value={4}>4th</option>
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

export default StudentRegistration;
