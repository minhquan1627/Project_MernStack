require('../utils/MongooseUtil.js');
const Models = require('./Models.js');

const AdminDAO = {
  async selectByUsernameAndPassword(username, password) {
    const query = { username, password };
    const admin = await Models.Admin.findOne(query);
    return admin;
  }
};

module.exports = AdminDAO;
