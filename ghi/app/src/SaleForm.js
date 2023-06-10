import React, { useEffect, useState } from 'react';


function SaleForm() {

  const[customers, setCustomers] = useState([]);
  const[salespeople, setSalespeople] = useState([]);
  const[automobiles, setAutomobiles] = useState([]);
  const[sales,setSales] = useState([]);

  const[customer,setCustomer] = useState('');
  const[salesperson, setSalesperson] = useState('');
  const[automobile, setAutomobile] = useState('');
  const[price, setPrice] = useState('');

  const fetchSalesData = async () => {
    const url = 'http://localhost:8090/api/sales/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales)
    }
  };

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
    fetchSalesData();
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


const handleSubmit = async (event) => {
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

  const response = await fetch(SalesUrl, fetchConfig);
    if (response.ok) {
      const newSale = await response.json();
      console.log(newSale);
      const saleId = newSale.sale.id;
      console.log(saleId);
      HandleSold(saleId);

      setCustomer('');
      setSalesperson('');
      setAutomobile('');
      setPrice('');
    }
  }

  async function HandleSold(saleId) {
    const url = `http://localhost:8090/api/sales/${saleId}/sold/`;
    const fetchSaleConfig = {
      method: 'PUT',
    }
    try {
      const response = await fetch(url, fetchSaleConfig);
      console.log(response);

      if (response.ok) {
        fetchAutoData();
        fetchSalesData();
      } else {
        console.error('Failed to mark sale as sold:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new sale</h1>
          <form onSubmit={handleSubmit} id="create-sale-form">
          <div className="mb-3">
              <select onChange={handleAutomobileChange} required name="automobile" id="automobile" value={automobile} className="form-select">
                <option value="">Automobile VIN</option>
                {automobiles.filter((auto) => !auto.sold && !sales.some((sale) => sale.automobile.vin === auto.vin))?.map(auto => {
                    return(
                    <option key={auto.vin} value={auto.vin}>
                      {auto.vin}
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
      <p>{sales.id}</p>
    </div>
  );
}

export default SaleForm;
