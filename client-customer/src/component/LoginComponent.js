import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import MyContext from '../contexts/MyContext';

const Login = () => {
  const { setToken, setUsername } = useContext(MyContext);
  const [txtUsername, setTxtUsername] = useState('');
  const [txtPassword, setTxtPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const btnRegisterClick = () => {
    navigate("/customer/register");
  };

  const btnLoginClick = (e) => {
    e.preventDefault();
    if (!txtUsername.trim() || !txtPassword.trim()) {
      setErrorMessage("⚠️ Vui lòng nhập đầy đủ Username và Password!");
      return;
    }

    const account = { username: txtUsername, password: txtPassword };
    apiLogin(account);
  };

  const apiLogin = (account) => {
    setLoading(true);
    axios.post("/api/customer/login", account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        setToken(result.token);
        setUsername(account.username);
        setErrorMessage("");
        setLoading(false);
        navigate("/main");
      } else {
        setErrorMessage(result.message);
        setLoading(false);
      }
    });
  };

  if (loading) {
    return <div>Đang đăng nhập...</div>;
  }

  return (
    <div className="login-container">
      <h2 className="text-center">LOGIN</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={txtUsername}
            onChange={(e) => setTxtUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={txtPassword}
            onChange={(e) => setTxtPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-login" onClick={btnLoginClick}>
          LOGIN
        </button>
        <button type="button" className="btn-register" onClick={btnRegisterClick}>
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default Login;
