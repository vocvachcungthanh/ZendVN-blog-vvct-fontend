import { getTokenFromCookie, recursiveMenu } from '~/helpers'

export const state = () => {
  return {
    appMainMenus: {
      items: [],
    },
  }
}

export const mutations = {
  setAppMainMenus(state, data) {
    state.appMainMenus = data
  },
}

export const getters = {
  mainMenuItems(state) {
    const appMainMenusClone = { ...state.appMainMenus }

    return recursiveMenu(appMainMenusClone.items || [])
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    const token = getTokenFromCookie(req)

    // eslint-disable-next-line no-console
    console.log('[token]', token)

    await Promise.all([
      await dispatch('actFetchAppMainMenus'),
      await dispatch('categories/actFetchCategories'),
      await dispatch('author/actFetchCurrentUser', token),
    ])
  },

  async actFetchAppMainMenus({ commit }) {
    try {
      const response = await this.$wpApi.get('/menus/v1/menus/main-menu')

      if (response.status === 200) {
        commit('setAppMainMenus', response.data)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('[actFetchAppMainMenus]', error.response.data.message)
    }
  },
}
