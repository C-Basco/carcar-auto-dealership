import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>   

            <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Inventory
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="automobiles/">Automobile Inventory</a></li>
            <li><a class="dropdown-item" href="/automobiles/new">New Automobile</a></li>
            <li><a class="dropdown-item" href="models">Available Models</a></li>
            <li><a class="dropdown-item" href="models/new">Add a Model</a></li>
            <li><a class="dropdown-item" href="/manufacturers">Available Manufacturers</a></li>
            <li><a class="dropdown-item" href="/manufacturers/new">Add a Manufacturer</a></li>
          </ul>
        </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="salespeople">Salespeople</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="salespeople/new">Create new Salesperson</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="customers">Customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="customers/new">Create Customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="sales">Sales</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="sales/new">New Sales</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="sales/salesperson">Salesperson History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/technicians">Technicians</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="technicians/new">New Technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments">Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments/new">New Appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments/history">Service History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments/goals">Service Goals</NavLink>
            </li>
         </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
