const express = require('express');
const router = express.Router();
const secure = require('./secure')
const response = require('../../../network/response');
const Controller = require('./index');


// Routes
router.get('/', list);
router.get('/:id', get);
router.get('/user/:id', getByUserId)
router.post('/', secure('post') ,insert);
router.put('/', secure('update') ,update);
router.delete('/id', remove); // Verify the user



// functions

function list(req, res, next) {
    Controller.list()
        .then( posts => {
            response.success(req, res, posts, 200);
        })
        .catch(next);
}

function get(req, res, next) {
    Controller.get(req.params.id)
        .then(post => {
            response.success(req, res, post, 200);
        })
        .catch(next);
}

function getByUserId(req, res, next) {
    Controller.getByUserId(req.params.id)
        .then( posts => {
            response.success(req,res, posts, 200);
        })
        .catch(next);
}

function insert(req, res, next) {
    Controller.insert(req.body)
        .then( post => {
            response.success(req, res, post, 201);
        })
        .catch(next);
}

function update(req, res, next) {
    Controller.insert(req.body)
        .then( post => {
            response.success(req, res, post, 200);
        })
        .catch(next);
}

function remove(req, res, next) {
    Controller.remove(req.params.id)
        .then(ok => {
            response.success(req, res, ok, 204);
        })
        .catch(next);
}





module.exports = router;