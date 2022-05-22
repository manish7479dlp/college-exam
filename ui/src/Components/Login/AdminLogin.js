import "./LoginCss.css";
import Header from "../Heading/Header";
import Button from "../Buttons/Button";
import { useState } from "react";

const AdminLogin = () => {
    const initialData= {
        userId : "",
        password : ""
    }
    const [Data , setData] = useState(initialData);
  
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(Data);
        setData(initialData);
    }

    const onInputChangeHandler = (event) => {
       
        const {name , value} = event.target;

        setData((pre) => {
            return {...pre , [name] : value}
        })

        
    }

  return (
    <>
      <Header />
      <div className="center studentContainer">
        <form onSubmit={onSubmit}>
        <div className="center studentLoginContainer">
          <h1>Admin Log In</h1>
          <div>
            <p>User Id: </p>
            <input type="number" name="userId" onChange={onInputChangeHandler} value = {Data.universityRoll} />
          </div>
          <div>
            <p>Password: </p>
            <input type="password" name="password" onChange={onInputChangeHandler} value = {Data.password} />
          </div>
          <Button type = {"submit"} name="Sign In" />
        </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
