const express = require('express')
const router = express.Router()
router.use('/workbench/download', (req, res) => {
  let backData = {
    code: 0,
    msg: 'ok',
    data: {}
  }
  res.json(backData)
})

module.exports = router
