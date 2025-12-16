// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { allProducts } from "../dataAndFilters/allProducts"; // Adjust path as needed

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [cartCount, setCartCount] = useState(0);
//   const searchRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Get cart count from localStorage
//   useEffect(() => {
//     const updateCartCount = () => {
//       const cart = JSON.parse(localStorage.getItem('cart') || '[]');
//       const count = cart.reduce((sum, item) => sum + item.quantity, 0);
//       setCartCount(count);
//     };
//     updateCartCount();
//     window.addEventListener('cartUpdated', updateCartCount);
//     return () => window.removeEventListener('cartUpdated', updateCartCount);
//   }, []);

//   // Close suggestions when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Generate search suggestions
//   useEffect(() => {
//     if (searchQuery.trim().length > 1) {
//       const results = allProducts
//         .filter(product =>
//           product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           (product.composition && product.composition.toLowerCase().includes(searchQuery.toLowerCase()))
//         )
//         .slice(0, 5); // Limit to 5 suggestions
      
//       setSuggestions(results);
//       setShowSuggestions(true);
//     } else {
//       setSuggestions([]);
//       setShowSuggestions(false);
//     }
//   }, [searchQuery]);

//   const navItems = [
//     { path: "/", label: "Home" },
//     { path: "/products", label: "Products" },
//     { path: "/categories", label: "Categories" },
//     { path: "/prescriptions", label: "Prescriptions" },
//     { path: "/contact", label: "Contact" },
//   ];

//   const isActiveLink = (path) => location.pathname === path;

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//       setShowSuggestions(false);
//       setIsMenuOpen(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch(e);
//     }
//   };

//   const handleSuggestionClick = (product) => {
//     navigate(`/product/${product.id}`);
//     setSearchQuery("");
//     setShowSuggestions(false);
//     setIsMenuOpen(false);
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//     setShowSuggestions(false);
//   };

//   return (
//     <header
//       className={`sticky top-0 z-40 transition-all duration-300 
//       bg-white border-b 
//       ${isScrolled ? "shadow-md border-gray-200" : "border-gray-100"}`}
//     >
//       <div className="container mx-auto px-4">
//         {/* Row */}
//         <div className="flex justify-between items-center py-3 md:py-4">
//           {/* Logo - Left Side */}
//           <Link to="/" className="flex items-center space-x-2 md:space-x-3 group order-1">
//             {/* Images First */}
//             <div className="flex items-center space-x-2">
//               <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-green-200 overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 bg-green-50 flex items-center justify-center">
//                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                 </svg>
//               </div>
//             </div>

//             {/* Text After Images */}
//             <div className="flex flex-col items-start">
//               <h1 className="text-lg md:text-xl font-bold text-green-800">
//                 <span className="text-green-600">ANAND </span>PHARMA
//               </h1>
//               <p className="text-xs text-gray-600 italic mt-1">
//                 Fast Delivery. Trusted Medicines.
//               </p>
//             </div>
//           </Link>

//           {/* Search Bar - Center */}
//           <div className="hidden lg:flex flex-1 max-w-md mx-8 order-2" ref={searchRef}>
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search medicines, health products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
//                 className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//               <svg
//                 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
              
//               {/* Clear search button */}
//               {searchQuery && (
//                 <button
//                   onClick={clearSearch}
//                   className="absolute right-10 top-2.5 text-gray-400 hover:text-gray-600"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               )}
              
