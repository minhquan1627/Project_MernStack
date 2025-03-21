import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import { Routes , Route , Navigate } from 'react-router-dom';


class Main extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    if (this.context.token !== '') {
      return (
        <div className="body-admin">
          <Menu/>
          <Routes>
            <Route path="/customer" element={<Navigate replace to="/customer/home"/>} />
            <Route path="/customer/main" element={<Home/>} />
          </Routes>
        </div>
      );
    }
    return <div />;
  }
}

export default Main;
