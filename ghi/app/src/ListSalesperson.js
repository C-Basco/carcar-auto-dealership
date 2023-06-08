import { Link } from 'react-router-dom';

function SalespeopleList(props) {
    return (
        <>
      <div>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="new/" className="btn btn-primary btn-lg px-4 gap-3">Add Salesperson</Link>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {props.salespersons?.map(salesperson => {
                return (
                    <tr >
                        <td>{ salesperson.employee_id }</td>
                        <td>{ salesperson.first_name }</td>
                        <td>{ salesperson.last_name}</td>
                    </tr>
                );
            })}
          </tbody>
        </table>
      </div>
      </>
    );
  }

  export default SalespeopleList;
