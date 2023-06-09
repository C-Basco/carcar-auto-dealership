import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function SaleForm() {
  const { saleID } = useParams();

  const[customers, setCustomers] = useState([]);
  const[salespeople, setSalespeople] =useState([]);
  const[automobiles, setAutomobiles] =useState([]);

  const[customer,setCustomer] = useState('');
  const[salesperson, setSalesperson] = useState('');
  const[automobile, setAutomobile] = useState('');
  const[price, setPrice] = useState('');



  const fetchSalespeopleData = async () => {
    const url = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespersons)
    }
  };


  const fetchCustomersData = async () => {
    const url = 'http://localhost:8090/api/customers/';
    const customersResponse = await fetch(url);
    if (customersResponse.ok) {
      const data = await customersResponse.json();
      setCustomers(data.customers)
    }
  };

  const fetchAutoData = async () => {
    const url = 'http://localhost:8100/api/automobiles/';
    const autoResponse = await fetch(url);
    if (autoResponse.ok) {
      const autoData = await autoResponse.json();
      setAutomobiles(autoData.autos);
    }
  };


  useEffect(() => {
    fetchSalespeopleData();
    fetchCustomersData();
    fetchAutoData();
  }, []);


  const handleSalespersonChange = (event) => {
    const value = event.target.value;
    setSalesperson(value);
}

const handleCustomerChange = (event) => {
    const value = event.target.value;
    setCustomer(value);
}

const handleAutomobileChange = (event) => {
    const value = event.target.value
    setAutomobile(value);
}
const handlePriceChange = (event) => {
  const value = event.target.value
  setPrice(value);
}

  const handleSubmit = async (event,saleID) => {
    event.preventDefault();

    const data = {};

    data.customer = customer;
    data.salesperson = salesperson;
    data.automobile = automobile;
    data.price = price;


    const SalesUrl = 'http://localhost:8090/api/sales/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    console.log(data);
    const response = await fetch(SalesUrl, fetchConfig);
      if (response.ok) {

        setCustomer('');
        setSalesperson('');
        setAutomobile('');
        setPrice('');
      }

    const url = `http://localhost:8090/api/sales/${saleID}/sold`;
    const fetchSaleConfig = {
      method: 'PUT',
    };
    try {
      const response = await fetch(url, fetchSaleConfig);
      if (response.ok) {
        console.log('Sale marked as sold!');
      } else {
        console.error('Failed to mark sale as sold:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  }


  let unsoldauto = automobiles.filter(automobile => automobile.sold === false);


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new sale</h1>
          <form onSubmit={handleSubmit} id="create-sale-form">
          <div className="mb-3">
              <select onChange={handleAutomobileChange} required name="automobile" id="automobile" value={automobile} className="form-select">
                <option value="">Automobile VIN</option>
                {unsoldauto?.map(automobile => {
                    return(
                    <option key={automobile.vin} value={automobile.vin}>
                      {automobile.vin}
                    </option>
                    )
                })};
              </select>
            </div>
            <div className="mb-3">
              <select onChange={handleCustomerChange} required name="customer" id="customer" value={customer} className="form-select">
                <option value="">Choose a Customer</option>
                {customers?.map(customer => {
                    return(
                    <option key={customer.id} value={customer.id}>
                      {customer.first_name} {customer.last_name}
                    </option>
                    )
                })};
              </select>
            </div>
            <div className="mb-3">
              <select onChange={handleSalespersonChange} required name="salespersons" id="salespersons" value={salesperson} className="form-select">
                <option value="">Choose a Salesperson</option>
                {salespeople?.map(salesperson => {
                    return(
                    <option key={salesperson.id} value={salesperson.id}>
                      {salesperson.first_name} {salesperson.last_name}
                    </option>
                    )
                })};
              </select>
            </div>
            <div className="form-floating mb-3">
              <input  onChange={handlePriceChange} placeholder="Price" required type="number" name="price" id="price" value={price} className="form-control" />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
      <p>{}</p>
    </div>
  );
}

export default SaleForm;