//               {/* Search Suggestions Dropdown */}
//               {showSuggestions && suggestions.length > 0 && (
//                 <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
//                   {suggestions.map((product) => (
//                     <div
//                       key={product.id}
//                       onClick={() => handleSuggestionClick(product)}
//                       className="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
//                     >
//                       <div className="flex items-center space-x-3">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-10 h-10 object-cover rounded border border-gray-200"
//                         />
//                         <div className="flex-1 min-w-0">
//                           <p className="font-medium text-gray-900 truncate">{product.name}</p>
//                           <div className="flex items-center space-x-2 text-xs text-gray-500">
//                             <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
//                               {product.category}
//                             </span>
//                             <span>₹{product.price}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   <div 
//                     onClick={handleSearch}
//                     className="p-3 bg-gray-50 hover:bg-green-100 cursor-pointer text-center text-green-600 font-semibold border-t border-gray-200 transition-colors duration-150"
//                   >
//                     See all results for "{searchQuery}"
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Desktop Navigation + Cart - Right Side */}
//           <div className="hidden lg:flex items-center space-x-3 order-3">
//             <nav className="flex items-center space-x-2">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
//                     isActiveLink(item.path)
//                       ? "text-green-700 bg-green-100 border border-green-200"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </nav>
            
//             {/* Cart Icon */}
//             <Link
//               to="/cart"
//               className="relative p-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartCount > 9 ? '9+' : cartCount}
//                 </span>
//               )}
//             </Link>
//           </div>

//           {/* Mobile menu button + Cart - Right Side */}
//           <div className="lg:hidden flex items-center space-x-2 order-3">
//             <Link
//               to="/cart"
//               className="relative p-2 text-gray-700 hover:text-green-600 rounded-lg"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartCount > 9 ? '9+' : cartCount}
//                 </span>
//               )}
//             </Link>
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
//             >
//               {isMenuOpen ? (
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search Bar */}
//         <div className="lg:hidden pb-3" ref={searchRef}>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search medicines, health products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
//               className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//             <svg
//               className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
            
//             {/* Clear search button for mobile */}
//             {searchQuery && (
//               <button
//                 onClick={clearSearch}
//                 className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             )}
            
//             {/* Mobile Search Suggestions Dropdown */}
//             {showSuggestions && suggestions.length > 0 && (
//               <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
//                 {suggestions.map((product) => (
//                   <div
//                     key={product.id}
//                     onClick={() => handleSuggestionClick(product)}
//                     className="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-10 h-10 object-cover rounded border border-gray-200"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-gray-900 truncate">{product.name}</p>
//                         <div className="flex items-center space-x-2 text-xs text-gray-500">
//                           <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
//                             {product.category}
//                           </span>
//                           <span>₹{product.price}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <div 
//                   onClick={handleSearch}
//                   className="p-3 bg-gray-50 hover:bg-green-100 cursor-pointer text-center text-green-600 font-semibold border-t border-gray-200 transition-colors duration-150"
//                 >
//                   See all results for "{searchQuery}"
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden border-t border-gray-200 pb-4">
//             <nav className="space-y-2 pt-3">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   onClick={() => setIsMenuOpen(false)}
//                   className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
//                     isActiveLink(item.path)
//                       ? "bg-green-100 text-green-700 border border-green-200"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;




























// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { allProducts } from "../dataAndFilters/allProducts";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [cartCount, setCartCount] = useState(0);
//   const searchRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Get cart count from localStorage
//   useEffect(() => {
//     const updateCartCount = () => {
//       const cart = JSON.parse(localStorage.getItem('cart') || '[]');
//       const count = cart.reduce((sum, item) => sum + item.quantity, 0);
//       setCartCount(count);
//     };
//     updateCartCount();
//     window.addEventListener('cartUpdated', updateCartCount);
//     return () => window.removeEventListener('cartUpdated', updateCartCount);
//   }, []);

//   // Generate search suggestions
//   useEffect(() => {
//     if (searchQuery.trim().length > 1) {
//       const results = allProducts
//         .filter(product =>
//           product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
//           (product.manufacturer && product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())) ||
//           product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           (product.composition && product.composition.toLowerCase().includes(searchQuery.toLowerCase()))
//         )
//         .slice(0, 5);
      
//       setSuggestions(results);
//       setShowSuggestions(true);
//     } else {
//       setSuggestions([]);
//       setShowSuggestions(false);
//     }
//   }, [searchQuery]);

