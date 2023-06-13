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
  const SalespeopleResponse = await fetch('http://localhost:8090/api/salespeople/');
  const salesResponse = await fetch('http://localhost:8090/api/sales/');
  if(SalespeopleResponse.ok && salesResponse.ok){
    const SalespeopleData = await SalespeopleResponse.json();
    const salesData = await salesResponse.json();
    root.render(
      <React.StrictMode>
        <App salespersons={SalespeopleData.salespersons } sales={salesData.sales} />
      </React.StrictMode>
    );
  } else {
    console.error(SalespeopleResponse, salesResponse);
  }
}
loadData();
