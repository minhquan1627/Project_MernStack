import React, { Component } from "react";

class Inform extends Component {
  componentDidMount() {
    console.log("InformComponent Rendered");
  }
  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          <a href="/customer/login">Login</a> | <a href="/customer/register">Sign-up</a> 
        </div>
        <div className="float-right">
          <a href="/customer/login">My cart</a> have <b>0</b> items
        </div>
        <div className="float-clear" />
      </div>
    );
  }
}

export default Inform;
