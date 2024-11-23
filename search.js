import React, { useState } from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import "bootstrap/dist/css/bootstrap.min.css"
import Button from 'react-bootstrap/Button'

function SearchEmployee()
{
    const {register, handleSubmit, reset, formState : {errors}} = useForm();
    const [employee,setEmployee]=useState(null);

    const onsubmit = async(d) => {
        try
        {
            const response=await axios.get(`http://localhost:3000/searchEmp/${d.empid}`);
            if(response.data)
            {
                alert("Order found");
                setEmployee(response.data);
            }
            else
            {
                alert("Order not found");
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
            
            <Button variant='primary' size='lg' type='submit'>Submit</Button>&emsp;&emsp;
            <Button variant='primary' size='lg' type='button' onClick={handleReset}>Reset</Button><br/><br/>

            {employee && (
                <textarea rows="10" className='w-50' value={JSON.stringify(employee, null, 2)} readOnly />
            )}

        </form>
    );
}
export default SearchEmployee;