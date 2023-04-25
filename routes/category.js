const express = require('express');

const categoryController = require('../controllers/category.controller');

const router = express.Router();

//router.get('/:id', categoryController.show);  
router.get('/', categoryController.index);

module.exports = router;