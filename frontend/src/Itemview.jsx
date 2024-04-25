import React from 'react';
import './Table3.css';

function Table3({ items }) {
  // Check if items is defined and not null
  if (!items || items.length === 0) {
    return <div>No items to display</div>;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${item.sum.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table3;
