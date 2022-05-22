import { Outlet , Navigate } from "react-router-dom";

const TeacherLoginPrivateComponent = () => {
    const auth = sessionStorage.getItem("TeacherDetail");
    return auth ? <Outlet /> : <Navigate to = "/teacherlogin" /> 
}

export default TeacherLoginPrivateComponent;