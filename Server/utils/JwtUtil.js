const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Thay đổi với secret key của bạn

// Hàm tạo token
const genToken = (username, password) => {
  const payload = { username, password };
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token sẽ hết hạn sau 1 giờ
  return token;
};

// Hàm kiểm tra token
const checkToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ success: false, message: 'No token provided' });
  }

  // Xóa prefix 'Bearer ' nếu có
  const bearerToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

  jwt.verify(bearerToken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
    }
    req.user = decoded; // Lưu thông tin người dùng giải mã từ token vào req.user
    next(); // Tiến hành xử lý tiếp
  });
};

module.exports = {
  genToken,
  checkToken,
};
