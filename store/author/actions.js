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

  async actFetchLogin({ dispatch }, { username, password }) {
    try {
      const response = await this.$wpApi.post('/jwt-auth/v1/token', {
        username,
        password,
      })

      if (response.status === 200) {
        document.cookie = `access_token=${response.data.token}`

        dispatch('actFetchCurrentUser', response.data.token)

        return {
          ok: true,
        }
      }

      return {
        ok: false,
        error: response.message,
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return {
          ok: false,
          error: error.response.data.code,
        }
      }
      return {
        ok: false,
        error: error.message,
      }
    }
  },

  actLogout({ commit }) {
    commit('setLogout')
    document.cookie = `access_token=`
  },

  async actFetchRegister(
    { dispatch },
    { username, password, email, nickname }
  ) {
    try {
      const response = await this.$api.post('/users/register', {
        username,
        password,
        email,
        nickname,
      })

      if (response.status === 201) {
        return await dispatch('actFetchLogin', {
          username,
          password,
        })
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return {
          ok: false,
          error: error.response.data.code,
        }
      }
      return {
        ok: false,
        error: error.message,
      }
    }
  },

  // eslint-disable-next-line no-empty-pattern
  async actFetchUploadAvatar({ state }, { file }) {
    try {
      const token = state.token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const formData = new FormData()

      const response = await this.$api.post('/media', formData, config)

      return {
        ok: true,
        data: response.data,
      }
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      }
    }
  },

  // eslint-disable-next-line require-await
  async actFetchUploadProfile(
    { commit, dispatch, state },
    // eslint-disable-next-line camelcase
    { file, nickname, last_name, first_name, description }
  ) {
    try {
      const token = state.token

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const data = {
        nickname,
        // eslint-disable-next-line camelcase
        last_name,
        // eslint-disable-next-line camelcase
        first_name,
        description,
      }

      if (file) {
        const resMedia = await dispatch('actFetchUploadProfile', { file })

        if (!resMedia.data) {
          return {
            ok: false,
            error: resMedia.error,
          }
        }

        data.simple_local_avatar = {
          media_id: resMedia.data.id,
        }
      }

      const resUser = await this.$api.put('/users/me', data, config)

      const currentUser = resUser.data

      commit('setCurrentUser', { currentUser, token })

      return {
        ok: true,
        data: currentUser,
      }
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      }
    }
  },

  async actFetchChangePassword(
    { state },
    { password, newPassword, confirmNewPassword }
  ) {
    try {
      const data = {
        password,
        new_password: newPassword,
        confirm_new_password: confirmNewPassword,
      }

      const token = state.token

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await this.$api.put('/users/password', data, config)

      if (response.status === 200) {
        return {
          ok: true,
        }
      }
    } catch (error) {
      if (error.response) {
        return {
          ok: false,
          error: error.response.data.message,
        }
      }

      return {
        ok: false,
        error: error.message,
      }
    }
  },
}
