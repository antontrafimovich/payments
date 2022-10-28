var express = require("express");
var formidable = require("formidable");
var path = require("path");
var { write, generateId } = require("./../../utils");
const { OrmNotion } = require("../orm");
var router = express.Router();

const { convertToCsvString } = require("./../../utils");
const { PkReportParcer, MilReportParcer } = require("../report-parsers");

const orm = new OrmNotion();

const fileReader = (req, res, next) => {
  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    req.fileForm = {
      file: files.file,
      ...fields,
    };

    next();
  });
};

const getParcer = (req, res, next) => {
  const { bank } = req.fileForm;

  if (bank === "PK") {
    req.parser = new PkReportParcer();
  }

  if (bank === "Mill") {
    req.parser = new MilReportParcer();
  }

  next();
};

router.post("/build_report", fileReader, getParcer, async (req, res) => {
  const { file } = req.fileForm;

  const { parser } = req;

  const sourceData = await parser.parse(file);
  const mapData = await orm.getMapData();

  const resultData = sourceData.map((item, index) => {
    const mapDataItem = mapData.find((mapDataItem) => {
      const addressWords = mapDataItem.Address.split(" ");

      return addressWords.every((word) => item.address.includes(word));
    });

    let counterparty = mapDataItem?.Address;

    if (!mapDataItem) {
      counterparty = item.address;
    }

    return [index, item.value, item.date, mapDataItem?.Type, counterparty];
  });

  const csv = await convertToCsvString([
    ["Id", "Value", "Date", "Type", "Counterparty"],
    ...resultData,
  ]);

  const fileId = generateId();
  await write(`${path.resolve(__dirname, "./../static")}/${fileId}.csv`, csv);

  res.json({
    response: {
      fileName: fileId,
    },
  });
});

router.get("/download/:fileId", (req, res) => {
  const { fileId } = req.params;

  const pathToFile = path.resolve(__dirname, `./../static/${fileId}.csv`);
  res
    .setHeader("Content-Type", "application/csv; charset=utf8")
    .download(pathToFile, "report.csv", (error) => console.log(error));
});

module.exports = router;
