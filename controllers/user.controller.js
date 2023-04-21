const models = require("../models");
const bycryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

function signUp(req, res){

    models.User.findOne({where:{email: req.body.email}}).then(result => {
        if(result){
            res.status(409).json({
                message: "Email already exists!!"
            });
        }else{
            bycryptjs.genSalt(10, function(err, salt){
                bycryptjs.hash(req.body.password, salt, function(err, hash){
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    };
                
                    models.User.create(user).then(result => {
                        res.status(201).json({
                            message: "Registration successfull"
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: "Something went wrong! signUp"
                        });
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong signUp 2",
			error: error
        });
    });
}

//Login function
function login(req, res){
    models.User.findOne({where:{email:req.body.email}}).then(result =>{
        if(result === null){
            res.status(200).json({
                message: "Invalid Credentials"
            });
        }else{
            bycryptjs.compare(req.body.password, result.password, function(err, results){
                if(results){
                    const token = jwt.sign({
                        email: result.email,
                        userId: result.id
                    }, 'secret', function(err, token){
                        res.status(200).json({
                            message: "Authentication successfull",
                            token: token
                        });
                    });
                }else{
                    res.status(200).json({
                        message: "Invalid Credentials"
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong"
        });
    });
}

module.exports = {
    signUp: signUp,
    login: login
}