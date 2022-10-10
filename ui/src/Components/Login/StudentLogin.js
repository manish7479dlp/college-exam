import "./LoginCss.css";
import Header from "../Heading/Header";
import Button from "../Buttons/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const apibaseURL = process.env.REACT_APP_BASE_URL || "";
  const authCheckName = process.env.REACT_APP_STUDENT_AUTH || "";


  const Navigate = useNavigate();

  useEffect(() => {
    // const loginCheck = localStorage.getItem("StudentDetail");
    const auth = sessionStorage.getItem(authCheckName);
    if (auth !== null) {
      Navigate("/exam-starter-page");
    }
  },[]);
  const initialData = {
    universityRoll: "",
    password: "",
  };
  const [Data, setData] = useState(initialData);

  const onSubmit = async (event) => {
    try {
      const url = `${apibaseURL}/student-login`;
      event.preventDefault();

      const response = await fetch(url , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data)
      })

      const result = await response.json();

      if(result.status) {
        toast.success(result.message);
        sessionStorage.setItem(authCheckName , JSON.stringify(result.response));
      Navigate("/exam-starter-page");
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
      <div className="center studentContainer">
        <form onSubmit={onSubmit}>
          <div className="center studentLoginContainer">
            <h1>Student Log In</h1>
            <div>
              <p>University Roll: </p>
              <input
                type="number"
                name="universityRoll"
                onChange={onInputChangeHandler}
                value={Data.universityRoll}
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

export default StudentLogin;
