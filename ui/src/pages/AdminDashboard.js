import "./AdminDashboardStyle.css";
const AdminDashboard = () => {
    return (
        <div className="adminDashboardContainer">
            <div className="adminDashboardHeader">
                <h3>Manish Kumar</h3>
                <h1>Admin Dashboard</h1>
                <input type="text" placeholder="Searching" />
            </div>

            <div className="adminDashboardMainContantContainer">
                <div className="adminNavbar">
                    <p>Student Register</p>
                    <p>Teacher Register</p>
                    <p>First Year Student</p>
                    <p>Second Year Student</p>
                    <p>Third Year Student</p>
                    <p>Fourth Year Student</p>
                    <p>Student Marks</p>
                    <p>Logout</p>
                </div>

                {/* student registration */}
                <div className="studentRegistrationContainer">
                    <div className="registrationInputFieldContainer">
                        <h2>Student Registration</h2>

                        <div>
                            <label>University Roll:</label>
                            <br />
                            <input type="number" />
                        </div>

                        <div>
                            <label>Name:</label>
                            <br />
                            <input type="text" />
                        </div>

                        <div>
                            <label>Department:</label>
                            <br />
                            <select>
                                <option>**Choose**</option>
                                <option>CE</option>
                                <option>EE</option>
                                <option>CSE</option>
                                <option>ECE</option>
                            </select>
                        </div>

                        <div>
                            <label>Year:</label>
                            <br />
                            <select>
                                <option>**Choose**</option>
                                <option>1st</option>
                                <option>2nd</option>
                                <option>3rd</option>
                                <option>4th</option>
                            </select>
                        </div>

                        <div id = "submitButtonContainer">
                            <button type="submit">Submit</button>
                        </div>

                        {/* <button type="submit">Submit</button> */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
