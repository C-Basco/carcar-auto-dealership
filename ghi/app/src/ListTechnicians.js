import { Link } from 'react-router-dom';

function TechnicianList(props) {
    console.log(props.technicians)
    return (
        <div>
            <h3>Service Technicians</h3>
            <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
        {props.technicians?.map(tech => {
            return (
              <tr key={tech.id}>
                <td>{ tech.employee_id }</td>
                <td>{ tech.first_name }</td>
                <td>{ tech.last_name }</td>                
              </tr>
            );
          })}
        </tbody>
      </table>

        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/technicians/new" className="btn btn-primary btn-lg px-4 gap-3">Add a Tech</Link>
        </div>
      </div>
    );
  }

  export default TechnicianList