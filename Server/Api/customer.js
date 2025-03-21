const express = require('express');
const router = express.Router();

// Utils
const JwtUtil = require('../utils/JwtUtil');
// DAOs
const CustomerDAO = require('../Models/CustomerDAO');

// Login
router.post('/login', async function (req, res) {
  const { username, password } = req.body;

  if (username && password) {
    const admin = await CustomerDAO.selectByUsernameAndPassword(username, password);
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
        const newUser = await CustomerDAO.insertUser({ username, password, name, phone, email });

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


router.get('/token', JwtUtil.checkToken, function (req, res) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  res.json({ success: true, message: 'Token is valid', token });
});

module.exports = router;