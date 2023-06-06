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


async function loadData() {
  const techsResponse = await fetch('http://localhost:8080/api/technicians/');
  const appointmentResponse = await fetch('http://localhost:8080/api/appointments/');
  if(techsResponse.ok && appointmentResponse.ok ){
    const techsData = await techsResponse.json()
    const appointmentData = await appointmentResponse.json()
    
    root.render(
      <React.StrictMode>
        <App technicians={techsData.technicians} appointments={appointmentData.appointments} />
        
      </React.StrictMode>
    );
  } else {
    console.error(techsResponse, appointmentResponse)
  }
}
loadData();
