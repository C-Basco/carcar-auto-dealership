import React, { useState} from 'react';


function SalespersonForm(props){

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [employeeID, setEmployeeID] = useState('')

    const handleFirstNameChange = (event) => {
        const value = event.target.value
        setFirstName(value)
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value
        setLastName(value)

    }

    const handleEmployeeIDChange = (event) => {
        const value = event.target.value
        setEmployeeID(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeID;


        const salespeopleUrl = "http://localhost:8090/api/salespeople/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          }

        const response = await fetch(salespeopleUrl, fetchConfig);
        if (response.ok) {
            const newSalespoeople = await response.json();

        setLastName('');
        setFirstName('');
        setEmployeeID('');
        }


    }



    return (
        <>
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Submit a new Salesperson</h1>
              <form onSubmit={handleSubmit} id="create-salesperson-form">
                <div className="form-floating mb-3">
                <input onChange={handleEmployeeIDChange} placeholder="EmployeeID" required type="text" value={employeeID} name="employeeID" id="employeeID" className="form-control" />
                  <label htmlFor="employeeID">Employee ID</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleFirstNameChange} placeholder="firstName" required type="text" value={firstName} name="firstName" id="firstName" className="form-control"/>
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleLastNameChange} placeholder="Last Name" required type="text" value={lastName} name="lastName" id="lastName" className="form-control"/>
                  <label htmlFor="lastName">Last Name</label>
                </div>
               <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
        </>
    )


}

export default SalespersonForm
