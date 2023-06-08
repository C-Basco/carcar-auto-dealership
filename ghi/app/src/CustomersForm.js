import React, { useState} from 'react';


function CustomerForm(props){

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const[address, setAddress] = useState('')

    const handleFirstNameChange = (event) => {
        const value = event.target.value
        setFirstName(value)
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value
        setLastName(value)

    }

    const handleAddressChange = (event) => {
        const value = event.target.value
        setAddress(value)
    }

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value
        setPhoneNumber(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.phone_number = phoneNumber;
        data.address = address;


        const customersUrl = "http://localhost:8090/api/customers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          }

        const response = await fetch(customersUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();

        setLastName('');
        setFirstName('');
        setPhoneNumber('');
        setAddress('');
        }


    }



    return (
        <>
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Submit a new Customer</h1>
              <form onSubmit={handleSubmit} id="create-customer-form">
                <div className="form-floating mb-3">
                  <input onChange={handleFirstNameChange} placeholder="firstName" required type="text" value={firstName} name="firstName" id="firstName" className="form-control"/>
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleLastNameChange} placeholder="Last Name" required type="text" value={lastName} name="lastName" id="lastName" className="form-control"/>
                  <label htmlFor="lastName">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handlePhoneNumberChange} placeholder="Phone Number" required type="text" value={phoneNumber} name="phoneNumber" id="phoneNumber" className="form-control" />
                  <label htmlFor="phoneNumber">Phone Number</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handleAddressChange} placeholder="Address" required type="text" value={address} name="address" id="address" className="form-control" />
                  <label htmlFor="address">Address</label>
                </div>
               <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
        </>
    )


}

export default CustomerForm
