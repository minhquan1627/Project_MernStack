const express = require('express');
const router = express.Router();

// Utils
const JwtUtil = require('../utils/JwtUtil');

// DAOs
const AdminDAO = require('../models/AdminDAO');
const CategoryDAO = require('../Models/CategoryDAO');
const ProductDAO = require('../Models/ProductDAO');
const CustomerDAO = require('../Models/CustomerDAO');

// Login
router.post('/login', async function (req, res) {
  const { username, password } = req.body;

  if (username && password) {
    const admin = await AdminDAO.selectByUsernameAndPassword(username, password);
    if (admin) {
      const token = JwtUtil.genToken(username, password); // Thêm tham số cho token
      res.json({ success: true, message: 'Authentication successful', token });
    } else {
      res.json({ success: false, message: 'Incorrect username or password' });
    }
  } else {
    res.json({ success: false, message: 'Please input username and password' });
  }
});

// category
router.get('/categories', JwtUtil.checkToken, async function (req, res) {
  try {
    const categories = await CategoryDAO.selectAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/categories', JwtUtil.checkToken, async function (req, res) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newCategory = await CategoryDAO.insert({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/products', JwtUtil.checkToken, async function (req, res) {
  try {
    // Lấy các tham số từ body request
    const { name, price, category: cid, image } = req.body;

    // Kiểm tra nếu thiếu thông tin
    if (!name || !price || !cid || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Lấy thông tin category từ CategoryDAO
    const category = await CategoryDAO.selectByID(cid);

    // Nếu không tìm thấy category
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const now = new Date().getTime(); // milliseconds

    // Tạo đối tượng sản phẩm
    const product = { name, price, image, cdate: now, category };

    // Thêm sản phẩm vào cơ sở dữ liệu
    const result = await ProductDAO.insert(product);

    // Trả về kết quả thành công
    res.status(201).json(result); // 201: Created
  } catch (error) {
    console.error('Error in product creation:', error);
    res.status(500).json({ message: 'Internal server error' }); // 500: Server error
  }
});

router.put('/categories/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const name = req.body.name;
  const category = { _id, name };
  const result = await CategoryDAO.update(category);
  res.json(result);
});

router.delete('/categories/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const result = await CategoryDAO.delete(_id);
  res.json(result);
});

//product
router.get('/products', JwtUtil.checkToken, async function (req, res) {
  try {
    // Lấy dữ liệu sản phẩm
    let products = await ProductDAO.selectAll();

    // Phân trang
    const sizePage = 4;
    const noPages = Math.ceil(products.length / sizePage);
    let curPage = 1;
    if (req.query.page) curPage = parseInt(req.query.page);

    const offset = (curPage - 1) * sizePage;
    products = products.slice(offset, offset + sizePage);

    // Trả về kết quả JSON
    res.json({ products, noPages, curPage });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/products', JwtUtil.checkToken, async function (req, res) {
  try {
    console.log("Received data:", req.body); // Kiểm tra dữ liệu từ client
    // Lấy các tham số từ body request
    const { name, price, category: cid, image } = req.body;
    
    // Kiểm tra nếu thiếu thông tin
    if (!name || !price || !cid || !image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Lấy thông tin category từ CategoryDAO
    const category = await CategoryDAO.selectByID(cid);

    // Nếu không tìm thấy category
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const now = new Date().getTime(); // milliseconds

    // Tạo đối tượng sản phẩm
    const product = { name, price, image, cdate: now, category };

    // Thêm sản phẩm vào cơ sở dữ liệu
    const result = await ProductDAO.insert(product);

    // Trả về kết quả thành công
    res.status(201).json(result); // 201: Created

  } catch (error) {
    console.error('Error in product creation:', error);
    res.status(500).json({ message: 'Internal server error' }); // 500: Server error
  }
});

router.put('/products/:id', JwtUtil.checkToken, async function (req, res) {
  try {
    const id = req.params.id; // Lấy ID từ URL
    const { name, price, category, image } = req.body;
    // Giải nén các tham số từ body request

    // Kiểm tra tất cả các trường
    if (!id || !name || !price || !category || !image) {
      return res.status(400).json({ message: "All fields are required!" });  // Trả về lỗi nếu có trường thiếu
    }

    const categoryDoc = await CategoryDAO.selectByID(category);  // Tìm category theo ID

    // Nếu không tìm thấy category
    if (!categoryDoc) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updatedProduct = {
      _id: id,
      name,
      price,
      image,
      cdate: new Date().getTime(),  // Lấy thời gian hiện tại (ms)
      category: categoryDoc,  // Gán category vào sản phẩm
    };

    // Gọi hàm update từ ProductDAO
    const result = await ProductDAO.update(updatedProduct);

    // Nếu cập nhật thành công, trả về kết quả
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Product not found" });  // Nếu không tìm thấy sản phẩm để cập nhật
    }
  } catch (err) {
    console.error("Error in product update:", err);
    res.status(500).json({ message: "Server error" });  // Xử lý lỗi nếu có
  }
});
router.delete('/products/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id; // Lấy _id của sản phẩm từ URL params
  
  try {
    // Gọi hàm delete từ ProductDAO để xóa sản phẩm
    const result = await ProductDAO.delete(_id);

    if (result) {
      // Nếu xóa thành công, trả về thông báo thành công
      res.json({ message: 'Product deleted successfully' });
    } else {
      // Nếu không tìm thấy sản phẩm để xóa, trả về lỗi 404
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Lấy danh sách khách hàng
router.get('/customer', JwtUtil.checkToken, async function (req, res) {
  try {
    const customers = await CustomerDAO.selectAll();
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Thêm khách hàng mới
router.post('/customer', JwtUtil.checkToken, async function (req, res) {
  try {
    const { username, password, name, phone, email } = req.body;
    if (!username || !password || !name || !phone || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newCustomer = await CustomerDAO.insert({ username, password, name, phone, email });
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error adding customer:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Cập nhật thông tin khách hàng
router.put('/customer/:id', JwtUtil.checkToken, async function (req, res) {
  try {
    const _id = req.params.id;
    const { username, password, name, phone, email } = req.body;
    if (!username || !name || !phone || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const customer = { _id, username, password, name, phone, email };
    const result = await CustomerDAO.update(customer);
    res.json(result);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Xóa khách hàng
router.delete('/customer/:id', JwtUtil.checkToken, async function (req, res) {
  try {
    const _id = req.params.id;
    const result = await CustomerDAO.delete(_id);
    res.json(result);
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Token verification
router.get('/token', JwtUtil.checkToken, function (req, res) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  res.json({ success: true, message: 'Token is valid', token });
});


module.exports = router;
