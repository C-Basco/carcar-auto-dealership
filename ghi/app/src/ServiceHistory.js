import { Link } from 'react-router-dom';
import React, {useEffect, useState } from 'react';


function ListServiceHistory(){
    const [appointments, setAppointments] = useState('')
    const [vins, setVins] = useState('')
    const [vinInput, setVinInput] = useState('')

    let sumbittedInput = false
  
    const fetchData = async () => {
      const appointmentUrl = 'http://localhost:8080/api/appointments/';
      const vinUrl = 'http://localhost:8100/api/automobiles/'
      const appointmentResponse = await fetch(appointmentUrl);
      const vinResponse = await fetch(vinUrl);
      
      
      if (appointmentResponse.ok && vinResponse.ok) {
        const appointmentData = await appointmentResponse.json();
        const vinData = await vinResponse.json()
        setAppointments(appointmentData.appointments);
        setVins(vinData.vins)        
      }
    }
    useEffect(() => {
      fetchData();     
    }, []);
    

    const handleVinInputChange = (event) => {
        const value = event.target.value;
        setVinInput(value)

    }
    

   
    if(!appointments){
      return null

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data["input"] = vinInput
        console.log(vinInput)

        let appointmentsBySearchedVin = appointments.filter(appointment => appointment.vin === vinInput)
        console.log(appointmentsBySearchedVin)
        

        setVinInput('')
        


    }

    


    return (
    <div>
    <h3>Service History</h3>
    <div>
        <form onSubmit={handleSubmit} id="vin-search-form">
            <input onChange={handleVinInputChange}type="text" placeholder="Search by Vin"id="vin" className="vin"value={vinInput}/>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
  <table className="table table-striped">
    <thead>
      <tr>
        <th>VIN</th>
        <th>Customer</th>
        <th>Date</th>
        <th>Time</th>
        <th>Technician</th>
        <th>Status</th>
        <th>Reason</th>
        <th>Is VIP?</th>
      </tr>
    </thead>
    <tbody>
      {appointments.map(appointment => {
        return (
          <tr key={ appointment.id }>
            <td>{ appointment.vin }</td>
            <td>{ appointment.customer }</td>
            <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
            <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
            <td>{ appointment.technician.employee_id }</td>
            <td>{ appointment.status }</td>
            <td>{ appointment.reason }</td>

            
          </tr>
        );
      })}
    </tbody>
  </table>
  </div>
  )
}

export default ListServiceHistory