//   const navItems = [
//     { path: "/", label: "Home" },
//     { path: "/products", label: "Products" },
//     { path: "/categories", label: "Categories" },
//     { path: "/prescriptions", label: "Prescriptions" },
//     { path: "/contact", label: "Contact" },
//   ];

//   const isActiveLink = (path) => location.pathname === path;

//   // Handle search form submission
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     console.log("Search submit triggered");
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//       setShowSuggestions(false);
//       setIsMenuOpen(false);
//     }
//   };

//   // Handle Enter key press
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       console.log("Enter key pressed");
//       handleSearchSubmit(e);
//     }
//   };

//   // Handle suggestion click
//   const handleSuggestionClick = (product) => {
//     console.log("Suggestion clicked:", product.id);
//     navigate(`/product/${product.id}`);
//     setSearchQuery("");
//     setShowSuggestions(false);
//     setIsMenuOpen(false);
//   };

//   // Handle view all results
//   const handleViewAllResults = () => {
//     console.log("View all results clicked");
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//       setShowSuggestions(false);
//       setIsMenuOpen(false);
//     }
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//     setShowSuggestions(false);
//   };

//   return (
//     <header
//       className={`sticky top-0 z-50 transition-all duration-300 
//       bg-white border-b 
//       ${isScrolled ? "shadow-md border-gray-200" : "border-gray-100"}`}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-3 md:py-4">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2 md:space-x-3 group order-1">
//             <div className="flex items-center space-x-2">
//               <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-green-200 overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 bg-green-50 flex items-center justify-center">
//                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                 </svg>
//               </div>
//             </div>
//             <div className="flex flex-col items-start">
//               <h1 className="text-lg md:text-xl font-bold text-green-800">
//                 <span className="text-green-600">ANAND </span>PHARMA
//               </h1>
//               <p className="text-xs text-gray-600 italic mt-1">
//                 Fast Delivery. Trusted Medicines.
//               </p>
//             </div>
//           </Link>

//           {/* Desktop Search - SIMPLIFIED */}
//           <div className="hidden lg:flex flex-1 max-w-md mx-8 order-2">
//             <div className="relative w-full">
//               <form onSubmit={handleSearchSubmit} className="w-full">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search medicines, health products..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                     onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
//                     className="w-full px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   />
//                   <svg
//                     className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
                  
//                   {searchQuery && (
//                     <button
//                       type="button"
//                       onClick={clearSearch}
//                       className="absolute right-12 top-2.5 text-gray-400 hover:text-gray-600"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     </button>
//                   )}
                  
//                   <button
//                     type="submit"
//                     className="absolute right-2 top-1.5 bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-md transition-colors"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                   </button>
//                 </div>
//               </form>
              
//               {/* Suggestions Dropdown */}
//               {showSuggestions && suggestions.length > 0 && (
//                 <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
//                   {suggestions.map((product) => (
//                     <div
//                       key={product.id}
//                       onClick={() => handleSuggestionClick(product)}
//                       className="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
//                     >
//                       <div className="flex items-center space-x-3">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-10 h-10 object-cover rounded border border-gray-200"
//                         />
//                         <div className="flex-1 min-w-0">
//                           <p className="font-medium text-gray-900 truncate">{product.name}</p>
//                           <div className="flex items-center space-x-2 text-xs text-gray-500">
//                             <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
//                               {product.category}
//                             </span>
//                             <span>₹{product.price}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   <div 
//                     onClick={handleViewAllResults}
//                     className="p-3 bg-gray-50 hover:bg-green-100 cursor-pointer text-center text-green-600 font-semibold border-t border-gray-200 transition-colors duration-150"
//                   >
//                     See all results for "{searchQuery}"
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-3 order-3">
//             <nav className="flex items-center space-x-2">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
//                     isActiveLink(item.path)
//                       ? "text-green-700 bg-green-100 border border-green-200"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </nav>
            
