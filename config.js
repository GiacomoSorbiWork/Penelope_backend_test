require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  dbUrlMongoDB: process.env.MONGODB_URL,
};

console.log('config == ', config);

module.exports = config;
