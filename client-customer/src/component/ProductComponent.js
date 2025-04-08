import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: false
    };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      this.loadData();
    }
  }

  componentDidUpdate(prevProps) {
    const { cid, keyword } = this.props.params;
    const { cid: prevCid, keyword: prevKeyword } = prevProps.params;

    if (cid !== prevCid || keyword !== prevKeyword) {
      this.loadData();
    }
  }

  loadData() {
    const { cid, keyword } = this.props.params;

    this.setState({ isLoading: true, products: [] });

    if (cid) {
      console.log("🔄 Fetching by CID:", cid);
      this.apiGetProductsByCatID(cid);
    } else if (keyword) {
      console.log("🔍 Fetching by KEYWORD:", keyword);
      this.apiGetProductsByKeyword(keyword);
    } else {
      console.warn("⚠️ No cid or keyword found in params.");
      this.setState({ isLoading: false });
    }
  }

  apiGetProductsByCatID(cid) {
    axios.get(`/api/customer/product/category/${cid}`)
      .then((res) => {
        console.log("📦 Products by Category Response:", res.data);
        this.setState({
          products: Array.isArray(res.data) ? res.data : [],
          isLoading: false
        });
      })
      .catch((err) => {
        console.error("❌ Error getting products by category:", err);
        this.setState({ isLoading: false });
      });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get(`/api/customer/product/search/${keyword}`)
      .then((res) => {
        console.log("🔍 Products by Keyword Response:", res.data);
        this.setState({
          products: Array.isArray(res.data) ? res.data : [],
          isLoading: false
        });
      })
      .catch((err) => {
        console.error("❌ Error getting products by keyword:", err);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { products, isLoading } = this.state;

    const productList = Array.isArray(products) && products.length > 0 ? (
      products.map((item) => (
        <div key={item._id} className="inline">
          <figure>
            <Link to={`/product/${item._id}`}>
              <img
                src={item.image ? `data:image/jpg;base64,${item.image}` : 'https://via.placeholder.com/300x300?text=No+Image'}
                width="300px"
                height="300px"
                alt={item.name}
              />
            </Link>
            <figcaption className="text-center">
              {item.name} <br />
              Price: {Number(item.price).toLocaleString('vi-VN')} ₫ <br />
              {
                item.category && typeof item.category === 'object'
                  ? `Category: ${item.category.name || 'Unknown'}`
                  : `Category: ${item.category || 'Unknown'}`
              }
            </figcaption>
          </figure>
        </div>
      ))
    ) : (
      <p>No products found.</p>
    );

    return (
      <div className="text-center">
        <h2 className="text-center">LIST PRODUCTS</h2>
        {isLoading ? <p>Loading...</p> : productList}
      </div>
    );
  }
}

export default withRouter(Product);
