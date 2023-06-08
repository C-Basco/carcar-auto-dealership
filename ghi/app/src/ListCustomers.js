import { Link } from 'react-router-dom';

function CustomersList(props) {
    return (
        <>
      <div>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="new/" className="btn btn-primary btn-lg px-4 gap-3">Add a Customer</Link>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {props.customers?.map(customer => {
                return (
                    <tr >
                        <td>{ customer.first_name }</td>
                        <td>{ customer.last_name}</td>
                        <td>{ customer.phone_number }</td>
                        <td>{ customer.address }</td>
                    </tr>
                );
            })}
          </tbody>
        </table>
      </div>
      </>
    );
  }

  export default CustomersList;
