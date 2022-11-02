export default {
  setCurrentUser(state, data) {
    state.token = data.token
    state.currentUser = data.currentUser
  },
}
