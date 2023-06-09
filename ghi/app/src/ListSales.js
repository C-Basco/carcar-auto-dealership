import { Link } from 'react-router-dom';

function SalesList(props) {
    return (
        <>
      <div>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to="new/" className="btn btn-primary btn-lg px-4 gap-3">Add a Sale</Link>
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
                        <td>{ sale.salesperson.employee_id }</td>
                        <td>{ sale.salesperson.first_name} { sale.salesperson.last_name }</td>
                        <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                        <td>{ sale.automobile.vin}</td>
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
