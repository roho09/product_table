import React, { useState, useEffect } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../services/api';

function ProductCategoryMaster() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [pageSize] = useState(10); // Page size (products per page)

  // Fetch products list whenever currentPage or pageSize changes
  const fetchProductsList = async () => {
    try {
      const data = await fetchProducts(currentPage, pageSize);
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setErrorMessage(''); // Clear error message when data is fetched
    } catch (error) {
      setErrorMessage('Error fetching data. Please try again!');
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProductsList(); // Fetch products list when page or page size changes
  }, [currentPage, pageSize]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (productName.trim() && categoryId && categoryName && productId) {
      try {
        await addProduct(productId, productName, categoryId, categoryName);
        setProductId('');
        setProductName('');
        setCategoryId('');
        setCategoryName('');
        fetchProductsList(); // Refresh the product list
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      fetchProductsList(); // Refresh the product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handlePagination = (page) => {
    // Check if next page is within valid page range
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page); // Update the current page
    } else {
      // Display an alert when trying to access an invalid page
      alert('Page exceeds available data. Please check your page number.');
      setErrorMessage('You cannot go beyond the available pages.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Product and Category Master</h2>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-center">Add New Product</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Product ID"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            placeholder="Category ID"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Product
          </button>
        </div>
      </form>

      {/* Error Message */}
      {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}

      {/* Product List */}
      <h3 className="text-xl font-semibold mb-4">Products List</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.productId}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
          >
            <h4 className="text-lg font-semibold text-gray-800">{product.productName}</h4>
            <p className="text-sm text-gray-600">{product.categoryName}</p>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => {
                  setProductName(product.productName);
                  setCategoryId(product.categoryId);
                  setCategoryName(product.categoryName);
                }}
                className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product.productId)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-black p-3 rounded-lg hover:bg-gray-400"
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-black p-3 rounded-lg hover:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductCategoryMaster;
