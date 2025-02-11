const express = require('express');
const router = express.Router();
const productmodel = require('../model/productmodel'); // Import product model
const db = require('../config/dbconfig'); // Ensure correct DB connection

// ✅ Route to add a product
router.post('/add', (req, res) => {
    const product = req.body;
    productmodel.addProduct(product, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding product', error: err.error });
        }
        return res.status(201).json({ message: 'Product added successfully', productID: result.insertId });
    });
});

// ✅ Route to get all products (with pagination, restricting beyond page 9)
router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 records per page

    // Restrict total records to 90 (max 9 pages)
    const maxRecords = 90;
    const totalPages = Math.ceil(maxRecords / pageSize);

    if (page > totalPages) {
        return res.status(400).json({ message: 'You cannot access page 10. Page does not exist.', error: 'Page not found' });
    }

    // Calculate offset for pagination
    const offset = (page - 1) * pageSize;

    // Query to fetch paginated products
    const query = `
        SELECT productId, productName, categoryName, categoryId
        FROM product_table.products
        LIMIT ?, ?`;

    db.query(query, [offset, pageSize], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving products', error: err.error });
        }

        res.status(200).json({
            products: result,
            totalCount: maxRecords,
            totalPages: totalPages,
            currentPage: page,
        });
    });
});

// ✅ Route to get a product by ID
router.get('/:id', (req, res) => {
    const productId = req.params.id;
    productmodel.getProductById(productId, (err, result) => {
        if (err) {
            return res.status(404).json({ message: 'Product not found', error: err.error });
        }
        res.status(200).json(result);
    });
});

// ✅ Route to update a product by ID
router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    productmodel.updateProduct(productId, updatedProduct, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating product', error: err.error });
        }
        res.status(200).json({ message: 'Product updated successfully' });
    });
});

// ✅ Route to delete a product by ID
router.delete('/:id', (req, res) => {
    const productId = req.params.id;
    productmodel.deleteProduct(productId, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting product', error: err.error });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    });
});

module.exports = router;
