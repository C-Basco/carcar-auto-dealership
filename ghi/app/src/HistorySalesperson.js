import React, { useEffect, useState } from 'react';

function SalespersonHistory() {

  const [salespeople, setSalespeople] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState('');
  const [salesHistory, setSales] = useState([]);

  const fetchSales = async () => {
    const url = 'http://localhost:8090/api/sales/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setSales(data.sales)
    }
  };

  const handleSalespersonChange = (event) => {
    setSelectedSalesperson(event.target.value)
  };

  const fetchSalespeopleData = async () => {
    const url = 'http://localhost:8090/api/salespeople/';
    const salesResponse = await fetch(url);
    if (salesResponse.ok) {
      const data = await salesResponse.json();
      setSalespeople(data.salespersons)
    }
  };

  useEffect(() => {
    fetchSalespeopleData();
    fetchSales();
  }, []);


    return (
        <>
      <div>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        </div>
        <h2>Sales History</h2>
      <div>
        <label htmlFor="salesperson">Select Salesperson:</label>
        <select id="salesperson" value={selectedSalesperson} onChange={handleSalespersonChange} className="form-select" >
          <option value="">Select a salesperson</option>
          {salespeople?.map(salesperson => (
            <option key={salesperson.employee_id} value={salesperson.employee_id}>
              {salesperson.first_name} {salesperson.last_name}
            </option>
          ))}
        </select>
      </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Salesperson</th>
              <th>Customer</th>
              <th>VIN</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {salesHistory?.filter(sale => sale.salesperson.employee_id === selectedSalesperson)?.map( sale => {
                return (
                    <tr key={sale.salesperson.id}>
                        <td>{ sale.salesperson.first_name } { sale.salesperson.last_name }</td>
                        <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                        <td>{ sale.automobile.vin }</td>
                        <td>{ sale.price }</td>
                    </tr>
                );
            })}
          </tbody>
        </table>
        <p>{selectedSalesperson}</p>
      </div>
      </>
    );
  }

  export default SalespersonHistory;
