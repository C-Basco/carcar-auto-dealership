import React, { useEffect, useState } from 'react';


function AutomobileForm() {

    const[models, setModels] =useState([]);

    const [formData, setFormData] = useState({
      color: '',
      year: '',
      vin: '',
      model: '',
    });

    const fetchModelsData = async () => {
      const url = 'http://localhost:8100/api/models/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setModels(data.models)
      }
    };

    useEffect(() => {
        fetchModelsData();
      }, []);


      const handleSubmit = async (event) => {
        event.preventDefault();


        const AutoUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        }

        const response = await fetch(AutoUrl, fetchConfig);
          if (response.ok) {

            setFormData({
                color: '',
                year: '',
                vin: '',
                model: '',
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
        <>
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Submit a new Vehicle Model</h1>
              <form onSubmit={handleSubmit} id="create-customer-form">
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} placeholder="Color..." required type="text" name="color" id="color" className="form-control"/>
                  <label htmlFor="color">Enter Color</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handleFormChange} placeholder="Year" required type="number" name="year" id="year" className="form-control" />
                  <label htmlFor="year">Enter Year</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handleFormChange} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                  <label htmlFor="vin">Enter VIN</label>
                </div>
                <div className="mb-3">
                    <select onChange={handleFormChange} required name="models" id="Models" className="form-select">
                        <option value="">Choose a Manufacturer</option>
                        {models.map(model => {
                            return(
                                <option>
                                {model.name}
                                </option>
                        )
                     })};
                    </select>
                </div>
               <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
        </>
    )

}

export default AutomobileForm;
