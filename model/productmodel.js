const db = require('../config/dbconfig');

// add a product with the given data
// Add a product (along with category)
const addProduct = (product, callback) => {
    const { productName, categoryId, categoryName } = product;
    const query = 'INSERT INTO products (productName, categoryId, categoryName) VALUES (?, ?, ?)';
    db.query(query, [productName, categoryId, categoryName], (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            return callback({ message: 'Error adding product', error: err }, null);
        }
        callback(null, result);
    });
};

// get all products (including category info)
// Get all products with specific fields
const getAllProducts = (callback) => {
    const query = 'SELECT productId, productName, categoryName, categoryId FROM product_table.products';  // Specify only the required fields
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error getting products:', err);
            return callback({ message: 'Error retrieving products', error: err }, null);
        }
        callback(null, result);  // Return the result to the callback
    });
};

// get a product by id
const getProductById = (productId, callback) => {
    const query = 'SELECT * FROM products WHERE productId = ?';
    db.query(query, [productId], (err, result) => {
        if (err) {
            console.error('Error fetching product id:', err);
            return callback({ message: 'Error fetching product by id', error: err }, null);
        }
        if(result.length === 0) {
            return callback({ message: 'Product not found',error: 'Not Found' }, null);
        }
        callback(null, result);
    });
};

// update a product Detail;s
const updateProduct = (productId ,product, callback) => {
    const {productName, categoryId, categoryName} = product;
    const query = 'UPDATE products SET productName = ?, categoryId = ?, categoryName = ? WHERE productId = ?';
    db.query (query , [productName , categoryId , categoryName , productId], (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return callback({ message: 'Error updating product', error: err }, null);
        }

        if(result.affectedRows === 0) {
            return callback({ message: 'Product not found',error: 'Not Found' }, null);
        }
        callback(null, result);
        
    });


};


// delete a product by id
const deleteProduct = (productId, callback) => {
    const query = 'DELETE FROM products WHERE productId = ?';
    db.query(query, [productId], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return callback({ message: 'Error deleting product', error: err }, null);
        }
        if(result.affectedRows === 0) {
            return callback({ message: 'Product not found',error: 'Not Found' }, null);
        }
        callback(null, result);
    });
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};