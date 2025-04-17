import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, filterProducts, sortProducts } from './features/productsSlice';
import ProductGrid from './components/ProductGrid';
import Filters from './components/Filters';
import SortDropdown from './components/SortDropdown';
import Pagination from './components/Pagination';

const App = () => {
  const dispatch = useDispatch();
  const { filteredProducts, loading, error } = useSelector((state) => state.products);

  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    dispatch(fetchProducts()).then((action) => {
      if (action.payload) {
        const uniqueCategories = [
          ...new Set(action.payload.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      }
    });
  }, [dispatch]);

  const handleFilterChange = (filters) => {
    dispatch(filterProducts(filters));
  };

  const handleSortChange = (sortBy) => {
    dispatch(sortProducts({ sortBy }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container mx-auto p-4">
      <header className="header bg-blue-500 text-white py-4 rounded-lg mb-6">
        <h1>Product Catalog</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 sidebar">
          <Filters categories={categories} onFilterChange={handleFilterChange} />
        </div>

        <div className="lg:col-span-3">
          <SortDropdown onSortChange={handleSortChange} />

          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && !error && currentProducts.length === 0 && <p>No products found.</p>}

          {!loading && !error && currentProducts.length > 0 && (
            <ProductGrid
              products={currentProducts}
              onAddToCart={(product) => console.log('Add to Cart:', product)}
              onAddToWishlist={(product) => console.log('Add to Wishlist:', product)}
            />
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
