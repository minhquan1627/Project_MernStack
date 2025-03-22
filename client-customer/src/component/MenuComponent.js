import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Link } from "react-router-dom";

class Menu extends Component {
  static contextType = MyContext; // Sử dụng context

  render() {
    return (
      <div className="menu-container">
        <div className="menu-wrapper">
          {/* Menu bên trái */}
          <div className="menu-left">
            <ul className="menu style-1">
              <li><Link to="/main">Home</Link></li>
              <li><Link to="/customer/category">Category</Link></li>
              <li><Link to="/customer/product">Product</Link></li>
              <li><Link to="/customer/order">Order</Link></li>
              <li><Link to="/customer/customer">Customer</Link></li>
            </ul>
          </div>

          {/* Menu bên phải */}
          <div className="menu-right">
            Hello, <b>{this.context.username}</b> |{" "}
            <Link to="/login" onClick={(e) => this.lnkLogoutClick(e)}>Logout</Link>
          </div>
        </div>
      </div>
    );
  }

  // Xử lý đăng xuất
  lnkLogoutClick = (e) => {
    e.preventDefault();
    this.context.setToken("");
    this.context.setUsername("");
    window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
  };
}

export default Menu;
