import React, { useEffect, useState } from 'react';


function AutomobileForm() {

    const[models, setModels] =useState([]);
    const[model, setModel] = useState('');
    const[year, setYear] = useState('');
    const[vin, setVIN] = useState('');
    const[color, setColor] = useState('');


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

    const handleModelChange = (event) => {
      const value = event.target.value;
      setModel(value);
    }

    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }

    const handleVINChange = (event) => {
        const value = event.target.value
        setVIN(value);
    }

    const handleColorChange = (event) => {
      const value = event.target.value
      setColor(value);
  }


      const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.vin = vin;
        data.model_id = model;
        data.year = year;
        data.color = color;

        const AutoUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }

        const response = await fetch(AutoUrl, fetchConfig);
          if (response.ok) {

            setColor('');
            setModel('');
            setVIN('');
            setYear('');

          }
      }


      return (
        <>
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Submit a new Automobile to Inventory</h1>
              <form onSubmit={handleSubmit} id="create-automobile-form">
                <div className="form-floating mb-3">
                  <input onChange={handleColorChange} placeholder="Color..." required type="text" name="color" id="color" value={color} className="form-control"/>
                  <label htmlFor="color">Enter Color</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handleYearChange} placeholder="Year" required type="number" name="year" id="year" value={year} className="form-control" />
                  <label htmlFor="year">Enter Year</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handleVINChange} placeholder="VIN" required type="text" name="vin" id="vin" value={vin} className="form-control" />
                  <label htmlFor="vin">Enter VIN</label>
                </div>
                <div className="mb-3">
                    <select onChange={handleModelChange} required name="model" id="model" value={model} className="form-select">
                        <option value="">Choose a Model</option>
                        {models.map(model => {
                            return(
                                <option key={model.id} value={model.id}>
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
