import "./AdminDashboardStyle.css"
const AdminDashboard = () => {
    return (
        <div className = "adminDashboardContainer">
          <div className="adminDashboardHeader">
              <h3>Manish Kumar</h3>
              <h1>Admin Dashboard</h1>
              <input type = "text" placeholder = "Searching"/>
          </div>

          <div className = "adminNavbar">
            <p>Student Register</p>
            <p>Teacher Register</p>
            <p>First Year Student</p>
            <p>Second Year Student</p>
            <p>Third Year Student</p>
            <p>Fourth Year Student</p>
            <p>Student Marks</p>
            <p>Logout</p>
          </div>

        

        </div>
    )
}

export default AdminDashboard;