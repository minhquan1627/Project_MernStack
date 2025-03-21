import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";

class Register extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
      txtName: "",
      txtPhone: "",
      txtEmail: "",
      errorMessage: "",
    };
  }

  render() {
    return (
      <div className="register-container">
        <h2 className="text-center">REGISTER</h2>
        {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}

        <form>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={this.state.txtUsername} onChange={(e) => this.setState({ txtUsername: e.target.value })} />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={this.state.txtPassword} onChange={(e) => this.setState({ txtPassword: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={this.state.txtName} onChange={(e) => this.setState({ txtName: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="text" value={this.state.txtPhone} onChange={(e) => this.setState({ txtPhone: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" value={this.state.txtEmail} onChange={(e) => this.setState({ txtEmail: e.target.value })} />
          </div>

          <button type="submit" className="btn-register" onClick={this.btnRegisterClick}>
            REGISTER
          </button>
        </form>
      </div>
    );
  }

  btnRegisterClick = (e) => {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;

    if (!txtUsername.trim() || !txtPassword.trim() || !txtName.trim() || !txtPhone.trim() || !txtEmail.trim()) {
      this.setState({ errorMessage: "⚠️ Vui lòng nhập đầy đủ thông tin!" });
      return;
    }

    const newUser = { username: txtUsername, password: txtPassword, name: txtName, phone: txtPhone, email: txtEmail };
    this.apiRegister(newUser);
  };

  apiRegister(user) {
    axios.post("/api/customer/register", user).then((res) => {
      const result = res.data;
      if (result.success === true) {
        alert("🎉 Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
        this.setState({ errorMessage: "" });
      } else {
        this.setState({ errorMessage: result.message });
      }
    });
  }
}

export default Register;
