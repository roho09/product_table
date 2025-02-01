const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Enable CORS for cross-origin requests
const productRoutes = require('./routes/productroutes');

// Create an instance of the Express app
const app = express();

// Use CORS to allow requests from other origins (e.g., frontend server)
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

// Register product routes to handle product-related API requests
app.use('/api/products', productRoutes);

// MySQL database configuration (Assuming your dbConfig.js is working correctly)
const db = require('./config/dbconfig'); // This should be your MySQL connection configuration file

// Test the MySQL connection to ensure it's working
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        process.exit(1);  // Exit if there's an error connecting to MySQL
    } else {
        console.log('Connected to MySQL database');
    }
});

// Set up the server to listen on a specified port (default: 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
