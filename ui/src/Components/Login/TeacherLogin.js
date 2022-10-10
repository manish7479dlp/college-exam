import "./LoginCss.css";
import Header from "../Heading/Header";
import Button from "../Buttons/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DailogBox from "../DailogBox/DailogBox";

const TeacherLogin = () => {
    const authCheckName = process.env.REACT_APP_TEACHER_AUTH || "";
    const apibaseURL = process.env.REACT_APP_BASE_URL || "";

    const Navigate = useNavigate();
    const [display, setDisplay] = useState({ display: "none" });
    const initialData = {
        userId: "",
        password: "",
    };
    const [Data, setData] = useState(initialData);

    useEffect(() => {
        // const loginCheck = localStorage.getItem("StudentDetail");
        const auth = sessionStorage.getItem(authCheckName);

        if (auth) {
            Navigate("/teacher-dashboard");
        }
    });

    const onSubmit = async (event) => {
        try {
            const url = `${apibaseURL}/teacher-login`;
            event.preventDefault();
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Data),
            });

            const result = await response.json();

            if (result.status) {
                toast.success(result.message);
                sessionStorage.setItem(
                    authCheckName,
                    JSON.stringify(result.response)
                );
                Navigate("/teacher-dashboard");
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onInputChangeHandler = (event) => {
        const { name, value } = event.target;

        setData((pre) => {
            return { ...pre, [name]: value };
        });
    };

    return (
        <>
            <Header />
            <div className="center dailogContainer" style={display}>
                <DailogBox
                    opt1={"Question Set Section"}
                    opt2={"Student Marks Section "}
                    opt1Url={"/questiondetailsection"}
                    opt2Url={"/studentmarks"}
                />
            </div>
            <div className="center studentContainer">
                <form onSubmit={onSubmit}>
                    <div className="center studentLoginContainer">
                        <h1>Teacher Log In</h1>
                        <div>
                            <p>User Id: </p>
                            <input
                                type="number"
                                name="userId"
                                onChange={onInputChangeHandler}
                                value={Data.userId} // if we write Data.universityRoll it also work. why is it word i dont know.
                                required
                            />
                        </div>
                        <div>
                            <p>Password: </p>
                            <input
                                type="password"
                                name="password"
                                onChange={onInputChangeHandler}
                                value={Data.password}
                                required
                            />
                        </div>
                        <Button type={"submit"} name="Sign In" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default TeacherLogin;
