// CLI : npm install mongoose --save
const mongoose = require('mongoose');

// Schemas
const AdminSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String
  },
  { versionKey: false }
);

const CategorySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String
  },
  { versionKey: false }
);

const CustomerSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: String,
    password: String,
    name: String,
    phone: String,
    email: String,
    token: String
  },
  { versionKey: false, timestamps: true } // Lưu thời gian tạo & cập nhật
);

const ProductSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    image: String,
    cdate: Number,
    category: CategorySchema
  },
  { versionKey: false, timestamps: true }
);

const ItemSchema = new mongoose.Schema(
  {
    product: ProductSchema,
    quantity: Number
  },
  { versionKey: false, _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    cdate: Number,
    total: Number,
    status: String,
    customer: CustomerSchema,
    items: [ItemSchema]
  },
  { versionKey: false, timestamps: true }
);

// Models
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Customer = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

module.exports = { Admin, Category, Customer, Product, Order };
