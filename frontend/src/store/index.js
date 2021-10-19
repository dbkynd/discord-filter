import lodash from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    roles: [],
    roleCounts: [],
  },
  getters: {
    roles(state) {
      return [...state.roles]

        .sort((a, b) => b.rawPosition - a.rawPosition)
        .slice(0, -1)
    },
    yesRoles(state, getters) {
      return getters.roles.filter((x) => x.selected === 'Y').map((x) => x.id)
    },
    noRoles(state, getters) {
      return getters.roles.filter((x) => x.selected === 'N').map((x) => x.id)
    },
  },
  mutations: {
    setRoles(state, payload) {
      const newRoles = payload.map((x) => {
        const color = parseInt(x.color)
        const hex = `#${color.toString(16)}`
        return {
          ...x,
          hex: color === 0 ? '#b9bbbe' : hex,
          selected: null,
        }
      })
      state.roles = lodash.merge(newRoles, state.roles)
    },
    updateRole(state, payload) {
      state.roles.find((x) => payload.role.id === x.id).selected = payload.value
    },
    setRoleCounts(state, payload) {
      state.roleCounts = payload
    },
  },
  actions: {},
  modules: {},
})
