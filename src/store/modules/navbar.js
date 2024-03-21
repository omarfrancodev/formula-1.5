export default {
  state: {
    activeLink: '/'
  },
  mutations: {
    SET_ACTIVE_LINK(state, payload) {
      state.activeLink = payload.link
    }
  },
  actions: {
    setActiveLink({ commit }, link) {
      commit('SET_ACTIVE_LINK', { link })
    }
  }
}
