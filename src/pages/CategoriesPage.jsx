import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  const categories = [
    { id: 1, name: 'Medicines', icon: '💊', color: 'bg-blue-100 text-blue-600', description: 'Prescription and over-the-counter medicines', count: 150 },
    { id: 2, name: 'Vitamins', icon: '💉', color: 'bg-green-100 text-green-600', description: 'Vitamins and supplements for better health', count: 80 },
    { id: 3, name: 'Personal Care', icon: '🧴', color: 'bg-purple-100 text-purple-600', description: 'Personal hygiene and care products', count: 120 },
    { id: 4, name: 'Baby Care', icon: '👶', color: 'bg-pink-100 text-pink-600', description: 'Baby essentials and care products', count: 60 },
    { id: 5, name: 'Health Devices', icon: '🩺', color: 'bg-red-100 text-red-600', description: 'Medical devices and health monitoring tools', count: 40 },
    { id: 6, name: 'Fitness', icon: '🏃', color: 'bg-orange-100 text-orange-600', description: 'Fitness supplements and nutrition', count: 50 },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop by Categories</h1>
          <p className="text-gray-600">Browse our wide range of pharmaceutical and health products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.name}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 hover:border-green-300"
            >
              <div className={`w-20 h-20 ${category.color} rounded-full flex items-center justify-center text-4xl mx-auto mb-4`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-3">{category.description}</p>
              <p className="text-sm text-green-600 font-semibold text-center">{category.count}+ Products</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;

