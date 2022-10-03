import { Outlet, Navigate } from "react-router-dom";

const TeacherLoginPrivateComponent = () => {
    const authCheckName = "teacher";
    const auth = sessionStorage.getItem(authCheckName);
    return auth ? <Outlet /> : <Navigate to="/teacherlogin" />;
};

export default TeacherLoginPrivateComponent;
