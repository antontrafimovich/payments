const csv = require("./csv");
const check = require("./check");
const file = require("./file");
const id = require("./id");

module.exports = { ...csv, ...check, ...file, ...id };
