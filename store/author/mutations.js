import { getUrlLogin } from '~/helpers'

export default {
  setCurrentUser(state, data) {
    state.token = data.token
    state.currentUser = data.currentUser
  },

  setLogout(state) {
    state.token = ''
    state.currentUser = null
    this.$router.push(getUrlLogin())
  },
}
