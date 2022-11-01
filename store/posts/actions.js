export default {
  async actFetchLatestPost({ commit }) {
    try {
      const response = await this.$api.get('/posts', {
        params: {
          page: 1,
          per_page: 3,
        },
      })

      if (response.status === 200) {
        commit('setLatestList', response.data)
      }

      return {
        status: true,
      }
    } catch (error) {
      return {
        status: false,
        error: error.response.data.message,
      }
    }
  },

  async actFetchPopularPost({ commit }) {
    try {
      const response = await this.$api.get('/posts', {
        params: {
          page: 1,
          per_page: 3,
          orderby: 'post_views',
        },
      })

      if (response.status === 200) {
        commit('setPopularList', response.data)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      // console.log('[actFetchPopularPost]', error.response.data.message)
    }
  },

  async actFetchArticlesList(
    { commit },
    { curPage = 1, pageSize = 2, ...restParams } = {}
  ) {
    try {
      const response = await this.$api.get('/posts', {
        params: {
          page: curPage,
          per_page: pageSize,
          ...restParams,
        },
      })

      if (response.status === 200) {
        const headers = response.headers
        const wpTotal = parseInt(headers['x-wp-total'])
        const wpTotalPages = parseInt(headers['x-wp-totalpages'])

        const data = {
          curPage,
          wpTotal,
          wpTotalPages,
          articles: response.data,
        }

        const restParamsClone = { ...restParams }

        const restParamsCloneKeys = Object.keys(restParamsClone)

        if (restParamsCloneKeys.length > 0) {
          restParamsCloneKeys.forEach((item) => {
            if (item === 'search' || item === 'categories') {
              commit('setSearchPost', data)
            }
          })
        } else {
          commit('setArticlesList', data)
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('[actFetchArticlesList]', error?.response?.data?.message)
    }
  },

  async actFetchArticlesBySlug({ commit }, { slug }) {
    try {
      const response = await this.$api.get('/posts', {
        slug,
      })

      if (response.status === 200 && response.data.length > 0) {
        let post = null

        response.data.forEach((item) => {
          if (item.slug === slug) {
            post = item
          }
        })

        if (post) {
          commit('setPostDetail', post)

          return {
            ok: true,
            data: post,
          }
        }
      }

      return {
        ok: false,
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('[actFetchArticlesBySlug]', error?.response?.data?.message)
      return {
        ok: false,
      }
    }
  },

  async actFetchRelatedPost({ commit }, { author }) {
    try {
      const response = await this.$api.get('/posts', {
        params: {
          page: 1,
          per_page: 5,
          author,
        },
      })

      if (response.status === 200) {
        commit('setRelatedPost', response.data)
      }
    } catch (error) {
      return {
        error: error.response.data.message,
      }
    }
  },
}