//             <Link
//               to="/cart"
//               className="relative p-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartCount > 9 ? '9+' : cartCount}
//                 </span>
//               )}
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="lg:hidden flex items-center space-x-2 order-3">
//             <Link
//               to="/cart"
//               className="relative p-2 text-gray-700 hover:text-green-600 rounded-lg"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartCount > 9 ? '9+' : cartCount}
//                 </span>
//               )}
//             </Link>
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
//             >
//               {isMenuOpen ? (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search Bar */}
//         <div className="lg:hidden pb-3">
//           <div className="relative">
//             <form onSubmit={handleSearchSubmit} className="w-full">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search medicines, health products..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
//                   className="w-full px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//                 <svg
//                   className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
                
//                 {searchQuery && (
//                   <button
//                     type="button"
//                     onClick={clearSearch}
//                     className="absolute right-10 top-2.5 text-gray-400 hover:text-gray-600"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 )}
                
//                 <button
//                   type="submit"
//                   className="absolute right-2 top-1.5 bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-md transition-colors"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </button>
//               </div>
//             </form>
            
//             {/* Mobile Suggestions */}
//             {showSuggestions && suggestions.length > 0 && (
//               <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
//                 {suggestions.map((product) => (
//                   <div
//                     key={product.id}
//                     onClick={() => handleSuggestionClick(product)}
//                     className="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-10 h-10 object-cover rounded border border-gray-200"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-gray-900 truncate">{product.name}</p>
//                         <div className="flex items-center space-x-2 text-xs text-gray-500">
//                           <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
//                             {product.category}
//                           </span>
//                           <span>₹{product.price}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <div 
//                   onClick={handleViewAllResults}
//                   className="p-3 bg-gray-50 hover:bg-green-100 cursor-pointer text-center text-green-600 font-semibold border-t border-gray-200 transition-colors duration-150"
//                 >
//                   See all results for "{searchQuery}"
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden border-t border-gray-200 pb-4">
//             <nav className="space-y-2 pt-3">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   onClick={() => setIsMenuOpen(false)}
//                   className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
//                     isActiveLink(item.path)
//                       ? "bg-green-100 text-green-700 border border-green-200"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;






























// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { allProducts } from "../dataAndFilters/allProducts";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [cartCount, setCartCount] = useState(0);
//   const [user, setUser] = useState(null);
//   const searchRef = useRef(null);
//   const userMenuRef = useRef(null);

//   // Check if user is logged in
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
    
//     // Listen for user updates
//     const handleUserUpdate = () => {
//       const updatedUser = localStorage.getItem('user');
//       if (updatedUser) {
//         setUser(JSON.parse(updatedUser));
//       } else {
//         setUser(null);
//       }
//     };
    
//     window.addEventListener('userUpdated', handleUserUpdate);
//     return () => window.removeEventListener('userUpdated', handleUserUpdate);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Get cart count from localStorage
//   useEffect(() => {
//     const updateCartCount = () => {
//       const cart = JSON.parse(localStorage.getItem('cart') || '[]');
//       const count = cart.reduce((sum, item) => sum + item.quantity, 0);
//       setCartCount(count);
//     };
//     updateCartCount();
//     window.addEventListener('cartUpdated', updateCartCount);
//     return () => window.removeEventListener('cartUpdated', updateCartCount);
//   }, []);

//   // Generate search suggestions
//   useEffect(() => {
//     if (searchQuery.trim().length > 1) {
//       const results = allProducts
//         .filter(product =>
//           product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
//           (product.manufacturer && product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())) ||
//           product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           (product.composition && product.composition.toLowerCase().includes(searchQuery.toLowerCase()))
//         )
//         .slice(0, 5);
      
//       setSuggestions(results);
//       setShowSuggestions(true);
//     } else {
//       setSuggestions([]);
//       setShowSuggestions(false);
//     }
//   }, [searchQuery]);

