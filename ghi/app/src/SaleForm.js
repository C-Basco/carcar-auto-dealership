import React, { useEffect, useState } from 'react';


function SaleForm(props) {

  const [customers, setCustomers] = useState([]);
  const[salespeople, setSalespeople] =useState([]);
  const[automobiles, setAutomobiles] =useState([]);

  const [formData, setFormData] = useState({
    price: '',
    customer: '',
    salesperson: '',
    automobile: '',
  });

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
      const customersData = await customersResponse.json();
      setCustomers(customersData.customers)
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


  const handleSubmit = async (event) => {
    event.preventDefault();


    const SalesUrl = 'http://localhost:8090/api/sales/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(SalesUrl, fetchConfig);
      if (response.ok) {

        setFormData({
            price: '',
            customer: '',
            salesperson: '',
            automobile: '',
        });
      }
  }

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
        ...formData,

        [inputName]: value
    });
  }


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new sale</h1>
          <form onSubmit={handleSubmit} id="create-sale-form">
          <div className="mb-3">
              <select onChange={handleFormChange} required name="automobile" id="automobile" className="form-select">
                <option value="">Automobile VIN</option>
                {automobiles?.map(automobile => {
                    return(
                    <option key={automobile.vin} value={automobile.vin}>
                      {automobile.vin}
                    </option>
                    )
                })};
              </select>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} required name="salesperson" id="salesperson" className="form-select">
                <option value="">Choose a Salesperson</option>
                {salespeople?.map(salesperson => {
                    return(
                    <option value={salesperson}>
                      {salesperson.first_name} {salesperson.last_name}
                    </option>
                    )
                })};
              </select>
            </div>
            <div className="mb-3">
              <select onChange={handleFormChange} required name="customer" id="customer" className="form-select">
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
            <div className="form-floating mb-3">
              <input  onChange={handleFormChange} placeholder="Price" required type="text" name="price" id="price"  className="form-control" />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SaleForm;
