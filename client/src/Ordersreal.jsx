import React, { useState } from 'react';
import './Orderreal.css';

// Define the static list of products
const productList = [
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
];

const PlaceOrder = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  const handlePlaceOrder = () => {
    // Find the selected product in the productList array
    const selected = productList.find(product => product.item_name === selectedProduct);
  
    // Check if the selected product exists
    if (!selected) {
      // If the selected product does not exist, provide feedback to the user
      console.error('Selected product does not exist in the database.');
      // Optionally, you can reset itemPrice and totalPrice to empty values or display an error message to the user
      setItemPrice('');
      setTotalPrice('');
      return; // Exit the function early as further processing is unnecessary
    }
  
    // If the selected product exists and quantity is valid, proceed with calculating the item price and total price
    setItemPrice(selected.item_price);
    const calculatedTotalPrice = parseFloat(selected.item_price) * parseInt(quantity, 10);
    setTotalPrice(calculatedTotalPrice);
  };

  const handleQuantityChange = (e) => {
    // Check if the entered quantity is a positive integer
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      // Update the quantity state if the entered value is valid
      setQuantity(value);
    }
  };

  const confirmOrder = () => {
    if (selectedProduct && quantity) {
      if (window.confirm(`Are you sure you want to place an order for ${quantity} ${selectedProduct}(s) at $${itemPrice} each, totaling $${totalPrice}?`)) {
        console.log('Order placed successfully.');
        // Add logic here to send the order data to your backend to process the order
      }
    }
  };

  return (
    <div className="place-order-container">
      <h2>Place Order</h2>
      <div className="form-group">
        <label>Item Name:</label>
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
          <option value="">Select an item</option>
          {productList.map((product) => (
            <option key={product.item_name} value={product.item_name}>{product.item_name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={handleQuantityChange} />
      </div>
      <div className="form-group">
        <button onClick={handlePlaceOrder}>Get Price</button>
      </div>
      {itemPrice && (
        <div className="form-group">
          <label>Price per Item:</label>
          <span>{`$${itemPrice}`}</span>
        </div>
      )}
      {totalPrice && (
        <div className="form-group">
          <label>Total Price:</label>
          <span>{`$${totalPrice}`}</span>
        </div>
      )}
      {totalPrice && (
        <div className="form-group">
          <button onClick={confirmOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