//   const navItems = [
//     { path: "/", label: "Home" },
//     { path: "/products", label: "Products" },
//     { path: "/categories", label: "Categories" },
//     { path: "/prescriptions", label: "Prescriptions" },
//     { path: "/contact", label: "Contact" },
//   ];

//   const isActiveLink = (path) => location.pathname === path;

//   // Handle search form submission
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//       setShowSuggestions(false);
//       setIsMenuOpen(false);
//     }
//   };

//   // Handle Enter key press
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleSearchSubmit(e);
//     }
//   };

//   // Handle suggestion click
//   const handleSuggestionClick = (product) => {
//     navigate(`/product/${product.id}`);
//     setSearchQuery("");
//     setShowSuggestions(false);
//     setIsMenuOpen(false);
//   };

//   // Handle view all results
//   const handleViewAllResults = () => {
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//       setShowSuggestions(false);
//       setIsMenuOpen(false);
//     }
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//     setShowSuggestions(false);
//   };

//   // Login functions
//   const handleLogin = () => {
//     navigate('/login');
//     setIsUserMenuOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//     setIsUserMenuOpen(false);
//     window.dispatchEvent(new Event('userUpdated'));
//     navigate('/');
//   };

//   const handleRegister = () => {
//     navigate('/register');
//     setIsUserMenuOpen(false);
//   };

//   const handleProfile = () => {
//     navigate('/profile');
//     setIsUserMenuOpen(false);
//   };

//   const handleOrders = () => {
//     navigate('/orders');
//     setIsUserMenuOpen(false);
//   };

//   return (
//     <header
//       className={`sticky top-0 z-50 transition-all duration-300 
//       bg-white border-b 
//       ${isScrolled ? "shadow-md border-gray-200" : "border-gray-100"}`}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-3 md:py-4">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2 md:space-x-3 group order-1">
//             <div className="flex items-center space-x-2">
//               <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-green-200 overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 bg-green-50 flex items-center justify-center">
//                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
//                 </svg>
//               </div>
//             </div>
//             <div className="flex flex-col items-start">
//               <h1 className="text-lg md:text-xl font-bold text-green-800">
//                 <span className="text-green-600">ANAND </span>PHARMA
//               </h1>
//               <p className="text-xs text-gray-600 italic mt-1">
//                 Fast Delivery. Trusted Medicines.
//               </p>
//             </div>
//           </Link>

//           {/* Desktop Search - SIMPLIFIED */}
//           <div className="hidden lg:flex flex-1 max-w-md mx-8 order-2" ref={searchRef}>
//             <div className="relative w-full">
//               <form onSubmit={handleSearchSubmit} className="w-full">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search medicines, health products..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                     onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
//                     className="w-full px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   />
//                   <svg
//                     className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
                  
//                   {searchQuery && (
//                     <button
//                       type="button"
//                       onClick={clearSearch}
//                       className="absolute right-12 top-2.5 text-gray-400 hover:text-gray-600"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     </button>
//                   )}
                  
//                   <button
//                     type="submit"
//                     className="absolute right-2 top-1.5 bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-md transition-colors"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                   </button>
//                 </div>
//               </form>
              
//               {/* Suggestions Dropdown */}
//               {showSuggestions && suggestions.length > 0 && (
//                 <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
//                   {suggestions.map((product) => (
//                     <div
//                       key={product.id}
//                       onClick={() => handleSuggestionClick(product)}
//                       className="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
//                     >
//                       <div className="flex items-center space-x-3">
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-10 h-10 object-cover rounded border border-gray-200"
//                         />
//                         <div className="flex-1 min-w-0">
//                           <p className="font-medium text-gray-900 truncate">{product.name}</p>
//                           <div className="flex items-center space-x-2 text-xs text-gray-500">
//                             <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
//                               {product.category}
//                             </span>
//                             <span>₹{product.price}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   <div 
//                     onClick={handleViewAllResults}
//                     className="p-3 bg-gray-50 hover:bg-green-100 cursor-pointer text-center text-green-600 font-semibold border-t border-gray-200 transition-colors duration-150"
//                   >
//                     See all results for "{searchQuery}"
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-3 order-3">
//             <nav className="flex items-center space-x-2">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
//                     isActiveLink(item.path)
//                       ? "text-green-700 bg-green-100 border border-green-200"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </nav>
            
