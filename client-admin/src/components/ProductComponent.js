import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null,
    };
  }

  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.category.name}</td>
          <td>
            <img src={`data:image/jpg;base64,${item.image}`} width="100px" height="100px" alt="" />
          </td>
        </tr>
      );
    });

    const MAX_VISIBLE_PAGES = 5; // Số trang tối đa hiển thị

    const renderPagination = () => {
      const { curPage, noPages } = this.state;
      if (noPages <= 1) return null; // Nếu chỉ có 1 trang thì không hiển thị phân trang
    
      const pages = [];
      const MAX_VISIBLE_PAGES = 5; // Giới hạn số trang hiển thị
    
      let startPage = Math.max(1, curPage - Math.floor(MAX_VISIBLE_PAGES / 2));
      let endPage = Math.min(noPages, startPage + MAX_VISIBLE_PAGES - 1);
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    
      // Nút chuyển đến trang đầu tiên
      if (startPage > 1) {
        pages.push(
          <span key="first" className="link" onClick={() => this.lnkPageClick(1)}> | 1 | </span>,
          startPage > 2 && <span key="dots-start"> ... </span> // Dấu "..."
        );
      }
    
      // Render các trang trong khoảng startPage -> endPage
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <span key={i} className={i === curPage ? "active-page" : "link"} onClick={() => i !== curPage && this.lnkPageClick(i)}>
            | {i} |
          </span>
        );
      }
    
      // Nút chuyển đến trang cuối cùng
      if (endPage < noPages) {
        pages.push(
          endPage < noPages - 1 && <span key="dots-end"> ... </span>, // Dấu "..."
          <span key="last" className="link" onClick={() => this.lnkPageClick(noPages)}> | {noPages} | </span>
        );
      }
    
      return pages;
    };


    return (
      <div className="product-container">
        <div className="table-container">
          <h2 className="text-center">PRODUCT LIST</h2>
          <table className="datatable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Creation Date</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {prods}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6">{renderPagination}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Form chi tiết sản phẩm */}
        <ProductDetail 
          item={this.state.itemSelected} 
          curPage={this.state.curPage} 
          updateProducts={this.updateProducts} 
        />
      </div>

    );
  }

  updateProducts = (products, noPages) => { // arrow function
    this.setState({ products: products, noPages: noPages });
  };  

  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }

  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }

  trItemClick(item) {
    this.setState({ itemSelected: item });
  }

  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/admin/products?page=${page}`, config).then((res) => {
      const result = res.data;
      this.setState({
        products: result.products,
        noPages: result.noPages,
        curPage: result.curPage,
      });
    });
  }
}

export default Product;
