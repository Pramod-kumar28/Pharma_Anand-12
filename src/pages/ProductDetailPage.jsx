// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   // Sample products data (in real app, this would come from API)
//   const allProducts = [
//     { id: 1, name: 'Paracetamol 500mg', price: 25, originalPrice: 30, category: 'Medicines', image: 'https://via.placeholder.com/400x400?text=Paracetamol', stock: 'In Stock', discount: 17, description: 'Paracetamol 500mg is used to relieve mild to moderate pain and reduce fever. It is effective for headaches, muscle aches, toothaches, backaches, arthritis, colds and fevers.', manufacturer: 'ABC Pharmaceuticals', expiry: '12/2025' },
//     { id: 2, name: 'Vitamin D3 60k IU', price: 199, originalPrice: 250, category: 'Vitamins', image: 'https://via.placeholder.com/400x400?text=Vitamin+D3', stock: 'In Stock', discount: 20, description: 'Vitamin D3 helps in maintaining healthy bones and teeth. It also supports immune system function and helps in calcium absorption.', manufacturer: 'XYZ Health', expiry: '06/2026' },
//     { id: 3, name: 'Cetirizine 10mg', price: 45, originalPrice: 55, category: 'Medicines', image: 'https://via.placeholder.com/400x400?text=Cetirizine', stock: 'In Stock', discount: 18, description: 'Cetirizine is an antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching, sneezing, hives, and itching.', manufacturer: 'DEF Meds', expiry: '09/2025' },
//     { id: 4, name: 'Multivitamin Tablets', price: 299, originalPrice: 350, category: 'Vitamins', image: 'https://via.placeholder.com/400x400?text=Multivitamin', stock: 'In Stock', discount: 15, description: 'Complete multivitamin supplement with essential vitamins and minerals for overall health and wellness.', manufacturer: 'GHI Nutraceuticals', expiry: '03/2026' },
//   ];

//   useEffect(() => {
//     const foundProduct = allProducts.find(p => p.id === parseInt(id));
//     if (foundProduct) {
//       setProduct(foundProduct);
//     }
//   }, [id]);

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-gray-500">Product not found</p>
//       </div>
//     );
//   }

//   const addToCart = () => {
//     const cart = JSON.parse(localStorage.getItem('cart') || '[]');
//     const existingItem = cart.find(item => item.id === product.id);
    
//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       cart.push({ ...product, quantity });
//     }
    
//     localStorage.setItem('cart', JSON.stringify(cart));
//     window.dispatchEvent(new Event('cartUpdated'));
//     alert(`${product.name} added to cart!`);
//   };

//   const buyNow = () => {
//     addToCart();
//     navigate('/checkout');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//           </svg>
//           Back to Products
//         </button>

//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
//             {/* Product Image */}
//             <div>
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-96 object-cover rounded-lg bg-gray-100"
//               />
//             </div>

//             {/* Product Info */}
//             <div>
//               <div className="mb-4">
//                 {product.discount && (
//                   <span className="inline-block bg-red-500 text-white text-sm font-bold px-3 py-1 rounded mb-2">
//                     {product.discount}% OFF
//                   </span>
//                 )}
//               </div>
              
//               <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
//               <div className="flex items-center gap-4 mb-4">
//                 <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
//                 {product.originalPrice && (
//                   <>
//                     <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
//                     <span className="text-green-600 font-semibold">Save ₹{product.originalPrice - product.price}</span>
//                   </>
//                 )}
//               </div>

//               <div className="mb-6">
//                 <p className="text-green-600 font-medium mb-2">{product.stock}</p>
//                 <p className="text-gray-600 mb-4">{product.description}</p>
                
//                 <div className="space-y-2 text-sm text-gray-600">
//                   <p><span className="font-semibold">Manufacturer:</span> {product.manufacturer}</p>
//                   <p><span className="font-semibold">Expiry:</span> {product.expiry}</p>
//                   <p><span className="font-semibold">Category:</span> {product.category}</p>
//                 </div>
//               </div>

