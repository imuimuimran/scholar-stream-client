const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto">

      <table className="table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {[...Array(6)].map((_, i) => (
            <tr key={i}>

              <td>
                <div className="skeleton h-4 w-24"></div>
              </td>

              <td>
                <div className="skeleton h-4 w-40"></div>
              </td>

              <td>
                <div className="skeleton h-6 w-20"></div>
              </td>

              <td>
                <div className="skeleton h-8 w-28"></div>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default TableSkeleton;