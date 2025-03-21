import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
  super(props);
  this.state = {
    txtID: '',
    txtName: '',
  };

  this.btnAddClick = this.btnAddClick.bind(this);
  this.btnUpdateClick = this.btnUpdateClick.bind(this);
  this.btnDeleteClick = this.btnDeleteClick.bind(this);
}

  render() {
    return (
        <div className="category-detail">
        <h2 className="text-center">CATEGORY DETAIL</h2>
        <form>
          <div className="form-group">
            <label>ID</label>
            <input
              type="text"
              value={this.state.txtID}
              onChange={(e) => this.setState({ txtID: e.target.value })}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={this.state.txtName}
              onChange={(e) => this.setState({ txtName: e.target.value })}
            />
          </div>

          <div className="button-group">
            <button type="button" className="btn add" onClick={this.btnAddClick}>
              ADD NEW
            </button>
            <button type="button" className="btn update" onClick={this.btnUpdateClick}>
              UPDATE
            </button>
            <button type="button" className="btn delete" onClick={this.btnDeleteClick}>
              DELETE
            </button>
          </div>
        </form>
  </div>

    );
  }

  // Event Handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName.trim();
    if (!name) {
      alert("Please input name");
      return;
    }
  
    const cate = { name };
    console.log("Sending data:", cate); // Debug xem dữ liệu có đúng không
    this.apiPostCategory(cate);
  }

// APIs
apiPostCategory(cate) {
  const config = { headers: { "x-access-token": this.context.token } };
  axios.post("/api/admin/categories/", cate, config).then((res) => {
    const result = res.data;
    if (result) {
      alert("OK BABY!");
      this.apiGetCategories();
    } else {
      alert("SORRY BABY!");
    }
  });
}

apiGetCategories() {
  const config = { headers: { "x-access-token": this.context.token } };
  axios.get("/api/admin/categories/", config).then((res) => {
    const result = res.data;
    this.props.updateCategories(result);
  });
}

// event handlers
btnUpdateClick(e) {
  e.preventDefault();
  const id = this.state.txtID;
  const name = this.state.txtName;
  if (id && name) {
    const cate = { name: name };
    this.apiPutCategory(id, cate);
  } else {
    alert('Please input id and name');
  }
}

// apis
apiPutCategory(id, cate) {
  const config = { headers: { 'x-access-token': this.context.token } };
  axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
    const result = res.data;
    if (result) {
      alert('OK BABY!');
      this.apiGetCategories();
    } else {
      alert('SORRY BABY!');
    }
  });
}

// Event handlers
btnDeleteClick(e) {
  e.preventDefault();
  if (window.confirm('ARE YOU SURE?')) {
    const id = this.state.txtID;
    if (id) {
      this.apiDeleteCategory(id);
    } else {
      alert('Please input id');
    }
  }
}

// APIs
apiDeleteCategory(id) {
  const config = { headers: { 'x-access-token': this.context.token } };
  axios.delete('/api/admin/categories/' + id, config).then((res) => {
    const result = res.data;
    if (result) {
      alert('OK BABY!');
      this.apiGetCategories();
    } else {
      alert('SORRY BABY!');
    }
  });
}

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
}

export default CategoryDetail;