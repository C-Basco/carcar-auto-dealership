import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


async function loadTechnicians() {
  const response = await fetch('http://localhost:8080/api/technicians/');
  if(response.ok){
    const data = await response.json()
    console.log(data.technicians)
    root.render(
      <React.StrictMode>
        <App technicians={data.technicians} />
      </React.StrictMode>
    );
  } else {
    console.error(response)
  }
}
loadTechnicians();


async function loadAppointments(){
  const response = await fetch('http://localhost:8080/api/appointments/');
  if(response.ok){
    const data = await response.json()
    root.render(
      <React.StrictMode>
        <App appointments={data.appointments} />
      </React.StrictMode>
    );
  } else {
    console.error(response)
  }

  
  }
loadAppointments()