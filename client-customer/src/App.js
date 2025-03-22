import "./App.css";
import React, { Component } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import MyProvider from "./contexts/MyProvider";
import Login from "./component/LoginComponent";
import Register from "./component/RegisterComponent";
import Main from "./component/MainComponent"; // Thay Home thành Main

const router = createBrowserRouter(
  [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/main", element: <Main /> },
    { path: "*", element: <Navigate to="/login" replace /> },
  ],
  {
    future: {
      v7_startTransition: true, // Bật hỗ trợ React 18+
    },
  }
);

class App extends Component {
  render() {
    return (
      <MyProvider>
        <RouterProvider router={router} />
      </MyProvider>
    );
  }
}

export default App;

