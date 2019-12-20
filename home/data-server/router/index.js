const express = require('express');
const fs = require("fs");
const router = express.Router();
router.use('/', (req, res) => {
  const data = fs.readFileSync('./file/file.md');
  res.json({data: data.toString()})
});

module.exports = router;
