import { Outlet, Navigate } from "react-router-dom";
const StudentLoginPrivateComponent = () => {
    const authCheckName = "student";
    const auth = sessionStorage.getItem(authCheckName);
    return auth ? <Outlet /> : <Navigate to="/studentlogin" />;
};

export default StudentLoginPrivateComponent;
