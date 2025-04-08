const express = require('express');
const router = express.Router();
const JwtUtil = require('../utils/JwtUtil');
// daos
const CategoryDAO = require('../Models/CategoryDAO');
const ProductDAO = require('../Models/ProductDAO');
const CustomerDAO = require('../Models/CustomerDAO');

// Login
router.post('/login', async function (req, res) {
  const { username, password } = req.body;

  if (username && password) {
    const admin = await CustomerDAO.selectByUsernameAndPassword(username, password);
    if (admin) {
      const token = JwtUtil.genToken(username, password); // Sử dụng JwtUtil để tạo token
      res.json({ success: true, message: 'Authentication successful', token });
    } else {
      res.json({ success: false, message: 'Incorrect username or password' });
    }
  } else {
    res.json({ success: false, message: 'Please input username and password' });
  }
});

router.post('/register', async function (req, res) {
  const { username, password, name, phone, email } = req.body;

  // Kiểm tra nếu thiếu thông tin
  if (!username || !password || !name || !phone || !email) {
      return res.json({ success: false, message: 'Please provide all required fields' });
  }

  try {
      // Kiểm tra xem username đã tồn tại chưa
      const existingUser = await CustomerDAO.selectByUsername(username);
      if (existingUser) {
          return res.json({ success: false, message: 'Username already exists' });
      }

      // Thêm user vào database
      const newUser = await CustomerDAO.insert({ username, password, name, phone, email });

      if (newUser) {
          const token = JwtUtil.genToken(username, password);
          res.json({ success: true, message: 'Registration successful', token });
      } else {
          res.json({ success: false, message: 'Failed to register user' });
      }
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// category
router.get('/categories', async function (req, res) {
  const categories = await CategoryDAO.selectAll();
  res.json(categories);
});

// product
router.get('/product/new', async function (req, res) {
  const products = await ProductDAO.selectTopNew(3);
  res.json(products);
});

router.get('/product/hot', async function (req, res) {
  const products = await ProductDAO.selectTopHot(3);
  res.json(products);
});

router.get('/product/category/:cid', async function (req, res) {
  const _cid = req.params.cid;
  const products = await ProductDAO.selectByCatID(_cid);
  res.json(products);
});

router.get('/product/search/:keyword', async function (req, res) {
  const keyword = req.params.keyword;
  const products = await ProductDAO.selectByKeyword(keyword);
  res.json(products);
});

// product
router.get('/product/:id', async function (req, res) {
  const _id = req.params.id;
  const product = await ProductDAO.selectByID(_id);
  res.json(product);
});

// Token validation example
router.get('/token', JwtUtil.checkToken, function (req, res) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  res.json({ success: true, message: 'Token is valid', token });
});

module.exports = router;
