const { stringify } = require("csv-stringify");
const fs = require("fs");
const csv = require("csv-parser");

const getDataFromCsv = (srcPath) => {
  const results = [];

  return new Promise((resolve) => {
    fs.createReadStream(srcPath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      });
  });
};

const convertToCsvString = (values) => {
  return new Promise((res, rej) => {
    const data = [];

    const stringifier = stringify();

    stringifier.on("readable", function () {
      let row;
      while ((row = stringifier.read()) !== null) {
        data.push(row);
      }
    });

    stringifier.on("error", function (err) {
      console.error(err.message);
    });

    stringifier.on("finish", function () {
      res(data.join(""));
    });

    values.forEach((v) => stringifier.write(v));

    stringifier.end();
  });
};

module.exports = { convertToCsvString, getDataFromCsv };
