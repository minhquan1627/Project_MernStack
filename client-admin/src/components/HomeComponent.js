import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="admin-home">
        <div className="welcome-card">
          <h1>🎉 Chào mừng đến với Trang Quản Trị 🎉</h1>
          <p>Quản lý hệ thống của bạn dễ dàng, nhanh chóng và hiệu quả.</p>
          <img
            src="https://cdn.dribbble.com/users/108183/screenshots/2572277/media/6f0dd03cc78678ebf7f79830c6f1174a.gif"
            alt="Admin Home"
            className="admin-image"
          />
        </div>
      </div>
    );
  }
}

export default Home;
