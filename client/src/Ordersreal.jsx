import React, { useState, useEffect } from 'react';
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
  const [predictedSales, setPredictedSales] = useState('');
  const [safetyStock, setSafetyStock] = useState('');
  const [suggestedOrderQuantity, setSuggestedOrderQuantity] = useState('');
  const [predictionModels, setPredictionModels] = useState({}); // State to store prediction models

  useEffect(() => {
    // Load prediction models from pickle files when the component mounts
    const loadPredictionModels = async () => {
      try {
        const models = {};
        for (const product of productList) {
          const modelName = product.item_name.replace(' ', '');
          const model = await import(`./pickles/${modelName}_rfmodel.pkl`);
          models[product.item_name] = model;
        }
        setPredictionModels(models);
      } catch (error) {
        console.error('Error loading prediction models:', error);
      }
    };

    loadPredictionModels();
  }, []);

  const handlePlaceOrder = () => {
    // Find the selected product in the productList array
    const selected = productList.find(product => product.item_name === selectedProduct);
  
    // Check if the selected product exists
    if (!selected) {
      console.error('Selected product does not exist in the database.');
      setItemPrice('');
      setTotalPrice('');
      return;
    }
  
    // If the selected product exists, proceed with calculating the item price and total price
    setItemPrice(selected.item_price);
    const calculatedTotalPrice = parseFloat(selected.item_price) * parseInt(quantity, 10);
    setTotalPrice(calculatedTotalPrice);

    // Perform prediction for the selected product
    if (selectedProduct && predictionModels[selectedProduct]) {
      const model = predictionModels[selectedProduct];
      // Use the prediction model to predict future sales
      const predictedSales = model.predict(quantity);
      setPredictedSales(predictedSales);

      // Calculate safety stock (5% of predicted sales) and suggested order quantity
      const calculatedSafetyStock = 0.05 * predictedSales;
      setSafetyStock(calculatedSafetyStock);
      const calculatedSuggestedOrderQuantity = predictedSales + calculatedSafetyStock;
      setSuggestedOrderQuantity(calculatedSuggestedOrderQuantity);
    }
  };
  
  const confirmOrder = () => {
    if (!selectedProduct || !quantity || parseInt(quantity, 10) <= 0) {
      console.error('Invalid selection or quantity.');
      return;
    }

    if (window.confirm(`Are you sure you want to place an order for ${quantity} ${selectedProduct}(s) at $${itemPrice} each, totaling $${totalPrice}?
        Predicted Sales: ${predictedSales}
        Safety Stock: ${safetyStock}
        Suggested Order Quantity: ${suggestedOrderQuantity}`)) {
      console.log('Order placed successfully.');
      // Add logic here to send the order data to your backend to process the order
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
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
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
      {predictedSales && (
        <div className="form-group">
          <label>Predicted Sales:</label>
          <span>{predictedSales}</span>
        </div>
      )}
      {safetyStock && (
        <div className="form-group">
          <label>Safety Stock:</label>
          <span>{safetyStock}</span>
        </div>
      )}
      {suggestedOrderQuantity && (
        <div className="form-group">
          <label>Suggested Order Quantity:</label>
          <span>{suggestedOrderQuantity}</span>
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
