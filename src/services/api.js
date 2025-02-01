import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Make sure this is your backend API URL
});

// Fetch all products with pagination
export const fetchProducts = async (page, pageSize) => {
  const response = await api.get('/products', {
    params: { page, pageSize },
  });
  return response.data;
};

// Add a new product
export const addProduct = async (productName, categoryId, categoryName) => {
  const response = await api.post('/products/add', { productName, categoryId, categoryName });
  return response.data;
};

// Update an existing product
export const updateProduct = async (id, productName, categoryId, categoryName) => {
  const response = await api.put(`/products/${id}`, { productName, categoryId, categoryName });
  return response.data;
};

// Delete a product
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
