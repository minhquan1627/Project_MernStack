import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import UserDetail from './CustomerDetailComponent';

class User extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      itemSelected: null,
    };
  }

  componentDidMount() {
    this.apiGetUsers();
  }

  updateUsers = (users) => {
    this.setState({ users });
  };

  trItemClick = (item) => {
    this.setState({ itemSelected: item });
  };

  apiGetUsers() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customer', config).then((res) => {
      this.setState({ users: res.data });
    }).catch((err) => {
      console.error("Lỗi lấy danh sách người dùng:", err);
    });
  }

  apiDeleteUser = (userId) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete(`/api/admin/customer/${userId}`, config).then(() => {
      this.apiGetUsers();
    }).catch((err) => {
      console.error("Lỗi xóa người dùng:", err);
    });
  };

  render() {
    return (
      <div className="product-container">
        <h2 className="text-center">USER LIST</h2>
        <div className="table-container">
          <table className="datatable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((item) => (
                <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
                  <td>{item._id}</td>
                  <td>{item.username}</td>
                  <td>{item.fullname}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Component chi tiết người dùng */}
        <UserDetail item={this.state.itemSelected} updateUsers={this.updateUsers} />
      </div>
    );
  }
}

export default User;
