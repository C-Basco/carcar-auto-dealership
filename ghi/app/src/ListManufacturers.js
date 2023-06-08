import { Link } from 'react-router-dom';
import React, {useEffect, useState } from 'react';


function ManufacturerList(){
    const [manufacturers, setManufacturer] = useState('')

    const fetchData = async () => {
        const url = "http://localhost:8100/api/manufacturers/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManufacturer(data.manufacturers)
        }
    }
    useEffect(() => {
        fetchData();
        
        
      }, []);
 
      if(!manufacturers){
        return null
  
      }

    return (
        <div>
            <h3>Manufacturers</h3>
            <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
        {manufacturers.map(manufacturer => {
          
            return (
              <tr key={manufacturer.id}>
                <td>{ manufacturer.name }</td>              
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

    )
}

export default ManufacturerList