const {nanoid} = require('nanoid');
const auth = require('../auth')

const TABLA = 'users';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    function getUser(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
        }

        if (body.id) {
            user.id = body.id
            user.isNew = false;
        } else {
            user.id = nanoid();
            user.isNew = true;
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
                isNew: user.isNew,
            })
        }

        console.log('[user]', user);
        return store.upsert(TABLA, user);
    }

    function deleteUser(id){
        return store.remove(TABLA, id);
    }

    function follow(from, to) {
        return store.upsert('user_follow',{
            user_from: from,
            user_to: to
        })
    }

    async function following(user_id){
        const join = {};
        join[TABLA] = 'user_to'; // { user: 'user_to}
        const query = {user_from: user_id};

        return await store.query('user_follow', query, join)
    }

    return {
        list,
        getUser,
        upsert,
        deleteUser,
        follow,
        following,
    }
}
