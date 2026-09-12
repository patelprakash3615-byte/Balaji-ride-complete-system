import React from 'react';

function BookingsList({ bookings }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Reference</th>
          <th>Customer</th>
          <th>Driver</th>
          <th>Route</th>
          <th>Fare</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking._id}>
            <td>{booking.bookingRef}</td>
            <td>{booking.customerId?.name || 'N/A'}</td>
            <td>{booking.driverId?.name || 'Unassigned'}</td>
            <td>
              {booking.pickupLocation?.address} → {booking.dropLocation?.address}
            </td>
            <td>₹{booking.estimatedFare}</td>
            <td>
              <span className={`status-badge status-${booking.status}`}>
                {booking.status.replace('_', ' ').toUpperCase()}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookingsList;