import "./LoginDashboard.css";
import Header from "../../Heading/Header";
import Card from "../../Cards/Card";
import { useNavigate } from "react-router-dom";

const LoginDashboard = () => {
  const Navigate = useNavigate();
  const onClick = (id) => {
    switch (id) {
      case 0:
        Navigate("/studentlogin");
        break;
      case 1:
        Navigate("/teacherlogin");
        break;
      case 2:
        Navigate("/adminlogin");
        break;
      default:
        console.log("Invalid data..");
    }
  };
  return (
    <>
      <Header />
      <div className="center loginDashboardContainer">
        <Card
          id={1}
          name={"Log in"}
          heading={"Teacher Log-in"}
          content={
            "It is Teacher Login Section After Login, Teacher can Set Question's, Delete Question as Well as See The Marks of Examination."
          }
          onClick={onClick}
        />
        <Card
          id={0}
          name={"Log in"}
          heading={"Student Log-in"}
          content={
            "It is Student Login Section. Where Student Login and Go a Head For Examination. And It's a MCQ (Multiple Choice Based Examination)"
          }
          onClick={onClick}
        />

        <Card
          id={2}
          name={"Log in"}
          heading={"Admin Log-in"}
          content={
            "It is Admin Login Section After Login, Admin Can Enter the Detail's of Student as well as Teacher and also Edit and Delete Operation is Performed."
          }
          onClick={onClick}
        />
      </div>
    </>
  );
};

export default LoginDashboard;
