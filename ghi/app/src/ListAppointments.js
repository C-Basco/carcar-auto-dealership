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

    return(<div>
        <h3>Current Appointments</h3>
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
    {/* <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="/technicians/new" className="btn btn-primary btn-lg px-4 gap-3">Add a Tech</Link>
    </div> */}
  </div>)
}

export default AppointmentList