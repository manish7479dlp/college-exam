import "./StudentInfoDetails.css";
import Header from "../../Heading/Header";
import { useState } from "react";
import {toast} from "react-toastify"

const StudentInfoDetails = () => {
  const apibaseURL = process.env.REACT_APP_API_URL || '';
  const initialData = { universityRoll: "", name: "", department: "", dob: "" };
  const [inputData, setInputData] = useState(initialData);

  const onSubmit = async (event) => {
    try {
      const url = `${apibaseURL}/student`
      event.preventDefault();
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if(response.status === 200) {
        toast.success("Data Inserted Successfully.")
        setInputData(initialData);
      } else {
        toast.warning("This Student is Already Added.")
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
          <h1 className="title">Student Details</h1>
          <form onSubmit={onSubmit}>
            <div className="studentInputDetails ">
              <label htmlFor="universityRoll">UniversityRoll: </label>
              <input
                type="number"
                onChange={onInputChange}
                value={inputData.universityRoll}
                name="universityRoll"
                id="universityRoll"
                required
              />

              <label htmlFor="name">Name: </label>
              <input
                type="text"
                onChange={onInputChange}
                value={inputData.name}
                name="name"
                id="name"
                required
              />

              <label htmlFor="department">Department: </label>
              <input
                type="text"
                onChange={onInputChange}
                value={inputData.department}
                name="department"
                id="department"
                required
              />

              <label htmlFor="dateOfBirth">Date of Birth: </label>
              <input
                type="date"
                onChange={onInputChange}
                value={inputData.dob}
                name="dob"
                id="dateOfBirth"
                required
              />
            </div>

            <div className="addData">
              <input type="submit" value={"submit"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentInfoDetails;
