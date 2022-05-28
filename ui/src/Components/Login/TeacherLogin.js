import "./LoginCss.css";
import Header from "../Heading/Header";
import Button from "../Buttons/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DailogBox from "../DailogBox/DailogBox";

const TeacherLogin = () => {
  const apibaseURL = process.env.REACT_APP_API_URL || "";

  const Navigate = useNavigate();
  const [display, setDisplay] = useState({ display: "none" });

  useEffect(() => {
    // const loginCheck = localStorage.getItem("StudentDetail");
    const auth = sessionStorage.getItem("TeacherDetail");

    if (auth !== null) {
      // Navigate("/dailogbox");
      if (display.display === "none") {
        setDisplay((pre) => {
          return { display: "flex" };
        });
      }
    }
  });
  const initialData = {
    userId: "",
    password: "",
  };
  const [Data, setData] = useState(initialData);

  // console.log(Data.userId);
  console.log(Data.universityRoll);

  const onSubmit = async (event) => {
    try {
      const url = `${apibaseURL}/teacher/${Data.userId}`;
      event.preventDefault();

      // const response = await fetch(url, { method: "GET" }); // it also work find
      const response = await fetch(url);
      // This code return the response in array of object formate..
      const finalData = await response.json();
      // console.log(finalData[0].password); this code give the password which is get from api.
      if (response.status !== 200) {
        toast.error("Invalid UserId.");
      } else {
        if (finalData[0].password === Data.password) {
          // localStorage.setItem("StudentDetail" , JSON.stringify(finalData[0]))
          sessionStorage.setItem("TeacherDetail", JSON.stringify(finalData[0]));
          toast.success("Valid User.");
          setData(initialData);
          if (display.display === "none") {
            setDisplay((pre) => {
              return { display: "flex" };
            });
          }
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
      <div className="center dailogContainer" style={display}>
        <DailogBox opt1={"Question Set Section"} opt2 = {"Student Marks Section "}
        opt1Url = {"/questiondetailsection"}
        opt2Url = {"/studentmarks"}
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
                value= {Data.userId} // if we write Data.universityRoll it also work. why is it word i dont know.
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
