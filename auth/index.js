const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;
console.log(secret);
console.log('[jwt]', jwt.sign({
    id: '6rND0IE6cpG6Rr_jC_efC',
    username: 'paquito97',
    isNew: 1,
    password: '$2b$05$IncGB3J3JX4A5xr52rDZvO6PjnySePLvCZPZswdymMcQjkLH.N1de'
  }, secret))

 function sign(data) {
    return jwt.sign(JSON.stringify(data), secret) // aquí está el BUG // la solución es hacer JSON.stringify()
}

function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);

        if (decoded.id !== owner){
            throw error('No puedes hacer esto', 401);
        }
    },

    logged: function(req) {
        const decoded = decodeHeader(req);
    }
}

function getToken(auth) {
    if(!auth) {
        throw new Error('No viene ningún token')
    }
    if(auth.indexOf('Bearer ') == -1) {
        throw new Error('Formato inválido  o token incorrecto');
    }
    
    let token = auth.replace('Bearer ', '')
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    console.log('[req.user]', req.user)
    return decoded;
}


module.exports = {
    sign,
    check,
}