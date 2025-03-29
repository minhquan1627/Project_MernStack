import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CustomerDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtUsername: '',
      txtPassword: '',
      txtFullName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }

  render() {
    return (
      <div className="product-detail">
        <h2 className="text-center">CUSTOMER DETAIL</h2>
        <form>
          <div className="form-group">
            <label>ID</label>
            <input type="text" value={this.state.txtID} readOnly />
          </div>

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
            <input type="text" value={this.state.txtFullName} onChange={(e) => this.setState({ txtFullName: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="text" value={this.state.txtPhone} onChange={(e) => this.setState({ txtPhone: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" value={this.state.txtEmail} onChange={(e) => this.setState({ txtEmail: e.target.value })} />
          </div>

          <div className="button-group">
            <button type="button" className="btn add" onClick={this.btnAddClick}>ADD NEW</button>
            <button type="button" className="btn update" onClick={this.btnUpdateClick}>UPDATE</button>
            <button type="button" className="btn delete" onClick={this.btnDeleteClick}>DELETE</button>
          </div>
        </form>
      </div>
    );
  }

  btnAddClick = () => {
    const { txtUsername, txtPassword, txtFullName, txtPhone, txtEmail } = this.state;
    if (!txtUsername || !txtPassword || !txtFullName || !txtPhone || !txtEmail) {
      alert('Please fill all fields');
      return;
    }
    const customer = { username: txtUsername, password: txtPassword, fullName: txtFullName, phone: txtPhone, email: txtEmail };
    this.apiPostCustomer(customer);
  };

  apiPostCustomer(customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/customers', customer, config).then((res) => {
      if (res.data) {
        alert('Customer added successfully!');
        this.props.updateCustomers();
      } else {
        alert('Error adding customer.');
      }
    });
  }

  btnUpdateClick = () => {
    const { txtID, txtUsername, txtFullName, txtPhone, txtEmail } = this.state;
    if (!txtID) {
      alert('Please select a customer to update');
      return;
    }
    const customer = { username: txtUsername, fullName: txtFullName, phone: txtPhone, email: txtEmail };
    this.apiPutCustomer(txtID, customer);
  };

  apiPutCustomer(id, customer) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put(`/api/admin/customers/${id}`, customer, config).then((res) => {
      if (res.data) {
        alert('Customer updated successfully!');
        this.props.updateCustomers();
      } else {
        alert('Error updating customer.');
      }
    });
  }

  btnDeleteClick = () => {
    const { txtID } = this.state;
    if (!txtID) {
      alert('Please select a customer to delete');
      return;
    }
    if (window.confirm('Are you sure you want to delete this customer?')) {
      this.apiDeleteCustomer(txtID);
    }
  };

  apiDeleteCustomer(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete(`/api/admin/customers/${id}`, config).then((res) => {
      if (res.data) {
        alert('Customer deleted successfully!');
        this.props.updateCustomers();
      } else {
        alert('Error deleting customer.');
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      const { _id, username, fullName, phone, email } = this.props.item || {};
      this.setState({ txtID: _id || '', txtUsername: username || '', txtFullName: fullName || '', txtPhone: phone || '', txtEmail: email || '' });
    }
  }
}

export default CustomerDetail;
