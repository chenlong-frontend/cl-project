const state = {
  userTableId: '0',
  currentPage: ''
}

const getters = {
  checkoutUsertableId: state => {
    return state
  }
}

const mutations = {
  changeUserTableId (state, val) {
    state.userTableId = val
  },
  // 暂未使用
  changeCurrentPage (state, val) {
    state.currentPage = val
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
