const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const config = require('../config');
const post = require('./components/post/network');
const errors = require('../network/errors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// ROUTER
app.use('/api/post', post);

app.use(errors); // tiene que ser el último

app.listen(config.post.port, () => {
    console.log('Servicio posts escuchando en el puerto: ', config.post.port)
})