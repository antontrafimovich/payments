const { getDataFromCsv } = require("./../../utils");

class PkReportParcer {
  getAddress(item) {
    if (item[7].includes(process.env.PHONE_NUMBER)) {
      return item[8];
    }

    if (item[7].includes("Nazwa odbiorcy")) {
      return `${item[7]} ${item[8]}`;
    }

    return item[7];
  }

  async parse(file) {
    const sourceData = await getDataFromCsv(file.filepath);

    return sourceData.map((item) => {
      return {
        address: this.getAddress(item),
        date: item[1],
        value: item[3],
      };
    });
  }
}

module.exports = { PkReportParcer };
