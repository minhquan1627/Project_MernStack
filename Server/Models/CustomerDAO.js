require('../utils/MongooseUtil.js');
const Models = require('./Models.js');

const CustomerDAO = {
  // 🔹 Lấy tất cả khách hàng
  async selectAll() {
    try {
      return await Models.Customer.find();
    } catch (error) {
      console.error("Lỗi lấy danh sách khách hàng:", error);
      throw error;
    }
  },

  // 🔹 Tìm user theo ID
  async selectById(id) {
    try {
      return await Models.Customer.findById(id);
    } catch (error) {
      console.error("Lỗi tìm khách hàng theo ID:", error);
      throw error;
    }
  },

  // 🔹 Tìm user theo username
  async selectByUsername(username) {
    try {
      return await Models.Customer.findOne({ username });
    } catch (error) {
      console.error("Lỗi tìm khách hàng theo username:", error);
      throw error;
    }
  },

  // 🔹 Kiểm tra username + password
  async selectByUsernameAndPassword(username, password) {
    try {
      return await Models.Customer.findOne({ username, password });
    } catch (error) {
      console.error("Lỗi xác thực khách hàng:", error);
      throw error;
    }
  },

  // 🔹 Thêm user mới
  async insert(userData) {
    try {
      const newUser = new Models.Customer(userData);
      return await newUser.save();
    } catch (error) {
      console.error("Lỗi thêm khách hàng:", error);
      throw error;
    }
  },

  // 🔹 Cập nhật thông tin user
  async update(customerData) {
    try {
      const { _id, ...updateFields } = customerData;
      return await Models.Customer.findByIdAndUpdate(_id, updateFields, { new: true });
    } catch (error) {
      console.error("Lỗi cập nhật khách hàng:", error);
      throw error;
    }
  },

  // 🔹 Xóa user
  async delete(id) {
    try {
      return await Models.Customer.findByIdAndDelete(id);
    } catch (error) {
      console.error("Lỗi xóa khách hàng:", error);
      throw error;
    }
  }
};

module.exports = CustomerDAO;
