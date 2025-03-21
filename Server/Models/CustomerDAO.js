require('../utils/MongooseUtil.js');
const Models = require('./Models.js');

const CustomerDAO = {
    // Tìm user theo username
    async selectByUsername(username) {
      return await Models.Customer.findOne({ username });
    },
  
    // Kiểm tra username + password
    async selectByUsernameAndPassword(username, password) {
      return await Models.Customer.findOne({ username, password });
    },
  
    // Thêm user mới
    async insertUser(userData) {  // Hàm này phải có!
      const newUser = new Models.Customer(userData);
      return await newUser.save();
    }
  };

module.exports = CustomerDAO;
