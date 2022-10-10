import "./LoginCss.css";
import Header from "../Heading/Header";
import Button from "../Buttons/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DailogBox from "../DailogBox/DailogBox";

const AdminLogin = () => {
  const authCheckName = process.env.REACT_APP_ADMIN_AUTH;
  const apibaseURL = process.env.REACT_APP_BASE_URL;

  const Navigate = useNavigate();
  const [display, setDisplay] = useState({ display: "none" });

  useEffect(() => {
    const auth = sessionStorage.getItem(authCheckName);
    if(auth) {
      Navigate("/admin-dashboard")
    }
  },[]);
  const initialData = {
    userId: "",
    password: "",
  };
  const [Data, setData] = useState(initialData);

  const onSubmit = async (event) => {
    try {
      const url = `${apibaseURL}/admin-login`;
      event.preventDefault();
    
      
      const response = await fetch(url , {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Data)
      })

      const result = await response.json();
      
      if(result.status) {
        toast.success(result.message)
        sessionStorage.setItem(authCheckName , JSON.stringify(result.response));
        Navigate("/admin-dashboard")
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
        <DailogBox opt1={"Student Detail's Set Section"} opt2 = {"Teacher Detail's Set Section"}
        opt1Url = {"/studentinfodetails"}
        opt2Url = {"/teacherdetails"}/>
      </div>
      <div className="center studentContainer">
        <form onSubmit={onSubmit}>
          <div className="center studentLoginContainer">
            <h1>Admin Log In</h1>
            <div>
              <p>User Id: </p>
              <input
                type="number"
                name="userId"
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

export default AdminLogin;
