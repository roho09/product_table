const express = require('express');
const router = express.Router();
const db = require('../config/dbconfig');

// ✅ Get all categories with their products
router.get('/', (req, res) => {
    const query = `
        SELECT c.categoryId, c.categoryName, 
               JSON_ARRAYAGG(JSON_OBJECT('productId', p.productId, 'productName', p.productName)) AS products
        FROM categories c
        LEFT JOIN products p ON c.categoryId = p.categoryId
        GROUP BY c.categoryId
    `;
    
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving categories', error: err });
        }
        res.status(200).json(result);
    });
});

// ✅ Get a single category by ID with its products
router.get('/:id', (req, res) => {
    const categoryId = req.params.id;
    const query = `
        SELECT c.categoryId, c.categoryName, 
               JSON_ARRAYAGG(JSON_OBJECT('productId', p.productId, 'productName', p.productName)) AS products
        FROM categories c
        LEFT JOIN products p ON c.categoryId = p.categoryId
        WHERE c.categoryId = ?
        GROUP BY c.categoryId
    `;

    db.query(query, [categoryId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving category', error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(result[0]);
    });
});

// ✅ Add a new category
router.post('/add', (req, res) => {
    const { categoryId, categoryName } = req.body;
    const query = 'INSERT INTO categories (categoryId, categoryName) VALUES (?, ?)';

    db.query(query, [categoryId, categoryName], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding category', error: err });
        }
        res.status(201).json({ message: 'Category added successfully', categoryId });
    });
});

// ✅ Delete a category (Only if no products exist under it)
router.delete('/:id', (req, res) => {
    const categoryId = req.params.id;

    // First, check if any products exist under this category
    const checkQuery = 'SELECT * FROM products WHERE categoryId = ?';
    db.query(checkQuery, [categoryId], (err, products) => {
        if (err) {
            return res.status(500).json({ message: 'Error checking products', error: err });
        }
        if (products.length > 0) {
            return res.status(400).json({ message: 'Cannot delete category. Products exist under this category.' });
        }

        // If no products exist, delete the category
        const deleteQuery = 'DELETE FROM categories WHERE categoryId = ?';
        db.query(deleteQuery, [categoryId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting category', error: err });
            }
            res.status(200).json({ message: 'Category deleted successfully' });
        });
    });
});

module.exports = router;
