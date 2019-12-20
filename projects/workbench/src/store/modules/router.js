const state = {
  file: '',
  videoFile: ''
}

const mutations = {
  fileSet: (state, n) => {
    console.log(n)
    state.file = n
  },
  videoFileSet: (state, n) => {
    console.log(n)
    state.videoFile = n
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
