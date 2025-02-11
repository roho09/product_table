/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../services/api';

function CategoryMaster() {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState(null);

    useEffect(() => {
        fetchCategoriesList();
    }, []);

    const fetchCategoriesList = async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddOrUpdateCategory = async (e) => {
        e.preventDefault();
        if (categoryName.trim() && categoryId) {
            try {
                if (editingCategoryId) {
                    // ✅ If editing, update the category
                    await updateCategory(editingCategoryId, categoryId, categoryName);
                    setEditingCategoryId(null);
                } else {
                    // ✅ If not editing, add a new category
                    await addCategory(categoryId, categoryName);
                }
                setCategoryId('');
                setCategoryName('');
                fetchCategoriesList();
            } catch (error) {
                console.error('Error adding/updating category:', error);
            }
        }
    };

    const handleEditCategory = (category) => {
        setCategoryId(category.categoryId);
        setCategoryName(category.categoryName);
        setEditingCategoryId(category.categoryId);
    };

    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategory(id);
            fetchCategoriesList();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center text-green-600">Category Master</h2>

            {/* ✅ Add/Update Category Form */}
            <form onSubmit={handleAddOrUpdateCategory} className="mb-8 p-4 bg-white rounded-lg shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <input
                        type="text"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        placeholder="Category ID"
                        required
                        className="border p-3 rounded-lg w-full"
                    />
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Category Name"
                        required
                        className="border p-3 rounded-lg w-full"
                    />
                  
                    <button type="submit" className="p-3 rounded-lg text-white w-full
                        ${editingCategoryId ? 'bg-yellow-500' : 'bg-green-600'}">
                        {editingCategoryId ? 'Update Category' : 'Add Category'}
                    </button>
                </div>
            </form>

            {/* ✅ Category List */}
            <h3 className="text-xl font-semibold mb-4">Categories List</h3>
            <ul>
                {categories.map((category) => (
                    <li key={category.categoryId} className="bg-white shadow-lg rounded-lg p-4 mb-2 flex justify-between items-center">
                        <p className="text-lg font-semibold">{category.categoryId} - {category.categoryName}</p>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleEditCategory(category)}
                                className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteCategory(category.categoryId)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryMaster;
