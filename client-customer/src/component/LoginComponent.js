import { withRouter } from "../contexts/withRouter";
import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";

class Login extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
      errorMessage: "",
   
    };
    
  }
  btnRegisterClick = () => {
    this.props.navigate("/register"); // Sử dụng navigate từ props
  };
  render() {
    if (this.context.token === "") {
      return (
        <div className="login-container">
          <h2 className="text-center">ADMIN LOGIN</h2>

          {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}

          <form>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={this.state.txtUsername}
                onChange={(e) => this.setState({ txtUsername: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={this.state.txtPassword}
                onChange={(e) => this.setState({ txtPassword: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-login" onClick={this.btnLoginClick}>
              LOGIN
            </button>
            {/* Nút đăng ký */}
            <button type="button" className="btn-register" onClick={this.btnRegisterClick}>
              ĐĂNG KÝ
            </button>
          </form>
        </div>
      );
    }
    return <div />;
  }

  // Xử lý sự kiện đăng nhập
  btnLoginClick = (e) => {
    e.preventDefault();
    const { txtUsername, txtPassword } = this.state;

    if (!txtUsername.trim() || !txtPassword.trim()) {
      this.setState({ errorMessage: "⚠️ Vui lòng nhập đầy đủ Username và Password!" });
      return;
    }

    const account = { username: txtUsername, password: txtPassword };
    this.apiLogin(account);
  };

  // Gọi API đăng nhập
  apiLogin(account) {
    axios.post("/api/customer/login", account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
        this.setState({ errorMessage: "" });
      } else {
        this.setState({ errorMessage: result.message });
      }
    });
  }
}


export default withRouter(Login);