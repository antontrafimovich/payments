const crypto = require("crypto");

const generateId = () => {
  return crypto.randomBytes(20).toString("hex");
};

module.exports = { generateId };
