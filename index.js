const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api/swagger.json');

const config = require('./config.js');
const user = require('./api/components/user/network');
const auth = require('./api/components/auth/network');
const errors = require('./network/errors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errors); // tiene que ser el último

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto: ', config.api.port)
})