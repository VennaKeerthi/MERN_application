import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddEmployee from "./add";
import UpdateEmployee from "./update";
import DeleteEmployee from "./delete";
import SearchEmployee from "./search";
import profile from "./profile.jpg";

const Dashboard = () => {
  const [operation, setOperation] = useState(""); 
  const [employees, setEmployees] = useState([]); 
  const [showEmployeeList, setShowEmployeeList] = useState(true); 
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      navigate("/"); 
    } else {
      fetchEmployees(); 
    }
  }, [username, navigate]);


  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Could not fetch employees.");
    }
  };

 
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/"); 
  };

  
  const toggleEmployeeList = () => {
    setShowEmployeeList((prev) => !prev); 
  };

  return (
    <div className="container mt-5">
      
      <h1 className="text-center">Welcome to Dashboard</h1>
      <div
        className="position-absolute top-0 end-0 d-flex align-items-center m-3"
        style={{ gap: "10px" }} 
        >
      <div
        style={{
        backgroundColor: "#4CAF50", 
        color: "#fff", 
        borderRadius: "5px", 
        padding: "5px 10px", 
         }}
        >
          Logged in as: <strong>Arjun</strong>
      </div>
      <button onClick={handleLogout} className="btn btn-danger">Logout</button>
    </div>

      
      <div className="text-center mt-4">
        <button
          onClick={toggleEmployeeList}
          className="btn btn-success w-10"
                style={{
                  backgroundColor: "#4CAF50",
                  border: "none",
                }}
        >
          {showEmployeeList ? "Hide Employee List" : "Show Employee List"}
        </button>
      </div>

      
      {showEmployeeList && (
        <div className="mt-4 pb-5">
          <h3>Employee List</h3>
          {employees.length > 0 ? (
            <table className="table table-bordered table-striped mt-3">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Designation</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Joining Date</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.EmpID}>
                    <td> 
                      <img src={profile} alt="Employee" width="100" height="50" />
                    </td>
                    <td>{employee.EmpId}</td>
                    <td>{employee.Name}</td>
                    <td>{employee.Email}</td>
                    <td>{employee.Mobile}</td>
                    <td>{employee.Designation}</td>
                    <td>{employee.Gender}</td>
                    <td>{employee.Course}</td>
                    <td>{new Date(employee.CreateDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No employees found.</p>
          )}
        </div>
      )}

     
      <div className="mt-4">
        <h3>Select Operation</h3>
        <input
          type="text"
          className="form-control text-lowercase w-75" 
          placeholder="enter operation: add, update, delete, search"
          onChange={(e) => setOperation(e.target.value.toLowerCase())}
        />
        <button
          onClick={() => setOperation("")}
          className="btn mt-2 btn-secondary"
        >
          Reset
        </button>
      </div>

      
      <div className="mt-4">
        {operation === "add" && (
          <div>
            <h3>Create Employee</h3>
            <AddEmployee />
          </div>
        )}
        {operation === "update" && (
          <div>
            <h3>Update Employee</h3>
            <UpdateEmployee />
          </div>
        )}
        {operation === "search" && (
          <div>
            <h3>Search Employee</h3>
            <SearchEmployee />
          </div>
        )}
        {operation === "delete" && (
          <div>
            <h3>Delete Employee</h3>
            <DeleteEmployee />
          </div>
        )}
        {operation === "" && <p>Please select an operation to perform.</p>}
      </div>
    </div>
  );
};

export default Dashboard;