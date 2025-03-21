import "./App.css";
import React, { Component } from "react";
import MyProvider from "./contexts/MyProvider";
import Login from "./component/LoginComponent";
import Register from "./component/RegisterComponent";
// import Main from "./component/MainComponent";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <MyProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </MyProvider>
    );
  }
}

export default App;
