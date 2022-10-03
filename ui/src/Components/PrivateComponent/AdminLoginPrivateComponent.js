import { Outlet , Navigate } from "react-router-dom";
const AdminLoginPrivateComponent = () => {
  const authCheckName = "admin"
    const auth = sessionStorage.getItem(authCheckName);
    return auth ? <Outlet/> :< Navigate to ="/adminlogin" />
}

export default AdminLoginPrivateComponent;