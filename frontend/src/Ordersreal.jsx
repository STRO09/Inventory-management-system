// Ordersreal.jsx
import React, { useState } from 'react';
import './Orderreal.css';

const PlaceOrder = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [pastMonthQuantitySold, setPastMonthQuantitySold] = useState('');
  const [predq, setPredq] = useState(''); // Update state variable
  const [safetyStock, setSafetyStock] = useState('');
  const [suggestedOrderQuantity, setSuggestedOrderQuantity] = useState('');
  const [productList, setProductList] = useState([
    { item_name: 'Pens', item_price: 5 },
    { item_name: 'Notebooks', item_price: 50 },
    { item_name: 'Staplers', item_price: 30 },
    { item_name: 'Folders', item_price: 20 },
    { item_name: 'Pencils', item_price: 5 },
    { item_name: 'Mini Drafters', item_price: 400 },
    { item_name: 'Erasers', item_price: 3 },
    { item_name: 'Sharpeners', item_price: 2 },
    { item_name: 'Ink', item_price: 10 },
    { item_name: 'Printing pages', item_price: 20 },
    { item_name: 'Scales', item_price: 15 },
    { item_name: 'Roller', item_price: 25 },
    { item_name: 'Clips', item_price: 10 }
  ]);

  const handlePlaceOrder = async () => {
    try {
      // Find the selected product in the productList array
      const selected = productList.find(product => product.item_name === selectedProduct);

      if (!selected) {
        console.error('Selected product does not exist in the database.');
        return;
      }

      // Perform prediction
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product: selectedProduct,
          data: {
            past_month_quantity_sold: parseInt(pastMonthQuantitySold),
            item_price: parseFloat(selected.item_price)
          }
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPredq(data.prediction);
      setSafetyStock(data.safety_stock);
      setSuggestedOrderQuantity(data.suggested_order_quantity);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const confirmOrder = () => {
    // Add logic here to confirm the order
  };

  return (
    <div className="place-order-container">
      <h2>Place Order</h2>
      <div className="form-group">
        <label>Product:</label>
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
          <option value="">Select a product</option>
          {productList.map((product) => (
            <option key={product.item_name} value={product.item_name}>{product.item_name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Past Month Quantity Sold:</label>
        <input type="number" value={pastMonthQuantitySold} onChange={(e) => setPastMonthQuantitySold(e.target.value)} />
      </div>
      <div className="form-group">
        <button onClick={handlePlaceOrder}>Get Prediction</button>
      </div>
      {/* Display predq instead of prediction */}
      <div className="form-group">
        <label>Prediction:</label>
        <span>{predq}</span>
      </div>
      <div className="form-group">
        <label>Safety Stock:</label>
        <span>{safetyStock}</span>
      </div>
      <div className="form-group">
        <label>Suggested Order Quantity:</label>
        <span>{suggestedOrderQuantity}</span>
      </div>
      <div className="form-group">
        <button onClick={confirmOrder}>Confirm Order</button>
      </div>
    </div>
  );
};

export default PlaceOrder;
