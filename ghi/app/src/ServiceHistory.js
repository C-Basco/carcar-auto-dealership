import { Link } from 'react-router-dom';
import React, {useEffect, useState } from 'react';


function ListServiceHistory(){
    let [appointments, setAppointments] = useState('')
    const [vinInput, setVinInput] = useState('')
    const [autos, setAutomobiles] = useState('')

    const fetchData = async () => {
      const appointmentUrl = 'http://localhost:8080/api/appointments/';
      const automobileUrl = 'http://localhost:8100/api/automobiles/'
      const appointmentResponse = await fetch(appointmentUrl);   
      const automobileResponse = await fetch(automobileUrl);
      
      
      
      if (appointmentResponse.ok && automobileResponse.ok) {
        const appointmentData = await appointmentResponse.json();
        const automobileData = await automobileResponse.json()
        setAppointments(appointmentData.appointments);
        setAutomobiles(automobileData.autos)
        
         
      }
    }
    useEffect(() => {
      fetchData();     
    }, []);
    

    function isVIP(vin){
      const vipVins = autos.map(auto => auto.vin)
      
  
      if(vipVins.includes(vin)){
        const value = 'VIP ⭐️'
        return value
  
      } else {
        const value = 'No'
        return value
      }
      
    }



    const handleVinInputChange = (event) => {
        const value = event.target.value;
        setVinInput(value)

    }
    

   
    if(!appointments){
      return null

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {}
        data["input"] = vinInput

        let appointmentsBySearchedVin = appointments.filter(appointment => appointment.vin === vinInput)
        setAppointments(appointmentsBySearchedVin)

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
            <td>{ isVIP(appointment.vin)}</td>

            
          </tr>
        );
      })}
    </tbody>
  </table>
  </div>
  )
}

export default ListServiceHistory