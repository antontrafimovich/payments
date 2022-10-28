const { getDataFromCsv } = require("./../../../utils");
const path = require("path");

class OrmLocal {
  async getMapData() {
    console.log(path.resolve(__dirname, "./../../db/local/map.csv"));
    const data = await getDataFromCsv(
      path.resolve(__dirname, "./../../db/local/map.csv")
    );

    return data;
  }
}

module.exports = { OrmLocal };
