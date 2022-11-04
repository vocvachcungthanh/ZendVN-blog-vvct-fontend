export default {
  async actFetchCommentsList(
    { commit },
    {
      curPage = 1,
      pageSize = 2,
      parent = 0,
      post,
      exclude = [],
      ...restParams
    } = {}
  ) {
    try {
      const response = await this.$api.get('/comments', {
        params: {
          page: curPage,
          per_page: pageSize,
          parent,
          post,
          order: 'asc',
          exclude,
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
          comments: response.data,
        }

        if (response.data.length > 0 && parent === 0) {
          commit('setCommentsList', data)
        } else {
          const dataClone = { ...data, parent }

          commit('setCommentReplyList', dataClone)
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('[actFetchCommentsList]', error?.response?.data?.message)
    }
  },

  async actFetchPostNewComment(
    { commit, rootState },
    { post, content, parent = 0 }
  ) {
    if (!rootState.author.currentUser) return

    try {
      const token = rootState.author.token
      const author = rootState.author.currentUser.id
      const data = {
        post,
        author,
        content,
        parent,
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await this.$api.post('/comments', data, config)

      if (response.status === 201) {
        commit('posts/increaseCommentCount', null, { root: true })
        if (parent === 0) {
          commit('pushParentComment', response.data)
        } else {
          commit('increaseCommentReplyCount', parent)
          commit('pushReplyComments', {
            parentId: parent,
            newComment: response.data,
          })
        }

        return {
          ok: true,
          comment: response.data,
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[error]', error)
      return {
        ok: false,
        error: error.message,
      }
    }
  },
}
