import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null, // Lưu mục đã chọn
    };
  }

  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
        </tr>
      );
    });

    return (
      <div className="category-container">
        <h2 className="text-center">CATEGORY LIST</h2>
        <div className="table-container">
          <table className="datatable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>{cates}</tbody>
          </table>
        </div>

        {/* Giao diện chi tiết danh mục */}
        <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
      </div>

    );
  }

  updateCategories = (categories) => { // Cập nhật danh sách categories
    this.setState({ categories: categories });
  };

  componentDidMount() {
    this.apiGetCategories(); // Gọi API khi component được mount
  }

  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item }); // Cập nhật mục được chọn
  }

  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default Category;
