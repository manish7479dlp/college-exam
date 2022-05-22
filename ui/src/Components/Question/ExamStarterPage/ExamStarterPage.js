import { useNavigate } from "react-router-dom";
import Header from "../../Heading/Header";
import "./ExamStarterPage.css";

const ExamStarterPage = () => {
     const Navigate = useNavigate();
    const onClick = () => {
        Navigate("/question");
    }

    // const subjectName = ["Data Structure and Algorithm" ,"Basic Electric", "Maths" , "Biology" , "Environmental Science" , "Theory of Computation" , "Computer Architecture" ];
       const firstSemester = ["Basic Electric" , "Math1" , "Physics" , "Data Structure And Algorithm" ];
    // this function set the examSubjectName the sessionStorage with key (ExamSubjectName)
    const getExamSubjectName = (ExamSubjectName) => {
          sessionStorage.setItem("ExamSubjectName" , JSON.stringify(ExamSubjectName));
          Navigate("/question");
    }

    return(
        <>
           <Header/>
           <div className = "center examstarterpageContainer">
               <ol className="subjectList">
                  {
                      firstSemester.map((elm , idx) => {
                        return <li key={idx} onClick = {() => {getExamSubjectName(elm)}}>{elm} </li>
                    })
                  }
               </ol>
               {/* <Button name = "Start Exam" onClick = {onClick}/> */}
               
           </div>
        </>
    )
}

export default ExamStarterPage;