var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.json(["PK", "Mill"]);
});

module.exports = router;
