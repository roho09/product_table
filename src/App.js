import React from 'react';
import ProductCategoryMaster from './components/ProductCategoryMaster'; // Updated import

function App() {
  return (
    <div className="App">
      <h1 className="text-center text-3xl font-bold py-4">Product and Category Management</h1>
      <ProductCategoryMaster /> {/* Correct component usage */}
    </div>
  );
}

export default App;
