import { Link } from 'react-router-dom';
import React, {useEffect, useState } from 'react';

function TechnicianList() {
  

    const [technicians, setTechnicians] = useState('')
  
    const fetchData = async () => {
      const url = 'http://localhost:8080/api/technicians/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians);
        
        
      }
    }
    useEffect(() => {
      fetchData();
      
      
    }, []);

   
    if(!technicians){
      return null

    }

    return (
        <div>
            <h3>Service Technicians</h3>
            <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
        {technicians.map(tech => {
          
            return (
              <tr key={tech.id}>
                <td>{ tech.employee_id }</td>
                <td>{ tech.first_name }</td>
                <td>{ tech.last_name }</td>                
              </tr>
            );
          })}
        </tbody>
      </table>

        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/technicians/new" className="btn btn-primary btn-lg px-4 gap-3">Add a Tech</Link>
        </div>
      </div>
    );
  }

  export default TechnicianList