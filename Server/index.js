const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware để xử lý JSON và URL-encoded data
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Import và sử dụng route
app.use('/api/admin', require('./Api/admin'));

// Import và sử dụng route
app.use('/api/customer', require('./Api/customer'));

// API route
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello from server!'});
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});