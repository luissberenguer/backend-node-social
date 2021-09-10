const TABLA = 'post';
const {nanoid} = require('nanoid');

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    function getByUserId(userId) {
        let query = {user_id: userId};
        let join = {users: user_id}; // join table users

        return store.query(TABLA, query, join);
    }

    function insert(body) {
        // Hay que validar los datos
        let post = {
            id: body.id || nanoid(10),
            user_id: body.user_id,
            text: body.text,
        }
        post.isNew = true;
        return store.upsert(TABLA, post);
    }

    function update(body) {
        // Hay que validar los datos
        let post = {
            id: body.id || nanoid(10),
            user_id: body.user_id,
            text: body.text,
        }
        post.isNew = false;
        return store.upsert(TABLA, post);
    }

    function remove(id) {
        return store.remove(TABLA, id);
    }

    return {
        list,
        get,
        getByUserId,
        insert,
        update,
        remove
    }
}