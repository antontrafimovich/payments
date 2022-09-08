const { getDataFromCsv } = rquire("./../../../utils");

export class OrmLocal {
  async getMapData() {
    const data = await getDataFromCsv(
      path.resolve(__dirname, "./../../db/local/map.csv")
    );

    return data;
  }
}
