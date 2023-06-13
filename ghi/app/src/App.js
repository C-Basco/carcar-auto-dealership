import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import SalespeopleList from "./ListSalesperson";
import SalespersonForm from "./SalespersonForm";
import CustomersList from "./ListCustomers";
import CustomerForm from "./CustomersForm";
import SaleForm from "./SaleForm";
import SalesList from "./ListSales";
import SalespersonHistory from "./HistorySalesperson";
import VehicleModelForm from "./VehicleModelForm";
import ListModels from "./ListModel";
import AutomobileForm from "./AutomobileForm";
import TechnicianList from "./ListTechnicians";
import TechnicianForm from "./TechnicianForm";
import AppointmentList from "./ListAppointments";
import AppointmentForm from "./AppointmentForm";
import ListServiceHistory from "./ServiceHistory";
import ManufacturerList from "./ListManufacturers";
import ManufacturerForm from "./ManufacturerForm";
import AutomobileList from "./ListAutomobiles";

function App(props) {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route
						path="/"
						element={<MainPage />}
					/>
					<Route path="salespeople/">
						<Route
							path=""
							element={<SalespeopleList salespersons={props.salespersons} />}
						/>
						<Route
							path="new/"
							element={<SalespersonForm />}
						/>
					</Route>
					<Route path="customers/">
						<Route
							path=""
							element={<CustomersList/>}
						/>
						<Route
							path="new/"
							element={<CustomerForm />}
						/>
					</Route>
					<Route path="sales/">
						<Route
							path=""
							element={<SalesList sales={props.sales} />}
						/>
						<Route
							path="new/"
							element={<SaleForm />}
						/>
						<Route
							path="salesperson/"
							element={<SalespersonHistory />}
						/>
					</Route>
					<Route path="models/">
						<Route
							path=""
							element={<ListModels />}
						/>
						<Route
							path="new/"
							element={<VehicleModelForm />}
						/>
					</Route>
					<Route
						path="automobiles/"
						element={<AutomobileList />}
					/>
					<Route
						path="technicians/"
						element={<TechnicianList technicians={props.technicians} />}
					/>
					<Route
						path="technicians/new"
						element={<TechnicianForm />}
					/>
					<Route
						path="appointments/"
						element={<AppointmentList appointments={props.appointments} />}
					/>
					<Route
						path="appointments/new"
						element={<AppointmentForm />}
					/>
					<Route
						path="appointments/history"
						element={<ListServiceHistory appointments={props.appointments} />}
					/>
					<Route
						path="manufacturers/"
						element={<ManufacturerList />}
					/>
					<Route
						path="manufacturers/new"
						element={<ManufacturerForm />}
					/>
					<Route
						path="automobiles/new"
						element={<AutomobileForm />}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
