// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      // You can redirect to search results page or filter products
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const cartItemsCount = getCartItemsCount();

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          SnapCart
        </Link>

        

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          {user?.role === 'admin' && (
            <Link to="/admin">Admin</Link>
          )}
          
          

          <Link to="/cart" className="cart-link">
            🛒 Cart
            {cartItemsCount > 0 && (
              <span className="cart-count">{cartItemsCount}</span>
            )}
          </Link>
          
          {user ? (
            <div className="user-section">
              <span className="user-greeting">👋 Hello, {user.name}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;