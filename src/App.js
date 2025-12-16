  // App.js
  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Header from './components/Header';
  import Footer from './components/Footer';
  import HomePage from './pages/HomePage';
  import ProductsPage from './pages/ProductsPage';
  import ProductDetailPage from './pages/ProductDetailPage';
  import CartPage from './pages/CartPage';
  import CheckoutPage from './pages/CheckoutPage';
  import CategoriesPage from './pages/CategoriesPage';
  import PrescriptionsPage from './pages/PrescriptionsPage';
  import ContactPage from './pages/ContactPage';
  import SearchResultsPage from './pages/SearchResultsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ScrollToTop from './pages/ScrollToTop';


  function App() {
    return (
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          <main className="flex-grow">
              <ScrollToTop/>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/prescriptions" element={<PrescriptionsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path='/profile' element={<ProfilePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }

  export default App;
