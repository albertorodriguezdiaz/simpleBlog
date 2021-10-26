const express = require('express');
const public = require('../controllers/c_app')
const app = express.Router();

app.get('/', public.index);

module.exports = app;