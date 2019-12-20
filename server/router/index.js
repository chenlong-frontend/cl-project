const express = require("express");
const router = express.Router();
router.use("/", (req, res) => {
  res.send("首页");
});

module.exports = router;
