require ('../utils/MongooseUtil') ;
const Models = require ('./Models.js') ;

const CategoryDAO = {
  async selectAll() {
    const query = {};
    const categories = await Models.Category.find(query).exec();
    return categories;
  },

  async selectByID(id) {
    // Tìm Category theo ID
    const category = await Models.Category.findById(id).exec();
    return category; // Trả về category tìm được
  },

  async insert(category) {
    const mongoose = require('mongoose');
    category._id = new mongoose.Types.ObjectId();
    const result = await Models.Category.create(category);
    return result;
  },

  async update(category) {
    const newValues = { name: category.name };
    const result = await Models.Category.findByIdAndUpdate(
      category._id,
      newValues,
      { new: true } // Trả về bản ghi sau khi update
    );
    return result;
  },

  async delete(_id) {
    const result = await Models.Category.findByIdAndDelete(_id);
    return result;
  }
};

module.exports = CategoryDAO;