import React from 'react';
import ProductMaster from './components/ProductMaster';
import CategoryMaster from './components/CategoryMaster'; // Updated import

function App() {
  return (
    <div className="App">
      <h1 className="text-center text-3xl font-bold py-4">Product and Category Management</h1>
      <ProductMaster />
      <CategoryMaster /> {/* Correct component usage */}
    </div>
  );
}

export default App;
