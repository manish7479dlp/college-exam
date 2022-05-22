import "./StudentDetails.css"

const StudentDetails = () => {
    // let StudentDetail = localStorage.getItem("StudentDetail");
    let StudentDetail = sessionStorage.getItem("StudentDetail");
    StudentDetail =  JSON.parse(StudentDetail)
    // console.log(StudentDetail);
    return (
        <>
           <div className="center studentDetailContainer">
               <div className="imgContainer"></div>
                <p className="studentUniversityRoll">Univ-Roll: {StudentDetail ? StudentDetail.universityRoll : "****"}</p>
                <p className="studentName">Name: {StudentDetail ? StudentDetail.name : "****"}</p>
                <p className="studentDepartment">Department: {StudentDetail ? StudentDetail.department : "****"}</p>
           </div>
        </>
    )
}

export default StudentDetails;