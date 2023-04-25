const Validator = require('fastest-validator');
const models = require('../models');
const jwt = require('jsonwebtoken');

function index(req, res){
    
    models.Category.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    });
}

module.exports = {
    index:index
};