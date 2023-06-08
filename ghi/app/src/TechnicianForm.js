import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';



function TechnicianForm(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    const navigate = useNavigate()

    const handleFirstNameChange = (event) => {
        const value = event.target.value
        setFirstName(value)
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value
        setLastName(value)
    }

    const handleEmployeeIdChange = (event) => {
        const value = event.target.value
        setEmployeeId(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId

        const techUrl =  "http://localhost:8080/api/technicians/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          }

        const response = await fetch(techUrl, fetchConfig);
        if (response.ok) {
            const newTech = await response.json();

        setFirstName('')
        setLastName('')
        setEmployeeId('')

        navigate('/technicians')
        window.location.reload()
        
      } 


    }


    return (
    <div className="row">
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
        <h1>Add a new Technician</h1>
        <form onSubmit={handleSubmit} id="create-location-form">
          <div className="form-floating mb-3">
          <input onChange={handleFirstNameChange} placeholder="First Name" required
      type="text" value={firstName} name="first_name" id="first_name"
          className="form-control" />
            <label htmlFor="firstName">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleLastNameChange} placeholder="First Last" required
                type="text" value={lastName} name="last_name" id="last_name"
                className="form-control" />
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEmployeeIdChange} placeholder="Employee Id" required
                type="text" value={employeeId} name="employee_id" id="employee_id"
                className="form-control" />
                <label htmlFor="employeeId">Employee Id</label>
              </div>
         <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>
  
  )
}

export default TechnicianForm