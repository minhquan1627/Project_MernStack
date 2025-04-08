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
  },
  
  async selectTopNew(top) {
    const query = {};
    const mysort = { cdate: -1 }; // descending
    const products = await Models.Product.find(query).sort(mysort).limit(top).exec();
    return products;
  },

  async selectTopHot(top) {
    const items = await Models.Order.aggregate([
      { $match: { status: 'APPROVED' } },
      { $unwind: '$items' },
      { $group: { _id: '$items.product._id', sum: { $sum: '$items.quantity' } } },
      { $sort: { sum: -1 } }, // descending
      { $limit: top }
    ]).exec();

    var products = [];
    for (const item of items) {
      const product = await ProductDAO.selectByID(item._id);
      products.push(product);
    }
    return products;
  },

  async selectByCatID(_cid) {
    const query = { 'category._id': _cid };
    const products = await Models.Product.find(query).exec();
    return products;
  },
  
  async selectByKeyword(keyword) {
    const query = { name: { $regex: new RegExp(keyword, "i") } };
    const products = await Models.Product.find(query).exec();
    return products;
  }


};



module.exports = ProductDAO;
