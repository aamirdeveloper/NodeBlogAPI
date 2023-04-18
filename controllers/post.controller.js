const Validator = require('fastest-validator');
const models = require('../models'); 

function save(req, res){
    console.log(req);
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: 1
    }

    const schema = {
        title: {type: "string", optional: false, max: "100"},
        content: {type: "string", optional: false, max: "500"},
        categoryId: {type: "number", optional: false}
    }

    const v = new Validator();
    const validationResponse = v.validate(post, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "validation failed",
            errors: validationResponse
        });
    }

    models.Post.create(post).then(result => {
        res.status(201).json({
            message: "Post created successfully",
            post: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function show(req, res){
    const id = req.params.id;

    models.Post.findByPk(id).then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message: "Post not found"
            }); 
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!"
        });
    });
}

function index(req, res){
    models.Post.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!"
        });
    });
}

function update(req, res){
    const id = req.params.id;
    const updatedPosts = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId
    };

    const userId = 1;

    const schema = {
        title: {type: "string", optional: false, max: "100"},
        content: {type: "string", optional: false, max: "500"},
        categoryId: {type: "number", optional: false}
    }

    const v = new Validator();
    const validationResponse = v.validate(updatedPosts, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "validation failed",
            errors: validationResponse
        });
    }


    models.Post.update(updatedPosts, {where:{
        id:id, userId:userId
    }}).then( result =>{
        res.status(200).json({
            message: "Post updated!",
            post: updatedPosts
        });
    }).catch( error => {
        res.status(500).json({
            message: "Something went wrong!"
        })
    });
}

function destroy(req, res){
    const id = req.params.id;
    const userId = 1;

    models.Post.destroy({where:{id:id, userId:userId}}).then( result =>{
        res.status(200).json({
            message: "Post deleted successfully!"
        });
    }).catch( error => {
        res.status(500).json({
            message: "Something went wrong!",
            error:error
        })
    });
}

module.exports = {
    save:save,
    show:show,
    index:index,
    update:update,
    destroy:destroy
};