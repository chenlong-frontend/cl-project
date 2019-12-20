const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('', require('./router/index'));

app.listen(3330);
console.log('http://localhost:3330/');
