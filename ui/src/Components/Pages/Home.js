import "./Home.css";
import Header from "../Heading/Header";
import imgLink from "../../Images/illustration.png";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const Navigate = useNavigate();
  
  const onClick = () => {
      Navigate("/logindashboard")
  }

  return (
    <>
      <Header />
      <div className="center homeBody">
        <div className="center leftContent">
          <h2 className="title">MCET Online <i>Exam</i> Platform</h2>
          <p className="discription">
            Hey, This is MCET Online Exam Plateform. In This Plateform All the
            Student's of MCET have to give CA - (1 ,2 3, 4) Examination, In
            Online Mode. All the exam which is taken hear is MCQ (Multiple
            Choice Question) Based.
          </p>
          <Button onClick = {onClick} name = {"Get Start"} />
        </div>
        <div className="center rightContent">
          <img src={imgLink} alt="illustration img" />
        </div>
      </div>
    </>
  );
};

export default Home;
