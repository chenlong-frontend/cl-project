const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const Mock = require('mockjs')
let Random = Mock.Random

router.use('/workbench/upload', upload.any(), (req, res) => {
// let files = req.files[0]
  let backData
// console.log(files)
  // 图片上传的返回
  if (req.body.type === '237') {
    backData = Mock.mock({
      'file_id': Random.id(),
      'file_ser_id': Random.id()
    })
  }
  // 批量导入的返回
  if (req.body.type === '238') {
    backData = Mock.mock({
      'gro_list|5': [{
        Id: Random.id(),
        emp_name: Random.cword(3),
        emp_sex: Random.cword(1),
        'age|15-40': 40,
        pro_id: Random.id(),
        // dep_name: Random.cword(6),
        // emp_post: Random.cword(6),
        ic_card: Random.id(),
        emp_role: Random.cword(2),
        emp_mobile: '13912312345',
        emp_phone: '025-12345678',
        emp_email: Random.email()
      }]
    })
  }
  // 批量导入的返回
  if (req.body.type === '2388') {
    backData = Mock.mock({
      'helment_list|5': [{
        'no': Random.id(),
        'emp_name': Random.cword(3),
        'mobile': Random.id(),
        'create_time': Random.date('yyyy-MM-dd'),
        'pro_id': Random.id()
      }]
    })
  }
  if (req.body.type === '12') {
    if (JSON.parse(req.body.data).flag === 2) {
      backData = Mock.mock({
        'pic_url': Random.image('200x100', '#50B347', '#FFF', 'Mock.js')
      })
    }
  }
  if (req.body.type === '1614') {
    backData = Mock.mock({
      'rec_pic_url': Random.image('200x100', '#50B347', '#FFF', 'Mock.js')
    })
  }
  if (req.body.type === '123') {
    if (JSON.parse(req.body.data).flag === 2) {
      backData = Mock.mock({
        'pic_url': Random.url(),
        'pos_one_lat': 20.02,
        'pos_one_lng': 20.01,
        'pos_two_lat': 20.03,
        'pos_two_lng': 20.04,
        'pic_direct': 1
      })
    }
  }
  backData = {
    code: 0,
    msg: 'ok',
    data: backData
  }
  res.json(backData)
})

module.exports = router
