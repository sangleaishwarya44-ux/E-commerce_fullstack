// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [animatedStats, setAnimatedStats] = useState({
    customers: 0,
    products: 0,
    orders: 0,
    satisfaction: 0
  });

  const features = [
    {
      icon: '🛒',
      title: 'Smart Shopping',
      description: 'AI-powered recommendations and seamless browsing experience'
    },
    {
      icon: '🚚',
      title: 'Lightning Delivery',
      description: 'Same-day delivery available in most metropolitan areas'
    },
    {
      icon: '💳',
      title: 'Secure Payments',
      description: 'Bank-level encryption and multiple payment options'
    },
    {
      icon: '🔒',
      title: 'Buyer Protection',
      description: '30-day money-back guarantee on all purchases'
    }
  ];

  useEffect(() => {
    // Animate stats counter
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const targetStats = {
      customers: 50000,
      products: 10000,
      orders: 150000,
      satisfaction: 98
    };

    const animateValue = (start, end, setter) => {
      let current = start;
      const increment = (end - start) / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setter(Math.floor(current));
      }, stepDuration);
    };

    animateValue(0, targetStats.customers, (val) => 
      setAnimatedStats(prev => ({ ...prev, customers: val }))
    );
    animateValue(0, targetStats.products, (val) => 
      setAnimatedStats(prev => ({ ...prev, products: val }))
    );
    animateValue(0, targetStats.orders, (val) => 
      setAnimatedStats(prev => ({ ...prev, orders: val }))
    );
    animateValue(0, targetStats.satisfaction, (val) => 
      setAnimatedStats(prev => ({ ...prev, satisfaction: val }))
    );
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to SnapCart</h1>
          <p>Your instant gateway to amazing products and unbeatable prices</p>
          <Link to="/products" className="cta-button">
            Start Shopping Now
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose SnapCart?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <h3>{animatedStats.customers.toLocaleString()}+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-item">
            <h3>{animatedStats.products.toLocaleString()}+</h3>
            <p>Quality Products</p>
          </div>
          <div className="stat-item">
            <h3>{animatedStats.orders.toLocaleString()}+</h3>
            <p>Orders Delivered</p>
          </div>
          <div className="stat-item">
            <h3>{animatedStats.satisfaction}%</h3>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;