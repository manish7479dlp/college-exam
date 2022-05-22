import { useState } from "react";
import { toast } from "react-toastify";
import Header from "../../Heading/Header";
import "./TeacherDetails.css";

const TeacherDetails = () => {
  const apibaseURL = process.env.REACT_APP_API_URL || '';

  const initialData = { userId: "", name: "", department: "", subject: "" };
  const [inputData, setInputData] = useState(initialData);
  const onSubmit = async (event) => {
    try {
      const url = `${apibaseURL}/teacher`
      event.preventDefault();
      const response = await fetch(url ,{
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(inputData)
      } )

      if(response.status === 200) {
        toast.success("Data inserted Successfully.");
        setInputData(initialData);
      } else {
        toast.warning("This User already Exist.")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setInputData((pre) => {
      return { ...pre, [name]: value };
    });
  };

  return (
    <>
      <Header />
      <div className="center studentDetailsUIContainer">
        <div className=" studentDetailsContainer ">
          <h1 className="title">Teacher Details</h1>
          <form onSubmit={onSubmit}>
            <div className="studentInputDetails ">
              <label htmlFor="userId">UserId: </label>
              <input
                type="number"
                onChange={onInputChange}
                value={inputData.userId || ""}
                name="userId"
                id="userId"
                required
              />

              <label htmlFor="name">Name: </label>
              <input
                type="text"
                onChange={onInputChange}
                value={inputData.name || ""}
                name="name"
                id="name"
                required
              />

              <label htmlFor="department">Department: </label>
              <input
                type="text"
                onChange={onInputChange}
                value={inputData.department || ""}
                name="department"
                id="department"
                required
              />

              <label htmlFor="subject">Subject: </label>
              <input
                type="text"
                onChange={onInputChange}
                value={inputData.subject || ""}
                name="subject"
                id="subject"
                required
              />
            </div>

            <div className="addData">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TeacherDetails;
