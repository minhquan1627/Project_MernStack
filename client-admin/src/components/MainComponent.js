import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Category from './CategoryComponent';
import Product from './ProductComponent';
import Customer from './CustomerComponent';
import { Routes , Route , Navigate } from 'react-router-dom';


class Main extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    if (this.context.token !== '') {
      return (
        <div className="body-admin">
          <Menu />
          <Routes>
            <Route path="/admin" element={<Navigate replace to="/admin/home"/>} />
            <Route path="/admin/home" element={<Home />} />
            <Route path ='/admin/category' element ={ <Category/>} />
            <Route path="/admin/product" element={<Product/>} />
            <Route path="/admin/customer" element={<Customer/>} />
          </Routes>
        </div>
      );
    }
    return <div />;
  }
}

export default Main;
