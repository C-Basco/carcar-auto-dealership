import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ListModels() {

    const [models, setModels] = useState('');
    const fetchModels = async () => {
        const url = 'http://localhost:8100/api/models/'
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            console.log(data);
            setModels(data.models);
        }
    }

    useEffect(() => {
        fetchModels();
      }, []);

      console.log(models);
      if(!models){
        return null
      }


      return (
        <>
      <div>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="new/" className="btn btn-primary btn-lg px-4 gap-3">Add a Vehicle Model</Link>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Vehicle Name</th>
              <th>Manurfacturer</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {models.map(model => {
                return (
                    <tr key={model.href}>
                        <td>{ model.name }</td>
                        <td>{ model.manufacturer.name}</td>
                        <td><img src={ model.picture_url } className="img-thumbnail"></img></td>
                    </tr>
                );
            })}
          </tbody>
        </table>
      </div>
      </>
    );

}

export default ListModels;
