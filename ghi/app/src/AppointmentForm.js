import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


function AppointmentForm(){
    const [technicians, setTechnicians] = useState([])
    const [vin, setVin] = useState('')
    const [customer, setCustomer] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [technician, setTechnician] = useState('')
    const [reason, SetReason] = useState('')


 const fetchData = async () => {
        const url = "http://localhost:8080/api/technicians/";
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTechnicians(data.technicians);
        }
      }
    
      useEffect(() => {
        fetchData();
      }, []);




    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
      }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
      }

    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
      }

    const handleTimeChange = (event) => {
        const value = event.target.value;
        setTime(value);
    }

    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
      }

    const handleReasonChange = (event) => {
        const value = event.target.value;
        SetReason(value)
    }

    

      const handleSubmit = async (event) => {
        event.preventDefault();

        let dateTime = `${date}T12:${time}+00:00`
        

        const data = {};
        data.vin = vin;
        data.customer = customer;
        data.date_time = dateTime;
        data.technician = technician;
        data.reason = reason;

        const appointmentUrl =  "http://localhost:8080/api/appointments/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          }

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();

        setVin('')
        setCustomer('')
        setDate('')
        setTime('')
        setTechnician('')
        SetReason('')

        // navigate('/technicians')
        // window.location.reload()
        
      } else {
        console.log('did not submit')
        console.log(data)
        
      }
    }


    return (
        <div className="row">
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
        <h1>Add an Appointment </h1>
        <form onSubmit={handleSubmit} id="create-location-form">
          <div className="form-floating mb-3">
          <input onChange={handleVinChange} placeholder="VIN" required
            type="text" value={vin} name="vin" id="vin"
            className="form-control" />
            <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleCustomerChange} placeholder="Customer Name" required
                type="text" value={customer} name="customer" id=""
                className="form-control" />
                <label htmlFor="customer">Customer</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleDateChange} placeholder="Date" required
                type="date" value={date} name="date_time" id="date_time"
                className="form-control" />
                <label htmlFor="date">Date</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleTimeChange} placeholder="Time" required
                type="time" value={time} name="date_time" id="date_time"
                className="form-control" />
                <label htmlFor="date">Time</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleReasonChange} placeholder="Reason" required
                type="text" value={reason} name="reason" id="reason"
                className="form-control" />
                <label htmlFor="customer">Reason</label>
              </div>
              <div className="mb-3">
                <select onChange={handleTechnicianChange} required name="technician" value={technician} id="technician" className="form-select">
                <option value="">Choose a technician</option>
                {technicians.map(technician => {
                    return (
                    <option key={technician.id} value={technician.id}>
                        {technician.employee_id}
                    </option>
                    );
                })}
                </select>
                </div>

         <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>
    )
}

export default AppointmentForm