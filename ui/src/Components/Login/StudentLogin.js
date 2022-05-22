import "./LoginCss.css";
import Header from "../Heading/Header";
import Button from "../Buttons/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const apibaseURL = process.env.REACT_APP_API_URL || '';
  const Navigate = useNavigate();

  useEffect(() => {
    // const loginCheck = localStorage.getItem("StudentDetail");
    const auth = sessionStorage.getItem("StudentDetail");
    if (auth !== null) {
      Navigate("/examstarterpage");
    }
  });
  const initialData = {
    universityRoll: "",
    password: "",
  };
  const [Data, setData] = useState(initialData);

  const onSubmit = async (event) => {
    try {
      const url = `${apibaseURL}/student/${Data.universityRoll}`;
      event.preventDefault();

      // const response = await fetch(url, { method: "GET" }); // it also work find
      const response = await fetch(url);
      // This code return the response in array of object formate..
      const finalData = await response.json();
      // console.log(finalData[0].password); this code give the password which is get from api.
      if (response.status !== 200) {
        toast.error("Invalid UniversityRoll.");
      } else {
        if (finalData[0].password === Data.password) {
          // localStorage.setItem("StudentDetail" , JSON.stringify(finalData[0]))
          sessionStorage.setItem("StudentDetail", JSON.stringify(finalData[0]));
          toast.success("Valid User.");
          setData(initialData);
          Navigate("/examstarterpage");
        } else {
          toast.error("Invalid Password.");
        }
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
