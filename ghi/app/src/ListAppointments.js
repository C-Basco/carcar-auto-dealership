import { Link } from 'react-router-dom';

function AppointmentList(props){
    console.log(props.appointments)
    return(<div>
        <h3>Current Appointments</h3>
  <table className="table table-striped">
    <thead>
      <tr>
        <th>VIN</th>
        <th>Customer</th>
        <th>Date</th>
        <th>Time</th>
        <th>Technician</th>
        <th>Status</th>
        <th>Is VIP?</th>
      </tr>
    </thead>
    <tbody>
      {props.appointments?.map(app => {
        return (
          <tr key={app.id}>
            <td>{ app.vin }</td>
            <td>{ app.customer }</td>
            <td>{ app.date_time }</td>
            <td>{ app.date_time }</td>
            <td>{ app.technician.employee_id }</td>
            <td>{ app.status }</td>

            
          </tr>
        );
      })}
    </tbody>
  </table>
    {/* <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="/technicians/new" className="btn btn-primary btn-lg px-4 gap-3">Add a Tech</Link>
    </div> */}
  </div>)
}

export default AppointmentList