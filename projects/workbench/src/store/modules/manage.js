const state = {
  manageId: '',
  manageName: ''
}

const mutations = {
  idSet: (state, n) => {
    console.log(n)
    state.manageId = n + ''
  },
  nameSet: (state, n) => {
    console.log(n)
    state.manageName = n + ''
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
