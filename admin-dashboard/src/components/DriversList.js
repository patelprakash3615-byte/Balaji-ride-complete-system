import React from 'react';

function DriversList({ drivers }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Rating</th>
          <th>Total Rides</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver) => (
          <tr key={driver._id}>
            <td>{driver.name}</td>
            <td>{driver.phone}</td>
            <td>{driver.email}</td>
            <td>⭐ {driver.rating}</td>
            <td>{driver.totalBookings}</td>
            <td>
              <span className="status-badge status-completed">Active</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DriversList;