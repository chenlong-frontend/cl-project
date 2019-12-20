const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("", require("./router/mobile/index"));
app.use("", require("./router/workbench/index"));
app.use("", require("./router/workbench/download"));
app.use("", require("./router/workbench/upload"));

// 监听3333
app.listen(3333);
console.log("http://localhost:3333/");
