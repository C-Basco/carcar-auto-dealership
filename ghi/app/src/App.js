import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianList from './ListTechnicians';
import TechnicianForm from './TechnicianForm';
import AppointmentList from './ListAppointments';
import AppointmentForm from './AppointmentForm'





function App(props) {
  
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians/" element={<TechnicianList technicians={props.technicians} />} />
          <Route path='technicians/new' element={<TechnicianForm />} />
          <Route path="appointments/" element={<AppointmentList appointments={props.appointments} />} />
          <Route path='appointments/new' element={<AppointmentForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
