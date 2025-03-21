const mongoose = require('mongoose');
const MyConstants = require('./MyConstants');

const uri = `mongodb+srv://${MyConstants.DB_USER}:${MyConstants.DB_PASS}@${MyConstants.DB_SERVER}/${MyConstants.DB_DATABASE}`;
// mongodb+srv://minhquan1627:<db_password>@cluster0.pmpo0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to ${MyConstants.DB_SERVER}/${MyConstants.DB_DATABASE}`);
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
