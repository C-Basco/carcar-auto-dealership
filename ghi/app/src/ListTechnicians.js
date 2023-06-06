function TechnicianList(props) {
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
      </div>
    );
  }

  export default TechnicianList