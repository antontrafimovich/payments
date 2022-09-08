var express = require("express");
const { OrmLocal } = require("../orm");
var router = express.Router();

const { getDataFromCsv, convertToCsvString } = require("./../../utils");

const orm = new OrmLocal();

router.post("/build_report", async (req, res) => {
  const url = req.body.url;

  const sourceData = await getDataFromCsv(url);
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

  console.log(csv);
});

module.exports = router;