//               {/* Quantity Selector */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
//                   >
//                     -
//                   </button>
//                   <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
//                   <button
//                     onClick={() => setQuantity(quantity + 1)}
//                     className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
//                   >
//                     +
//                   </button>
//                   <span className="text-gray-600">Total: ₹{product.price * quantity}</span>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-4">
//                 <button
//                   onClick={addToCart}
//                   className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
//                 >
//                   Add to Cart
//                 </button>
//                 <button
//                   onClick={buyNow}
//                   className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
//                 >
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;

























// ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  getProductById, 
  getRecommendationsByCategory,
  getAlternativeProducts 
} from '../dataAndFilters/allProducts';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  const [alternatives, setAlternatives] = useState([]);

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Get recommendations from same category
      const recs = getRecommendationsByCategory(foundProduct.category, id);
      setRecommendations(recs);
      // Get alternative products (same composition)
      const alts = getAlternativeProducts(id);
      setAlternatives(alts);
    } else {
      setProduct(null);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-xl mb-4">Product not found</p>
          <Link 
            to="/products" 
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show toast notification
    const event = new CustomEvent('showToast', {
      detail: { 
        message: `${quantity} × ${product.name} added to cart!`, 
        type: 'success' 
      }
    });
    window.dispatchEvent(event);
  };

  const buyNow = () => {
    addToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center text-sm text-gray-600">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-green-600">Products</Link>
          <span className="mx-2">/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-green-600">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Product Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                {/* Product Image */}
                <div className="flex flex-col">
                  <div className="w-full h-96 rounded-lg bg-gray-100 overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {product.discount && (
                    <div className="flex items-center justify-between">
                      <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                        {product.discount}% OFF
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                  
                  <div className="mb-6">
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                      {product.originalPrice && (
                        <>
                          <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                          <span className="text-green-600 font-semibold">
                            Save ₹{product.originalPrice - product.price}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                      {product.stock}
                    </div>
                  </div>

                  {/* Product Specifications */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start">
                      <span className="w-32 text-gray-500 font-medium">Manufacturer:</span>
                      <span className="text-gray-900">{product.manufacturer}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-32 text-gray-500 font-medium">Composition:</span>
                      <span className="text-gray-900">{product.composition}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-32 text-gray-500 font-medium">Chemical Type:</span>
                      <span className="text-gray-900">{product.chemicalType}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-32 text-gray-500 font-medium">Expiry:</span>
                      <span className="text-gray-900">{product.expiry}</span>
                    </div>
                  </div>

                  {/* Active Ingredients */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Ingredients</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.activeIngredients.map((ingredient, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <span className="text-xl">-</span>
                      </button>
                      <span className="text-2xl font-semibold w-16 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-xl">+</span>
                      </button>
                      <span className="text-gray-700 font-medium">
                        Total: ₹{product.price * quantity}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={addToCart}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </button>
                    <button
                      onClick={buyNow}
                      className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-xl shadow-sm p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Excipients</h3>
                  <ul className="space-y-2">
                    {product.excipients.map((excipient, index) => (
                      <li key={index} className="text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                        {excipient}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {alternatives.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Alternative Products</h3>
                    <ul className="space-y-2">
                      {alternatives.map(alt => (
                        <li key={alt.id} className="text-gray-600">
                          <Link 
                            to={`/product/${alt.id}`}
                            className="hover:text-green-600 hover:underline"
                          >
                            {alt.name} - ₹{alt.price}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Recommendations */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended Products</h2>
              
              {recommendations.length > 0 ? (
                <div className="space-y-4">
                  {recommendations.map(rec => (
                    <Link 
                      key={rec.id} 
                      to={`/product/${rec.id}`}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                    >
                      <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                        <img 
                          src={rec.image} 
                          alt={rec.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{rec.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-bold text-gray-900">₹{rec.price}</span>
                          {rec.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">₹{rec.originalPrice}</span>
                          )}
                        </div>
                        <p className="text-xs text-green-600 mt-1">{rec.stock}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No recommendations available</p>
              )}

              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link 
                  to={`/products?category=${product.category}`}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  View All in {product.category}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;