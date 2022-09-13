const ormLocal = require("./local/orm-local");
const ormNotion = require("./notion/orm-notion");

module.exports = { ...ormLocal, ...ormNotion };
