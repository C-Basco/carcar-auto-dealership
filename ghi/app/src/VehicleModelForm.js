import React, { useEffect, useState } from 'react';

function VehicleModelForm() {

    const [manufacturers, setManufacturers] = useState([]);
    const[manufacturer, setManufacturer] = useState('');
    const[pictureUrl, setPictureUrl] = useState('');
    const[modelName, setModelName] = useState('');

    const fetchManufacturers = async () => {
        const url = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        fetchManufacturers();
      }, []);


    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleModelNameChange = (event) => {
        const value = event.target.value
        setModelName(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.name = modelName;
        data.manufacturer = manufacturer;
        data.picture_url = pictureUrl;


        const modelsUrl = "http://localhost:8100/api/models/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          }

        const response = await fetch(modelsUrl, fetchConfig);
        if (response.ok) {
            const newModels = await response.json();

        setModelName('');
        setManufacturer('');
        setPictureUrl('');
        }


    }


    return (
        <>
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Submit a new Vehicle Model</h1>
              <form onSubmit={handleSubmit} id="create-customer-form">
                <div className="form-floating mb-3">
                  <input onChange={handleModelNameChange} placeholder="Model Name..." required type="text" value={modelName} name="modelName" id="modelName" className="form-control"/>
                  <label htmlFor="firstName">Enter Model Name</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handlePictureUrlChange} placeholder="Picture Url" required type="text" value={pictureUrl} name="pictureUrl" id="pictureUrl" className="form-control" />
                  <label htmlFor="pictureUrl">Enter Picture Url</label>
                </div>
                <div className="mb-3">
                    <select onChange={handleManufacturerChange} required name="manufacturer" id="Manufacturer" className="form-select">
                        <option value="">Choose a Manufacturer</option>
                        {manufacturers.map(manufacturer => {
                            return(
                                <option>
                                {manufacturer.name}
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

export default VehicleModelForm;
