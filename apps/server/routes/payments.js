var express = require("express");
var formidable = require("formidable");
var path = require("path");
var { write, generateId } = require("./../../utils");
const { OrmLocal } = require("../orm");
var router = express.Router();

const { getDataFromCsv, convertToCsvString } = require("./../../utils");

const orm = new OrmLocal();

const fileReader = (req, res, next) => {
  const form = formidable({});

  console.log("Anton");

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    req.files = files;
    next();
  });
};

router.post("/build_report", fileReader, async (req, res) => {
  const { file } = req.files;

  console.log(file);

  const sourceData = await getDataFromCsv(file.filepath);
  const mapData = await orm.getMapData();

  const mappedSourceData = sourceData.map((item) => {
    return {
      address: item["Adress"],
      date: item["Data waluty"],
      value: item["Kwota"],
    };
  });

  const resultData = mappedSourceData
    .filter((item) => Number.parseFloat(item.value) < 0)
    .map((item, index) => {
      return [
        index,
        item.value,
        item.date,
        mapData.find((mapDataItem) =>
          item.address.includes(mapDataItem.Address)
        )?.Type,
      ];
    });

  const csv = await convertToCsvString([
    ["Id", "Value", "Date", "Type"],
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
    .download(pathToFile, 'report.csv', (error) => console.log(error));
});

module.exports = router;
