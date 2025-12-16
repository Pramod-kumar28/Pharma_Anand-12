import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  allProducts, 
  getAllCategories, 
  getProductsByCategory,
  getProductsByMultipleCategories,
  getFeaturedProducts 
} from '../dataAndFilters/allProducts';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');
  const [sortBy, setSortBy] = useState('popular');

  const categories = ['All', ...getAllCategories()];

  useEffect(() => {
    // Load initial products based on category from URL
    if (category && category !== 'All') {
      const categoryProducts = getProductsByCategory(category);
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
    } else {
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    }
  }, [category]);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = getProductsByCategory(selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount') {
      filtered = [...filtered].sort((a, b) => (b.discount || 0) - (a.discount || 0));
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, sortBy, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setProducts(allProducts);
    } else {
      const categoryProducts = getProductsByCategory(category);
      setProducts(categoryProducts);
    }
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show toast notification instead of alert
    const event = new CustomEvent('showToast', {
      detail: { message: `${product.name} added to cart!`, type: 'success' }
    });
    window.dispatchEvent(event);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('popular');
    setProducts(allProducts);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} products found
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </div>
          
          {(searchQuery || selectedCategory !== 'All' || sortBy !== 'popular') && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products by name, description, or manufacturer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <svg 
                  className="w-4 h-4 absolute left-3 top-3 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="popular">Popular</option>
              <option value="name">Name: A to Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Best Discount</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
                <Link to={`/product/${product.id}`} className="flex-1">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover bg-gray-100"
                    />
                    {product.discount && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discount}% OFF
                      </span>
                    )}
                    <span className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    {product.discount && product.discount > 0 && (
                      <p className="text-xs text-green-600 font-semibold">
                        Save ₹{product.originalPrice - product.price}
                      </p>
                    )}
                  </div>
                </Link>
                <div className="p-4 pt-0">
                  <p className="text-xs text-green-600 mb-3 font-medium">{product.stock}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">Try different search terms or clear your filters</p>
            <button
              onClick={clearFilters}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Show featured products when no filters are active */}
        {filteredProducts.length === 0 && selectedCategory === 'All' && !searchQuery && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getFeaturedProducts(4).map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                  <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
                <Link to={`/product/${product.id}`} className="flex-1">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover bg-gray-100"
                    />
                    {product.discount && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discount}% OFF
                      </span>
                    )}
                    <span className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    {product.discount && product.discount > 0 && (
                      <p className="text-xs text-green-600 font-semibold">
                        Save ₹{product.originalPrice - product.price}
                      </p>
                    )}
                  </div>
                </Link>
                <div className="p-4 pt-0">
                  <p className="text-xs text-green-600 mb-3 font-medium">{product.stock}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;