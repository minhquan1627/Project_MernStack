import "./App.css"
import  React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MyProvider from "./contexts/MyProvider";
import Login from "./component/LoginComponent";
import Register from "./component/RegisterComponent";
import Main from "./component/MainComponent";

class App extends Component {
  render() {
    return (
      <MyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/customer/login" element={<Login />} />
            <Route path="/customer/register" element={<Register />} />
            <Route path="/customer/*" element={<Main />} />
            <Route path="*" element={<Navigate replace to="/customer/home"/>} />
          </Routes>
        </BrowserRouter>
      </MyProvider>
    );
  }
}

export default App;
