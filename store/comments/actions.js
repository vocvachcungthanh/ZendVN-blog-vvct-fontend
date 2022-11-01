export default {
  async actFetchCommentsList(
    { commit },
    { curPage = 1, pageSize = 2, parent = 0, post, ...restParams } = {}
  ) {
    try {
      const response = await this.$api.get('/comments', {
        params: {
          page: curPage,
          per_page: pageSize,
          parent,
          post,
          order: 'asc',
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
}
