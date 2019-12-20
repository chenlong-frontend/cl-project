// import ajax from '../ajax.js'
const yearData = {
  proData: [
    {
      ct: '23',
      time: '2017'
    },
    {
      ct: '4',
      time: '2016'
    },
    {
      ct: '66',
      time: '2015'
    },
    {
      ct: '120',
      time: '2014'
    }
  ],
  otherData: [
  ]
}
const threeMonthData = {
  proData: [
  ],
  otherData: [
  ]
}
const monthData = {
  proData: [
    {
      ct: '73',
      time: '1'
    },
    {
      ct: '30',
      time: '2'
    },
    {
      ct: '23',
      time: '3'
    },
    {
      ct: '10',
      time: '4'
    }
  ],
  otherData: [
    {
      ct: '21',
      time: '2'
    },
    {
      ct: '105',
      time: '4'
    },
    {
      ct: '60',
      time: '6'
    },
    {
      ct: '80',
      time: '8'
    }
  ]
}
export default {
  // 集团，非集团,全部的选择
  selType (index, year, timeType) {
    return new Promise((resolve, reject) => {
      console.log(index, year)
      resolve({pro: yearData.proData, other: yearData.otherData})
    })
  },
// 获取年的图表
  getYearChart (year, type) {
    return new Promise((resolve, reject) => {
      resolve({pro: yearData.proData, other: yearData.otherData})
      // console.log({pro: proData, other: otherData})
      console.log(year + '---' + type)
    })
  },
//  获取季度的图表
  getQuarterChart (year, type) {
    return new Promise((resolve, reject) => {
      resolve({pro: threeMonthData.proData, other: threeMonthData.otherData})
      console.log(year + '---' + type)
    })
  },
//  获取月的图表
  getMonthChart (year, type) {
    return new Promise((resolve, reject) => {
      resolve({pro: monthData.proData, other: monthData.otherData})
      console.log(year + '****' + type)
    })
  }
}
