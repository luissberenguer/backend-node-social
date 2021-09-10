const auth = require('../../../auth')

module.exports = function checkAuth(action){


    function middleware(req, res, next) {
        switch(action){
            case 'post':
                auth.check.logged(req);
                next();
                break;
            case 'update':
                const owner = req.body.user;
                auth.check.own(req, own);
                next();
                break;
            default:
                next();
        }
    }

    return middleware;
}