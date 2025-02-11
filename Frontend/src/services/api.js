import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this matches your backend API
});

// ✅ Fetch all products with pagination
export const fetchProducts = async (page, pageSize) => {
  const response = await api.get('/products', {
    params: { page, pageSize },
  });
  return response.data;
};

// ✅ Add a new product
export const addProduct = async (productId, productName, categoryId, categoryName) => {
  const response = await api.post('/products/add', { productId, productName, categoryId, categoryName });
  return response.data;
};

// ✅ Update an existing product (✅ Added this function)
export const updateProduct = async (id, productName, categoryId, categoryName) => {
  const response = await api.put(`/products/${id}`, { productName, categoryId, categoryName });
  return response.data;
};

// ✅ Delete a product
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// ✅ Fetch all categories
export const fetchCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

// ✅ Add a new category
export const addCategory = async (categoryId, categoryName) => {
  const response = await api.post('/categories/add', { categoryId, categoryName });
  return response.data;
};

// ✅ Update a category
export const updateCategory = async (id, categoryId, categoryName) => {
  const response = await api.put(`/categories/${id}`, { categoryId, categoryName });
  return response.data;
};


// ✅ Delete a category
export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};
