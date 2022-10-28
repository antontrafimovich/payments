const fs = require("fs");
const path = require("path");

const write = (path, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      resolve(path);
    });
  });
};

module.exports = { write };
