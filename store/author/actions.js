export default {
  async actFetchCurrentUser({ commit }, token) {
    try {
      if (token) {
        const response = await this.$api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 200 && response.data) {
          commit('setCurrentUser', {
            token,
            currentUser: response.data,
          })
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message)
    }
  },
}
