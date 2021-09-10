const express = require('express');
const router = express.Router();
const secure = require('./secure')
const response = require('../../../network/response');
const Controller = require('./index');


// Routes
router.get('/', list);
router.get('/:id', get);
router.get('/:id/following', following);
router.post('/', upsert);
router.post('/follow/:id', secure('follow'), follow);
router.put('/', secure('update'), upsert);
router.delete('/:id', remove);

// Internal functions
function list(req, res, next) {
    Controller.list()
        .then(users => {
            response.success(req, res, users, 200);
        }).catch(next)
}

function get(req, res, next) {
    Controller.getUser(req.params.id)
        .then(user => {
            response.success(req, res, user, 200);
        }).catch(next)
}

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then(user => {
            response.success(req, res, user, 200);
        }).catch(next)
}

function remove(req, res) {
    Controller.deleteUser(req.params.id)
        .then(user => {
            response.success(req, res, user, 200);
        }).catch(next)
}

function follow(req, res, next) {
    Controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

function following(req, res, next) {
    Controller.following(req.params.id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

module.exports = router;