//             {/* Cart Icon */}
//             <Link
//               to="/cart"
//               className="relative p-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartCount > 9 ? '9+' : cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* User Menu */}
//             <div className="relative" ref={userMenuRef}>
//               {user ? (
//                 <button
//                   onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//                   className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
//                     <span className="text-green-700 font-semibold">
//                       {user.name?.charAt(0)?.toUpperCase() || 'U'}
//                     </span>
//                   </div>
//                   <span className="text-gray-700 font-medium">{user.name || 'User'}</span>
//                   <svg
//                     className={`w-4 h-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
//               ) : (
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={handleLogin}
//                     className="px-4 py-2 text-green-700 font-semibold hover:bg-green-50 rounded-lg transition-colors"
//                   >
//                     Login
//                   </button>
//                   <button
//                     onClick={handleRegister}
//                     className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
//                   >
//                     Sign Up
//                   </button>
//                 </div>
//               )}

//               {/* User Dropdown Menu */}
//               {isUserMenuOpen && user && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
//                   <div className="p-4 border-b border-gray-100">
//                     <p className="font-semibold text-gray-900">{user.name || 'User'}</p>
//                     <p className="text-sm text-gray-500">{user.email || ''}</p>
//                   </div>
//                   <div className="py-2">
//                     <button
//                       onClick={handleProfile}
//                       className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                       <span>My Profile</span>
//                     </button>
//                     <button
//                       onClick={handleOrders}
//                       className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                       </svg>
//                       <span>My Orders</span>
//                     </button>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                       </svg>
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="lg:hidden flex items-center space-x-2 order-3">
//             <Link
//               to="/cart"
//               className="relative p-2 text-gray-700 hover:text-green-600 rounded-lg"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartCount > 9 ? '9+' : cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* User Icon for Mobile */}
//             {user ? (
//               <button
//                 onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//                 className="p-2 text-gray-700 hover:text-green-600 rounded-lg"
//               >
//                 <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
//                   <span className="text-green-700 text-sm font-semibold">
//                     {user.name?.charAt(0)?.toUpperCase() || 'U'}
//                   </span>
//                 </div>
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 className="p-2 text-gray-700 hover:text-green-600 rounded-lg"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//               </Link>
//             )}

//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
//             >
//               {isMenuOpen ? (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search Bar */}
//         <div className="lg:hidden pb-3">
//           <div className="relative">
//             <form onSubmit={handleSearchSubmit} className="w-full">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search medicines, health products..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
//                   className="w-full px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//                 <svg
//                   className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
                
//                 {searchQuery && (
//                   <button
//                     type="button"
//                     onClick={clearSearch}
//                     className="absolute right-10 top-2.5 text-gray-400 hover:text-gray-600"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 )}
                
//                 <button
//                   type="submit"
//                   className="absolute right-2 top-1.5 bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-md transition-colors"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </button>
//               </div>
//             </form>
            
