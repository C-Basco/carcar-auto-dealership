import { Link } from 'react-router-dom';

function SalesList(props) {
    return (
        <>
      <div>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="new/" className="btn btn-primary btn-lg px-4 gap-3">Add a Customer</Link>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Salesperson Employee ID</th>
              <th>Salesperson Name</th>
              <th>Customer</th>
              <th>VIN</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {props.sales?.map(sale => {
                return (
                    <tr >
                        <td>{ sale.employee_id }</td>
                        <td>{ sale.first_name} { sale.last_name }</td>
                        <td>{ sale.cust_first_name } { sale.cust_last_name }</td>
                        <td>{ sale.vin }</td>
                        <td>{ sale.price }</td>
                    </tr>
                );
            })}
          </tbody>
        </table>
      </div>
      </>
    );
  }

  export default SalesList;
