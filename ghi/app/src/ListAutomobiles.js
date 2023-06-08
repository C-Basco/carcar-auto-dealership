import { Link } from 'react-router-dom';
import React, {useEffect, useState } from 'react';


function AutomobileList(){

    const [autos, setAutomobiles] = useState('')

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setAutomobiles(data.autos);
          
          
        }
      }
      useEffect(() => {
        fetchData();
        
        
      }, []);
     
      if(!autos){
        return null
  
      }

      function isSold(status){
        if(status === true){
            const value = "Yes"
            return value
        } else {
            const value = "No"
            return value
        }
      }
      console.log(autos)

    return(
        <div>
            <h3>Automobiles</h3>
            <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
        {autos.map(auto => {
          
            return (
              <tr key={auto.href}>
                <td>{ auto.vin }</td>
                <td>{ auto.color }</td>
                <td>{ auto.year }</td>
                <td>{ auto.model.name }</td>
                <td>{ auto.model.manufacturer.name }</td>
                <td>{ isSold(auto.sold) }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    )

}

export default AutomobileList