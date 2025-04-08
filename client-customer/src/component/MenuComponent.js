import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [categories, setCategories] = useState([]);

  const apiGetCategories = useCallback(() => {
    axios
      .get("/api/customer/categories")
      .then((res) => {
        console.log("API Response:", res.data);
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        }
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  useEffect(() => {
    apiGetCategories();
  }, [apiGetCategories]);

  return (
    <div className="menu-container">
      <div className="float-left">
        <ul className="menu">
          <li className="menu">
            <Link to="/customer/home">Home</Link>
          </li>
          {/* Đã xóa dòng item chưa khai báo */}
          {categories.map((item) => (
            <li key={item._id} className="menu">
              <Link to={`/customer/product/category/${item._id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="float-right">
        <form className="search">
          <input type="search" placeholder="Enter keyword" className="keyword" />
          <input type="submit" value="SEARCH" />
        </form>
      </div>
      <div className="float-clear" />
    </div>
  );
};

export default Menu;
