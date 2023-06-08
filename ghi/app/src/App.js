import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespeopleList from './ListSalesperson';
import SalespersonForm from './SalespersonForm';
import CustomersList from './ListCustomers';
import CustomerForm from './CustomersForm';
import SaleForm from './SaleForm';
import SalesList from './ListSales';
import SalespersonHistory from './HistorySalesperson';
import VehicleModelForm from './VehicleModelForm';
import ListModels from './ListModel';
import AutomobileForm from './AutomobileForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople/" >
            <Route path="" element={<SalespeopleList salespersons={props.salespersons} />} />
            <Route path='new/' element={<SalespersonForm />} />
          </Route>
          <Route path="customers/" >
            <Route path="" element={<CustomersList customers={props.customers} />} />
            <Route path='new/' element={<CustomerForm />} />
          </Route>
          <Route path="sales/" >
            <Route path="" element={<SalesList sales={props.sales} />} />
            <Route path='new/' element={<SaleForm />} />
            <Route path="salesperson/" element={<SalespersonHistory />} />
          </Route>
          <Route path="models/">
            <Route path="" element={<ListModels />} />
            <Route path="new/" element={<VehicleModelForm />} />
          </Route>
          <Route path="automobiles/" element={<AutomobileForm />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
