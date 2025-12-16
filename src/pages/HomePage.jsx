import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample categories
  const categories = [
    { id: 1, name: 'Medicines', icon: '💊', color: 'bg-blue-100 text-blue-600' },
    { id: 2, name: 'Vitamins', icon: '💉', color: 'bg-green-100 text-green-600' },
    { id: 3, name: 'Personal Care', icon: '🧴', color: 'bg-purple-100 text-purple-600' },
    { id: 4, name: 'Baby Care', icon: '👶', color: 'bg-pink-100 text-pink-600' },
    { id: 5, name: 'Health Devices', icon: '🩺', color: 'bg-red-100 text-red-600' },
    { id: 6, name: 'Fitness', icon: '🏃', color: 'bg-orange-100 text-orange-600' },
  ];

  // Sample featured products
  const featuredProducts = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      price: 25,
      originalPrice: 30,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtDbxU48L8Ur76OT6vu7Uip9-7Ehwu0i2Bqg&s',
      discount: 17,
      stock: 'In Stock'
    },
    {
      id: 2,
      name: 'Vitamin D3 60k IU',
      price: 199,
      originalPrice: 250,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUqiUJxWUsbVuwJVAp2QHocXu1T6xlqoSCXg&s',
      discount: 20,
      stock: 'In Stock'
    },
    {
      id: 3,
      name: 'Cetirizine 10mg',
      price: 45,
      originalPrice: 55,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTbZgaq_Dk7ZZGoirMeoBZhLuVclSeTN0Oxw&s',
      discount: 18,
      stock: 'In Stock'
    },
    {
      id: 4,
      name: 'Multivitamin Tablets',
      price: 299,
      originalPrice: 350,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTacPdbWuynCEStk6bS929P4_LUaeZaUbcB-Q&s',
      discount: 15,
      stock: 'In Stock'
    },
  ];

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
    
    // Show toast notification
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get Medicines Delivered in 10 Minutes
            </h1>
            <p className="text-lg md:text-xl mb-8 text-green-100">
              Order authentic medicines and health products with lightning-fast delivery
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Search for medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Search
              </button>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>10 Min Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Authentic Products</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.name}`}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer border border-gray-100 hover:border-green-300"
            >
              <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-3`}>
                {category.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-800">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/products" className="text-green-600 font-semibold hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover bg-gray-100"
                />
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
                <p className="text-xs text-green-600 mb-3 font-medium">{product.stock}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Anand Pharma?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Get medicines delivered in 10 minutes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Authentic Products</h3>
              <p className="text-sm text-gray-600">100% genuine medicines guaranteed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600">Hassle-free return policy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Round the clock customer care</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
