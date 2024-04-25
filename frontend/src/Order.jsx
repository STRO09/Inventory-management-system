import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Papa from "papaparse"; // Import Papaparse for CSV parsing
import Table3 from "./Itemview.jsx";

// Initialize Firebase app
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  databaseURL: "your-database-url",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

function Inventory() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [inventory, setInventory] = useState([]);

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      setPrice(newPrice);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQty(newQuantity);
    }
  };

  const calculateTotal = () => {
    return price * qty;
  };

  const handleAddItem = async () => {
    const sum = calculateTotal();
    const newUser = { name, qty, price, sum };

    try {
      // Add item to Firestore collection
      const docRef = await addDoc(collection(firestore, "items"), newUser);
      console.log("Document written with ID: ", docRef.id);

      setUsers([...users, newUser]);
      setTotal(total + sum);
      setName("");
      setQty(0);
      setPrice(0);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleCsvUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `uploads/${file.name}`);

    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);
      console.log("File uploaded successfully.");

      // Parse the CSV file and update the inventory
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          setInventory(result.data);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="product">
      <div className="container-fluid bg-2 text-center">
        <h1 align="center">Update the Stock</h1>
        <br />
        <div className="row">
          <div className="col-sm-8">
            <h3 className="title2"> Add Products </h3>
            <br />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Item Name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Price"
                    value={price}
                    onChange={handlePriceChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Qty"
                    value={qty}
                    onChange={handleQuantityChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={calculateTotal()}
                    className="form-control"
                    placeholder="Enter Total"
                    id="total_cost"
                    name="total_cost"
                    disabled
                  />
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={handleAddItem}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </table>
            <h3 align="left"> Upload CSV </h3>
            <input type="file" onChange={handleCsvUpload} accept=".csv" />
            <h3 align="left"> History </h3>
            {/* Display the singular entry update form */}
            <Table3 items={[...users, ...inventory]} />
          </div>

          <div className="col-sm-4">
            <div className="form-group" align="left">
              <h3>Total</h3>

              <input
                type="text"
                className="form-control"
                placeholder="Enter Total"
                required
                disabled
                value={total}
              />
              <br />
              <button
                type="button"
                className="btn btn-success"
                onClick={refreshPage}
              >
                {" "}
                <span>Complete</span>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
