const db = require('../config/dbconfig');

// ✅ Add a category
const addCategory = (category, callback) => {
    const { categoryName } = category;
    const query = 'INSERT INTO categories (categoryName) VALUES (?)';
    db.query(query, [categoryName], (err, result) => {
        if (err) {
            console.error('Error adding category:', err);
            return callback({ message: 'Error adding category', error: err }, null);
        }
        callback(null, result);
    });
};

// ✅ Get all categories
const getAllCategories = (callback) => {
    const query = 'SELECT categoryId, categoryName FROM categories ORDER BY categoryId ASC';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error getting categories:', err);
            return callback({ message: 'Error retrieving categories', error: err }, null);
        }
        callback(null, result);
    });
};

// ✅ Get a category by ID
const getCategoryById = (categoryId, callback) => {
    const query = 'SELECT * FROM categories WHERE categoryId = ?';
    db.query(query, [categoryId], (err, result) => {
        if (err) {
            console.error('Error fetching category by ID:', err);
            return callback({ message: 'Error fetching category', error: err }, null);
        }
        if (result.length === 0) {
            return callback({ message: 'Category not found', error: 'Not Found' }, null);
        }
        callback(null, result);
    });
};

// ✅ Update a category
const updateCategory = (categoryId, category, callback) => {
    const { categoryName } = category;
    const query = 'UPDATE categories SET categoryName = ? WHERE categoryId = ?';
    db.query(query, [categoryName, categoryId], (err, result) => {
        if (err) {
            console.error('Error updating category:', err);
            return callback({ message: 'Error updating category', error: err }, null);
        }
        if (result.affectedRows === 0) {
            return callback({ message: 'Category not found', error: 'Not Found' }, null);
        }
        callback(null, result);
    });
};

// ✅ Delete a category
const deleteCategory = (categoryId, callback) => {
    const query = 'DELETE FROM categories WHERE categoryId = ?';
    db.query(query, [categoryId], (err, result) => {
        if (err) {
            console.error('Error deleting category:', err);
            return callback({ message: 'Error deleting category', error: err }, null);
        }
        if (result.affectedRows === 0) {
            return callback({ message: 'Category not found', error: 'Not Found' }, null);
        }
        callback(null, result);
    });
};

module.exports = {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};