const { Client } = require("@notionhq/client");
const notion = new Client({
  auth: process.env.NOTION_AUTH,
});

class OrmNotion {
  async getMapData() {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    const data = response.results.map((item) => {
      return {
        Address: item.properties.Address.title[0].text.content,
        Type: item.properties.Type.select.name,
      };
    });

    console.log(data);

    return data;
  }
}

module.exports = { OrmNotion };
