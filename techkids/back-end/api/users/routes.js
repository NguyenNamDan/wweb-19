const express = require("express");
const UserModel = require("./models");
const path = require("path");
const bodyParser = require("body-parser");


const userRouter = express();
userRouter.use(bodyParser.urlencoded({ extended: false }));
userRouter.use(bodyParser.json());

module.exports = userRouter;
