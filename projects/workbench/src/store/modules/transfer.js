//  import ajax from '../../api/ajax'

let appendData = [{id: 1, name: '张三'}, {id: 1, name: '李四'}, {id: 1, name: '史蒂夫'}, {id: 1, name: '速度'}]
let data = [{
  id: 1,
  label: '徐州沛县文萃苑',
  type: 'department',
  children: [
    {
      id: 2,
      label: '质量部',
      children: [{id: 3, label: 'JA0001', name: '张三', position: '队长', type: 'staff'},
        {id: 4, label: 'JA0002', name: '李四', position: '队长', type: 'staff'},
        {id: 5, label: 'JA0003', name: '张三', position: '队长', type: 'staff'},
        {id: 6, label: 'JA0004', name: '李四', position: '队长', type: 'staff'}]
    },
    {id: 7, label: '物资部', type: 'department'}]
}]
let data02 = [{
  id: 1,
  label: '徐州沛县文萃苑',
  type: 'department',
  children: [
    {
      id: 2,
      label: '质量部',
      children: [{id: 3, label: 'JA0001', name: '张三', position: '队长', type: 'staff'},
        {id: 4, label: 'JA0002', name: '李四', position: '队长', type: 'staff'}]
    },
    {id: 7, label: '物资部', type: 'department'}]
}]

const state = {
  data: [],
  appendData: [],
  data02: data02,
  loading: true
}

const mutations = {
  dataSet: (state, param) => {
    state.data = param
  },
  data02Set: (state, param) => {
    state.data02 = param
  },
  appendDataSet: (state, param) => {
    state.appendData = param
  },
  loadChange: (state, param) => {
    state.loading = param
  }
}
const actions = {
  getData ({commit}, param) {
    console.log(param)
    return new Promise((resolve, reject) => {
      // 这里写ajax请求,请求之前先调用,关于type在一个节点一个接口，选择人员data里给个0，取消选中给1
      // ajax.post(request, data => {
      //   commit('dataSet', data)
      //   commit('appendDataSet', appendData)
      //   resolve(data)
      // }, error => {
      //   console.log(error)
      //   reject(error)
      // })
      commit('dataSet', data)
      commit('appendDataSet', appendData)
      resolve()
    })
  },
  getData02 ({commit}, param) {
    console.log(param)
    return new Promise((resolve, reject) => {
      // 这里写ajax请求,请求之前先调用,关于type在一个节点一个接口，选择人员data里给个0，取消选中给1
      // ajax.post(request, data => {
      //   commit('dataSet', data)
      //   commit('appendDataSet', appendData)
      //   resolve(data)
      // }, error => {
      //   console.log(error)
      //   reject(error)
      // })
      commit('data02Set', data)
      commit('appendDataSet', appendData)
      resolve()
    })
  },
  addData ({commit}, param) {
    return new Promise((resolve, reject) => {
      // ajax请求
      console.log(param)
      // commit('dataSet', [])
      // commit('appendDataSet', [])
      resolve()
    })
  },
  addData02 ({commit}, param) {
    return new Promise((resolve, reject) => {
      // ajax请求
      console.log(param)
      // commit('data02Set', [])
      // commit('appendDataSet', [])
      resolve()
    })
  },
  removeData ({commit}, param) {
    return new Promise((resolve, reject) => {
      // ajax请求
      console.log(param)
      // commit('dataSet', [])
      // commit('appendDataSet', [])
      resolve()
    })
  },
  removeData02 ({commit}, param) {
    return new Promise((resolve, reject) => {
      // ajax请求
      console.log(param)
      // commit('data02Set', [])
      // commit('appendDataSet', [])
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
