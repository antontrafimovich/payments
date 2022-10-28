const { getDataFromCsv } = require("./../../utils");

class MilReportParcer {
  async parse(file) {
    const sourceData = await getDataFromCsv(file.filepath);

    console.log(sourceData);

    return sourceData.map((item) => {
      return {
        address: item[6],
        date: item[1],
        value: item[7],
      };
    });
  }
}

module.exports = { MilReportParcer };
