import { Outlet , Navigate } from "react-router-dom";
const StudentLoginPrivateComponent = () => {
    const auth = sessionStorage.getItem("StudentDetail");
    return auth ? <Outlet/> :< Navigate to ="/studentlogin" />
}

export default StudentLoginPrivateComponent;