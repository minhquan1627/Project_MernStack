import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      cmbCategory: '',
      imgProduct: '',
    };
  }

  render() {
    const cates = this.state.categories.map((cate) => {
      return (
        <option key={cate._id} value={cate._id} selected={this.props.item?.category?._id === cate._id}>
          {cate.name}
        </option>
      );
    });

    return (
      <div className="product-detail">
        <h2 className="text-center">PRODUCT DETAIL</h2>
        <form>
          {/* ID */}
          <div className="form-group">
            <label>ID</label>
            <input type="text" value={this.state.txtID} readOnly />
          </div>

          {/* Name */}
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              value={this.state.txtName} 
              onChange={(e) => this.setState({ txtName: e.target.value })} 
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label>Price</label>
            <input 
              type="text" 
              value={this.state.txtPrice} 
              onChange={(e) => this.setState({ txtPrice: e.target.value })} 
            />
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label>Image</label>
            <input 
              type="file" 
              accept="image/jpeg, image/png, image/gif" 
              onChange={(e) => this.previewImage(e)} 
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category</label>
            <select 
              value={this.state.cmbCategory} 
              onChange={(e) => this.setState({ cmbCategory: e.target.value })}
            >
              {cates}
            </select>
          </div>

          {/* Button Actions */}
          <div className="button-group">
            <button className="btn add" onClick={(e) => { e.preventDefault(); this.btnAddClick(e); }}>ADD NEW</button>
            <button className="btn update" onClick={(e) => this.btnUpdateClick(e)}>UPDATE</button>
            <button className="btn delete" onClick={(e) => this.btnDeleteClick(e)}>DELETE</button>
          </div>

          {/* Image Preview */}
          <div className="image-preview">
            <img src={this.state.imgProduct} width="300px" height="300px" alt="Product Preview" />
          </div>
        </form>
      </div>

    );
  }

  btnAddClick(e) {
    e.preventDefault();  // Ngừng gửi form
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, '');  // Xóa phần prefix 'data:image/...;base64,' trong image base64
  
    // Kiểm tra dữ liệu đầu vào
    if (name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPostProduct(prod);  // Gọi API thêm sản phẩm
    } else {
      alert('Please input name, price, category, and image');  // Thông báo nếu có trường thiếu
    }
  }
  
  // API thêm sản phẩm
  apiPostProduct(prod) {
    console.log("Product data being sent:", prod); // Kiểm tra dữ liệu trước khi gửi

    const config = { 
        headers: { 'x-access-token': this.context.token } 
    };  

    axios.post('/api/admin/products', prod, config)
        .then((res) => {
            console.log("Response received:", res.data);
            if (res.data) {
                alert('OK BABY!');  
                this.apiGetProducts();  
            } else {
                alert('SORRY BABY!');
            }
        })
        .catch((err) => {
            console.error("API error:", err.response?.data || err.message);
            alert('Error occurred while adding product!');
        });
}

  
  // API lấy danh sách sản phẩm
  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };  // Cấu hình headers với token
    axios.get(`/api/admin/products?page=${this.props.curPage}`, config).then((res) => {
      const result = res.data;
      this.props.updateProducts(result.products, result.noPages);  // Cập nhật danh sách sản phẩm
    }).catch((err) => {
      console.error(err);
      alert('Error occurred while fetching products!');
    });
  }
  
  btnUpdateClick = (e) => {
    e.preventDefault(); // Ngừng hành động mặc định của form
  
    // Lấy các giá trị từ state
    const { txtID, txtName, txtPrice, cmbCategory, imgProduct } = this.state;
  
    // Kiểm tra xem tất cả các trường đều có giá trị hợp lệ không
    if (txtID && txtName && txtPrice && cmbCategory && imgProduct) {
      // Tạo đối tượng sản phẩm
      const product = {
        name: txtName,
        price: parseInt(txtPrice), // Chuyển giá trị price thành số
        category: cmbCategory,
        image: imgProduct.replace(/^data:image\/[a-z]+;base64,/, '') // Xử lý base64
      };
  
      // Gọi API để cập nhật sản phẩm
      this.apiPutProduct(txtID, product);
    } else {
      alert('Please input id, name, price, category, and image');
    }
  };
  
  apiPutProduct = (id, product) => {
    const config = { headers: { 'x-access-token': this.context.token } }; // Lấy token từ context
  
    axios.put(`/api/admin/products/${id}`, product, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          alert('Product updated successfully!');
          this.apiGetProducts(); // Cập nhật danh sách sản phẩm sau khi cập nhật
        } else {
          alert('Error updating product!');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Server error. Please try again later.');
      });
  };

  btnDeleteClick(e) {
    e.preventDefault();
    
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('Please input id');
      }
    }
  }
  
  // API delete product
  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
  
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result && result.message === 'Product deleted successfully') {
        alert('Product deleted successfully!');
        this.apiGetProducts();
      } else {
        alert('Error occurred while deleting product!');
      }
    }).catch((error) => {
      console.error('Error deleting product:', error);
      alert('An error occurred. Please try again!');
    });
  }
  
  // API get products
  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
  
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages);
      } else {
        // Handle the case when the products list is empty, move to the previous page
        if (this.props.curPage > 1) {
          axios.get('/api/admin/products?page=' + (this.props.curPage - 1), config).then((res) => {
            const result = res.data;
            this.props.updateProducts(result.products, result.noPages);
          });
        }
      }
    }).catch((error) => {
      console.error('Error fetching products:', error);
      alert('An error occurred while fetching products. Please try again!');
    });
  }
  
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
  
    axios.get('/api/admin/categories', config)
      .then((res) => {
        const result = res.data;
        this.setState({ categories: result });
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
        alert('An error occurred while fetching categories.');
      });
  }
  

  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item?._id || '',
        txtName: this.props.item?.name || '',
        txtPrice: this.props.item?.price || 0,
        cmbCategory: this.props.item?.category?._id || '',
        imgProduct: this.props.item?.image ? `data:image/jpg;base64,${this.props.item.image}` : '',
      });
    }
  }

  // event-handlers
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }


}



export default ProductDetail;
