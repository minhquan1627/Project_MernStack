import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from 'react-router-dom';

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    return (
      <div className="menu-container">
      <div className="menu-wrapper">
        <div className="menu-left">
          <ul className="menu style-1">
            <li className="menu"><Link to="/admin/home">Home</Link></li>
            <li className="menu"><Link to="/admin/category">Category</Link></li>
            <li className="menu"><Link to="/admin/product">Product</Link></li>
            <li className="menu"><Link to="/admin/order">Order</Link></li>
            <li className="menu"><Link to="/admin/customer">Customer</Link></li>
          </ul>
        </div>
        <div className="menu-right">
          Hello
          <b>{this.context.username}</b> |{" "}
          <a href="#" onClick={(e) => this.lnkLogoutClick(e)}>Logout</a>
          <Link to="/admin/home" onClick={() => this.lnkLogoutClick()}>Logout</Link>
        </div>
      </div>
    </div>
    );
  }

  // event - handlers
  lnkLogoutClick(e) {
    e.preventDefault();
    this.context.setToken("");
    this.context.setUsername("");
  }
}

export default Menu;
