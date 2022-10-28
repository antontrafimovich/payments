require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var paymentsRouter = require("./routes/payments");
var banksRouter = require("./routes/banks");

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));

app.use("/payments", paymentsRouter);
app.use("/banks", banksRouter);

module.exports = app;
