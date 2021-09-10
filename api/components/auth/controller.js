const auth = require('../../../auth/index');
const bcrypt = require('bcrypt');
const TABLA = 'auth';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    async function login(username, password) {
        const data = await store.query(TABLA, {username: username})
        console.log('[data]', data); // no te trae el password
        // (1234, '$2b$05$jIfF8/20E72pysklvHTrFuD2kdzjxETMv3fBhZR/3onBTG1.fu7di')
        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                console.log('[sonIguales]', sonIguales)
                if (sonIguales) {
                    //Generar token
                    console.log('[token]');
                    console.log(auth.sign(data));
                    return auth.sign(data); // aquí esta el BUG!!! No está devolviendo el token
                } else {
                    throw new Error('Contraseña invalida');
                }
            })
    }


    async function upsert(data) {
        const authData = {
            id: data.id
        }
        if (data.username) {
            authData.username = data.username;
            authData.isNew = data.isNew;
        }
        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }
        console.log('[auth]', authData);
        return store.upsert(TABLA, authData) // this upsert comes from store
    }

    return {
        upsert,
        login,
    }    
};