require('../utils/MongooseUtil');
const Models = require('./Models.js');


const ProductDAO = {
  async selectAll() {
    try {
      const products = await Models.Product.find({}).exec();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  async selectByID(_id) {
    try {
      if (!_id) {
        throw new Error('Invalid ID');
      }
      const category = await Models.Category.findById(_id).exec();
      if (!category) {
        throw new Error(`Category with ID ${_id} not found`);
      }
      return category;
    } catch (error) {
      console.error('Error in selectByID:', error);
      throw error;
    }
  },

  async insert(product) {
    try {
      const mongoose = require('mongoose');
      
      // Tạo _id mới cho sản phẩm
      product._id = new mongoose.Types.ObjectId();
      
      // Tạo mới sản phẩm trong cơ sở dữ liệu
      const result = await Models.Product.create(product);
      
      // Trả về kết quả sau khi tạo thành công
      return result;
    } catch (error) {
      console.error('Error in insert:', error);
      throw new Error('Error inserting product');
    }
  },
  async selectByID(_id) {
    try {
      const product = await Models.Product.findById(_id).exec();  // Tìm sản phẩm theo ID
      return product;  // Trả về sản phẩm tìm thấy
    } catch (err) {
      console.error('Error in selectByID:', err);
      throw err;  // Ném lỗi nếu có
    }
  },

  // Cập nhật sản phẩm
  async update(product) {
    try {
      // Xác định các trường cần cập nhật
      const newValues = {
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      };

      // Cập nhật sản phẩm bằng findByIdAndUpdate
      const updatedProduct = await Models.Product.findByIdAndUpdate(product._id, newValues, { new: true }).exec();
      return updatedProduct;  // Trả về sản phẩm đã được cập nhật
    } catch (err) {
      console.error('Error in update:', err);
      throw err;  // Ném lỗi nếu có
    }
  },
  async delete(_id) {
    try {
      const result = await Models.Product.findByIdAndDelete(_id); // Tìm và xóa sản phẩm theo _id
      return result;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error; // Ném lỗi nếu có
    }
  }
  
};

module.exports = ProductDAO;