//             {/* Mobile Suggestions */}
//             {showSuggestions && suggestions.length > 0 && (
//               <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
//                 {suggestions.map((product) => (
//                   <div
//                     key={product.id}
//                     onClick={() => handleSuggestionClick(product)}
//                     className="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
//                   >
//                     <div className="flex items-center space-x-3">
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-10 h-10 object-cover rounded border border-gray-200"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-gray-900 truncate">{product.name}</p>
//                         <div className="flex items-center space-x-2 text-xs text-gray-500">
//                           <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
//                             {product.category}
//                           </span>
//                           <span>₹{product.price}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <div 
//                   onClick={handleViewAllResults}
//                   className="p-3 bg-gray-50 hover:bg-green-100 cursor-pointer text-center text-green-600 font-semibold border-t border-gray-200 transition-colors duration-150"
//                 >
//                   See all results for "{searchQuery}"
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden border-t border-gray-200 pb-4">
//             <nav className="space-y-2 pt-3">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   onClick={() => setIsMenuOpen(false)}
//                   className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
//                     isActiveLink(item.path)
//                       ? "bg-green-100 text-green-700 border border-green-200"
//                       : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               ))}

//               {/* Mobile Login/Register Links */}
//               {!user ? (
//                 <>
//                   <Link
//                     to="/login"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="block px-4 py-3 text-base font-medium text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="block px-4 py-3 text-base font-medium bg-green-600 text-white hover:bg-green-700 rounded-lg transition-all duration-200 text-center"
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               ) : (
//                 <>
//                   <div className="px-4 py-3 border-t border-gray-200">
//                     <p className="font-semibold text-gray-900">{user.name || 'User'}</p>
//                     <p className="text-sm text-gray-500">{user.email || ''}</p>
//                   </div>
//                   <Link
//                     to="/profile"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
//                   >
//                     My Profile
//                   </Link>
//                   <Link
//                     to="/orders"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
//                   >
//                     My Orders
//                   </Link>
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setIsMenuOpen(false);
//                     }}
//                     className="w-full text-left block px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
//                   >
//                     Logout
//                   </button>
//                 </>
//               )}
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
















import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { allProducts } from "../dataAndFilters/allProducts";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Listen for user updates
    const handleUserUpdate = () => {
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        setUser(null);
      }
    };
    
    window.addEventListener('userUpdated', handleUserUpdate);
    return () => window.removeEventListener('userUpdated', handleUserUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  // Generate search suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = allProducts
        .filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (product.manufacturer && product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.composition && product.composition.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5);
      
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/categories", label: "Categories" },
    { path: "/prescriptions", label: "Prescriptions" },
    { path: "/contact", label: "Contact" },
  ];

  const isActiveLink = (path) => location.pathname === path;

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSuggestions(false);
      setIsMenuOpen(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setSearchQuery("");
    setShowSuggestions(false);
    setIsMenuOpen(false);
  };

  // Handle view all results
  const handleViewAllResults = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSuggestions(false);
      setIsMenuOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
  };

  // Login functions
  const handleLogin = () => {
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsUserMenuOpen(false);
    window.dispatchEvent(new Event('userUpdated'));
    navigate('/');
  };

  const handleRegister = () => {
    navigate('/register');
    setIsUserMenuOpen(false);
  };

  const handleProfile = () => {
    navigate('/profile');
    setIsUserMenuOpen(false);
  };

  const handleOrders = () => {
    navigate('/orders');
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 
        bg-white border-b 
        ${isScrolled ? "shadow-md border-gray-200" : "border-gray-100"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo - Compact for mobile */}
            <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 md:w-12 md:h-12 overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 bg-green-50 flex items-center justify-center">
                  {/* <svg className="w-6 h-6 md:w-8 md:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg> */}
                  <img src="./images/logo.png" alt="" className="w-10 h-12" />
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <h1 className="text-lg md:text-xl font-bold text-green-800">
                  <span className="text-green-600">ANAND </span>PHARMA
                </h1>
                <p className="text-xs text-gray-600 italic mt-1">
                  Fast Delivery. Trusted Medicines.
                </p>
              </div>
              <div className="sm:hidden flex flex-col items-start">
                <h1 className="text-base font-bold text-green-800">
                  <span className="text-green-600">ANAND </span>PHARMA
                </h1>
              </div>
            </Link>

            {/* Desktop Search - Hidden on mobile */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8" ref={searchRef}>
              <div className="relative w-full">
                <form onSubmit={handleSearchSubmit} className="w-full">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search medicines, health products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
                      className="w-full px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <svg
                      className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-12 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                    
                    <button
                      type="submit"
                      className="absolute right-2 top-1.5 bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-md transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </form>
                
                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
                    {suggestions.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSuggestionClick(product)}
                        className="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded border border-gray-200"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{product.name}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                                {product.category}
                              </span>
                              <span>₹{product.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div 
                      onClick={handleViewAllResults}
                      className="p-3 bg-gray-50 hover:bg-green-100 cursor-pointer text-center text-green-600 font-semibold border-t border-gray-200 transition-colors duration-150"
                    >
                      See all results for "{searchQuery}"
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <nav className="flex items-center space-x-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      isActiveLink(item.path)
                        ? "text-green-700 bg-green-100 border border-green-200"
                        : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              
              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                {user ? (
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-700 font-semibold">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium">{user.name || 'User'}</span>
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleLogin}
                      className="px-4 py-2 text-green-700 font-semibold hover:bg-green-50 rounded-lg transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleRegister}
                      className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                )}

                {/* User Dropdown Menu */}
                {isUserMenuOpen && user && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{user.name || 'User'}</p>
                      <p className="text-sm text-gray-500">{user.email || ''}</p>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={handleProfile}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={handleOrders}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span>My Orders</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button and icons */}
            <div className="lg:hidden flex items-center">
              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* User Icon for Mobile */}
              {user ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-700 font-semibold">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="p-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              )}

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar - Always visible */}
          <div className="lg:hidden py-3 border-t border-gray-100">
            <div className="relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search medicines, health products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
                    className="mobile-search-input w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <svg
                    className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-12 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    className="absolute right-2 top-2.5 bg-green-600 hover:bg-green-700 text-white p-2 rounded-md transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
              
              {/* Mobile Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {suggestions.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                      className="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded border border-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{product.name}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                              {product.category}
                            </span>
                            <span>₹{product.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div 
                    onClick={handleViewAllResults}
                    className="p-3 bg-gray-50 hover:bg-green-100 cursor-pointer text-center text-green-600 font-semibold border-t border-gray-200 transition-colors duration-150"
                  >
                    See all results for "{searchQuery}"
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - FIXED: Full width, no overflow */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Content - Full screen width */}
          <div className="absolute inset-0 flex flex-col bg-white overflow-hidden">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-green-200 bg-green-50 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-green-800">
                    <span className="text-green-600">ANAND </span>PHARMA
                  </h1>
                  <p className="text-xs text-gray-600 italic">Fast Delivery. Trusted Medicines.</p>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items - Scrollable if needed */}
            <div className="flex-1 overflow-y-auto">
              <nav className="py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-6 py-4 text-base font-medium transition-all duration-200 border-l-4 ${
                      isActiveLink(item.path)
                        ? "text-green-700 bg-green-50 border-green-500"
                        : "text-gray-700 hover:bg-gray-50 hover:text-green-700 border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* User Section */}
                {user ? (
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="px-6 py-4 bg-gray-50">
                      <p className="font-semibold text-gray-900">{user.name || 'User'}</p>
                      <p className="text-sm text-gray-500">{user.email || ''}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-6 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 border-l-4 border-transparent"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-6 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 border-l-4 border-transparent"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left block px-6 py-4 text-base font-medium text-red-600 hover:bg-red-50 transition-all duration-200 border-l-4 border-transparent"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 border-t border-gray-200 pt-6 px-6 space-y-4">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-center px-4 py-3 text-base font-medium text-green-700 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-all duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-center px-4 py-3 text-base font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </nav>
            </div>

            {/* Footer with cart */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-green-500 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium text-gray-900">Shopping Cart</span>
                </div>
                {cartCount > 0 && (
                  <span className="bg-green-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;