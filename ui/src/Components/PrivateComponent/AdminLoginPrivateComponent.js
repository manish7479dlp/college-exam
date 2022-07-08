import { Outlet , Navigate } from "react-router-dom";
const AdminLoginPrivateComponent = () => {
    const auth = sessionStorage.getItem("AdminDetail");
    return auth ? <Outlet/> :< Navigate to ="/adminlogin" />
}

export default AdminLoginPrivateComponent;