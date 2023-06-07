import { Link } from 'react-router-dom';
import React, {useEffect, useState } from 'react';

function AppointmentList(){

  const [appointments, setAppointments] = useState('')
  
    const fetchData = async () => {
      const url = 'http://localhost:8080/api/appointments/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments);
        
        
      }
    }
    useEffect(() => {
      fetchData();
      
      
    }, []);

   
    if(!appointments){
      return null

    }

    let currentAppointments = appointments.filter(appointment => appointment.status === "CONFIRMED")

    return(
    <div>
        <h3>Current Appointments</h3>
  <table className="table table-striped">
    <thead>
      <tr>
        <th>VIN</th>
        <th>Customer</th>
        <th>Date</th>
        <th>Time</th>
        <th>Technician</th>
        
        <th>Reason</th>
        <th>Is VIP?</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {currentAppointments.map(appointment => {
        return (
          <tr key={ appointment.id }>
            <td>{ appointment.vin }</td>
            <td>{ appointment.customer }</td>
            <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
            <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
            <td>{ appointment.technician.employee_id }</td>
            
            <td>{ appointment.reason }</td>
            <td>{ appointment.status }</td>

            
          </tr>
        );
      })}
    </tbody>
  </table>
  </div>
  )
}

export default AppointmentList