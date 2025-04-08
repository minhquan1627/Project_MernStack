import { Routes, Route, Navigate } from 'react-router-dom';
import React, { Component } from 'react';
import Menu from './MenuComponent';
import Inform from './InformComponent';
import Home from './HomeComponent';
import ProductDetail from './ProductDetailComponent';
import Product from './ProductComponent'; 

class Main extends Component {
  render() {
    return (
      <div className="body-customer">
        {/* Navbar and notification */}
        <Menu />
        <Inform />

        {/* Main routing area */}
        <Routes>
          {/* Redirect from root to /home */}
          <Route path="/" element={<Navigate replace to="/home" />} />

          {/* Main routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/product/category/:cid" element={<Product />} />
          <Route path="/product/search/:keyword" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    );
  }
}

export default Main;
