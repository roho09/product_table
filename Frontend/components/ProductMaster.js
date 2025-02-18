import React, { useState, useEffect, useCallback } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../services/api';

function ProductMaster() {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [pageSize] = useState(10);
    const [isEditing, setIsEditing] = useState(false);

    const fetchProductsList = useCallback(async () => {
        try {
            const data = await fetchProducts(currentPage, pageSize);
            setProducts(data.products);
            setTotalPages(data.totalPages);
        } catch (error) {
            setErrorMessage('Error fetching data. Please try again!');
            console.error('Error fetching products:', error);
        }
    }, [currentPage, pageSize]);

    useEffect(() => {
        fetchProductsList();
    }, [fetchProductsList]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (productName.trim() && categoryId) {
            try {
                if (isEditing) {
                    await updateProduct(productId, productName, categoryId);
                    setIsEditing(false);
                } else {
                    await addProduct(productName, categoryId);
                }
                resetForm();
                fetchProductsList();
            } catch (error) {
                console.error('Error saving product:', error);
            }
        }
    };

    const handleEditProduct = (product) => {
        setProductId(product.productId);
        setProductName(product.productName);
        setCategoryId(product.categoryId);
        setIsEditing(true);
    };

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            fetchProductsList();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const resetForm = () => {
        setProductId('');
        setProductName('');
        setCategoryId('');
        setIsEditing(false);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Product Master</h2>

            <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded-lg shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" required className="border p-3 rounded-lg w-full" />
                    <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder="Category ID" required className="border p-3 rounded-lg w-full" />
                    <button type="submit" className={`p-3 rounded-lg ${isEditing ? 'bg-green-600' : 'bg-blue-600'} text-white`}>{isEditing ? 'Update Product' : 'Add Product'}</button>
                    {isEditing && (
                        <button type="button" onClick={resetForm} className="bg-gray-400 text-white p-3 rounded-lg">Cancel</button>
                    )}
                </div>
            </form>

            {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}

            <h3 className="text-xl font-semibold mb-4">Products List</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {products.map((product) => (
                    <div key={product.productId} className="bg-white shadow-lg rounded-lg p-6">
                        <h4 className="text-lg font-semibold">{product.productName}</h4>
                        <p className="text-sm">Category ID: {product.categoryId}</p>
                        <div className="flex gap-4 mt-2">
                            <button onClick={() => handleEditProduct(product)} className="bg-yellow-400 text-white px-4 py-2 rounded-lg">Edit</button>
                            <button onClick={() => handleDeleteProduct(product.productId)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-6">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-gray-300 text-black p-3 rounded-lg hover:bg-gray-400">Previous</button>
                <span className="text-lg">Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-gray-300 text-black p-3 rounded-lg hover:bg-gray-400">Next</button>
            </div>
        </div>
    );
}

export default ProductMaster;
