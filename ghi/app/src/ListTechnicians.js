function TechnicianList(props) {
    return (
        <div>
            <h3>Service Technicians</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee Id</th>
          </tr>
        </thead>
        <tbody>
          {props.technicians?.map(tech => {
            return (
              <tr key={tech.id}>
                <td>{ tech.first_name }</td>
                <td>{ tech.last_name }</td>
                <td>{ tech.employee_id }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    );
  }

  export default TechnicianList