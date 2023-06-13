import { Link } from 'react-router-dom';
import React, { useEffect, useState} from 'react';


function CustomersList() {

  const [customers, setCustomers] = useState("");

	const fetchData = async () => {
		const url = "http://localhost:8070/api/customers/";
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			setCustomers(data.customers);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	if (!customers) {
		return null;
	}


    return (
        <>
      <div>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="new/" className="btn btn-primary btn-lg px-4 gap-3">Add a Customer</Link>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => {
                return (
                    <tr >
                        <td>{ customer.first_name }</td>
                        <td>{ customer.last_name}</td>
                        <td>{ customer.phone_number }</td>
                        <td>{ customer.address }</td>
                    </tr>
                );
            })}
          </tbody>
        </table>
      </div>
      </>
    );
  }

  export default CustomersList;
