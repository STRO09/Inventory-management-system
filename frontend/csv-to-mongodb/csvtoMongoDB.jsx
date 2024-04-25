// csvToMongoDB.js

const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';
const dbName = 'demoweb'; // Change to your desired database name

async function main() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('Items'); // Change to your desired collection name

    // Read the CSV file and insert data into MongoDB
    const data = [];
    fs.createReadStream('stationary_sales_dataset_static.csv') // Change to the path of your CSV file
      .pipe(csv())
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', async () => {
        // Insert all rows into the collection
        await collection.insertMany(data);
        console.log('Data imported successfully');
        
        // Close the connection after all data is inserted
        await client.close();
        console.log('Connection closed');
      });
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
