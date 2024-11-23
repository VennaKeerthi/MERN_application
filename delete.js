import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import "bootstrap/dist/css/bootstrap.min.css";

function DeleteEmployee() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onsubmit = async (data) => {
    try {
      const response = await axios.delete(`http://localhost:3000/deleteEmp/${data.empid}`);
      if (response.status === 200) {
        alert("Employee deleted successfully");
        reset();
      } else {
        alert("Employee not found");
      }
    } catch (error) {
      alert("Error occurred while deleting the employee.");
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      Employee ID: &nbsp;
      <input type='text' {...register("empid", { required: true })} /><br />
      {errors.empid && <p>Employee ID is required</p>}<br />

      <button
                type="submit"
                className="btn btn-success w-10"
                style={{
                  backgroundColor: "#4CAF50",
                  border: "none",
                 
                }}
              >
                Submit
          </button> &emsp;&emsp;
          <button
                type="button"
                className="btn btn-success w-10"
                style={{
                  backgroundColor: "#4CAF50",
                  border: "none",
                  
                }}
                onClick={handleReset}
              >
                Reset
              </button> <br/><br/>
    </form>
  );
}

export default DeleteEmployee;
