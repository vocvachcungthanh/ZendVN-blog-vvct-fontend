export default {
  async actFetchCategories({ commit }) {
    try {
      const response = await this.$api.get('/categories', {
        params: {
          page: 1,
          per_page: 100,
        },
      })

      if (response.status === 200) {
        commit('setCategories', response.data)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('[actFetchCategories]', error.response.data.message)
    }
  },

  async actFetchCategoriesBySlug({ commit }, { slug = '' } = {}) {
    try {
      const response = await this.$api.get('/categories', {
        params: {
          slug,
        },
      })
      if (response.status === 200 && response.data.length > 0) {
        return {
          success: true,
          data: response.data,
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('[actFetchCategoriesSlug]', error.response.data.message)
    }
  },
}
