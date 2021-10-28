const express = require('express');
const admin = require('../controllers/c_admin');
const app = express.Router();

app.get('/dashboard', admin.admin);

app.post('/addarticulo', admin.addarticulo);

module.exports = app;