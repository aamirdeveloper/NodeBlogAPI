const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');

app.use(bodyParser.json());


app.use("/posts", postsRoute);
app.use("/user", userRoute);

module.exports = app;
