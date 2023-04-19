const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');

app.use(bodyParser.json());
app.use(cors({
  origin: 'http:localhost/'
}));

app.use("/posts", postsRoute);
app.use("/user", userRoute);

module.exports = app;
