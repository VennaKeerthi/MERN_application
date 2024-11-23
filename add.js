import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import "bootstrap/dist/css/bootstrap.min.css";

function AddEmployee() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onsubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/addEmp", {
        EmpId: data.empid,
        Name: data.name,
        Email: data.email,
        Mobile: data.mobile,
        Designation: data.designation,
        Gender: data.gender,
        Course: data.course,
        CreateDate: data.joiningdate
      });
      alert("Employee added successfully");
    } catch (error) {
      alert("Error");
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

      Name: &nbsp;
      <input type='text' {...register("name", { required: true })} /><br />
      {errors.name && <p>Name is required</p>}<br />

      Email: &nbsp;
      <input type='email' {...register("email", { required: true })} /><br />
      {errors.email && <p>Email is required</p>}<br />

      Mobile: &nbsp;
      <input type='text' {...register("mobile", { required: true })} /><br />
      {errors.mobile && <p>Mobile is required</p>}<br />

      Designation: &nbsp;
      <input type='text' {...register("designation", { required: true })} /><br />
      {errors.designation && <p>Designation is required</p>}<br />

      Gender: &nbsp;
      <input type='text' {...register("gender", { required: true })} /><br />
      {errors.gender && <p>Gender is required</p>}<br />

      Course: &nbsp;
      <input type='text' {...register("course", { required: true })} /><br />
      {errors.course && <p>Course is required</p>}<br />

      Joining Date: &nbsp;
      <input type='date' {...register("joiningdate", { required: true })} /><br />
      {errors.joiningdate && <p>Joining Date is required</p>}<br />

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
              </button><br/><br/>
    </form>
  );
}

export default AddEmployee;
