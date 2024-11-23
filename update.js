import React,{useState} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import "bootstrap/dist/css/bootstrap.min.css"


function UpdateEmployee()
{
    const {register, handleSubmit, reset, formState : {errors}} = useForm();
    const [employee,setEmployee]=useState(null);

    const onsubmit = async(d) => {
        try
        {
            const response=await axios.put(`http://localhost:3000/updateEmp/${d.empid}`, {Designation : d.designation});
            if(response.data)
            {
                alert("Employee found and Updated");
                setEmployee(response.data);
            }
            else
            {
                alert("Employee not found");
                setEmployee(null);
            }
            
        }
        catch(error)
        {
            alert("Error");
        }
    };

    const handleReset=()=>{
        reset();
    }

    return(
        <form onSubmit={handleSubmit(onsubmit)}>
            Employee ID : &nbsp;
            <input type='text' {...register("empid", {required : true})}/><br/>
            {errors.empid && <p>Employee ID is required</p>}<br/>

            Designation :&nbsp;
            <input type='text' {...register("designation", {required : true})}/><br/>
            {errors.designation && <p>Designation is required</p>}<br/>

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
            {employee && (
                <textarea rows="10" className='w-50' value={JSON.stringify(employee, null, 2)} readOnly />
            )}<br/><br/>

        </form>
    );
}
export default UpdateEmployee;