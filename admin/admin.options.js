const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
AdminBro.registerAdapter(AdminBroMongoose);
const User =require('../models/model');
const options = {
  resources: [User],
 };

module.exports = options;
