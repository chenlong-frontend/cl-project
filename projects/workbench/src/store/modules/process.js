const state = {
  select: {},
  title: ''
}

const mutations = {
  changeSelect: (state, n) => {
    console.log(n)
    state.select = n
    state.title = n.text
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
