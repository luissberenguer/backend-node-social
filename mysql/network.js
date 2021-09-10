const express = require('express');
const router = express.Router();
const response = require('../network/response');
const Store = require('../store/mysql');


router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/table', insert);
router.put('/:table/:id', upsert);

async function list(req, res, next) {
    const rows = await Store.list(req.params.table);
    response.success(req, res, rows, 200);
}

async function get(req, res, next) {
    const row = await Store.list(req.params.table, req.params.id);
    response.success(req, res, row, 200);
}

async function insert(req, res, next) {
    const row = await Store.insert(req.params.table, req.body);
    response.success(req, res, row, 201);
}
async function upsert(req, res, next) {
    const row = await Store.upsert(req.params.table, req.body);
    response.success(req, res, row, 200);
}


module.exports = router;