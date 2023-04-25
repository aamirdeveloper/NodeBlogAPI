const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

app.use(cors({
  origin: 'http://localhost'
}));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');

app.use(bodyParser.json());


app.use("/posts", postsRoute);
app.use("/user", userRoute);
app.use("/category", categoryRoute);

module.exports = app;
