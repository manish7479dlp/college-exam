import "./StudentDetails.css";

const StudentDetails = () => {
    const authCheckName = "student";
    // let StudentDetail = localStorage.getItem("StudentDetail");
    let StudentDetail = sessionStorage.getItem(authCheckName);
    StudentDetail = JSON.parse(StudentDetail);
    // console.log(StudentDetail);
    return (
        <>
            <div className="center studentDetailContainer">
                <div className="imgContainer"></div>
                <p className="studentUniversityRoll">
                    Univ-Roll:{" "}
                    {StudentDetail ? StudentDetail.universityRoll : "****"}
                </p>
                <p className="studentName">
                    Name: {StudentDetail ? StudentDetail.name : "****"}
                </p>
                <p className="studentDepartment">
                    Department:{" "}
                    {StudentDetail ? StudentDetail.department : "****"}
                </p>
                <p className="studentDepartment">
                    Year: {StudentDetail ? StudentDetail.year : "****"}
                </p>
            </div>
        </>
    );
};

export default StudentDetails;
