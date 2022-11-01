export default {
  async actFetchListTags({ commit }, params) {
    try {
      const response = await this.$api.get('/tags', {
        params,
      })

      if (response.status === 200 && response.data.length > 0) {
        return {
          ok: true,
          data: response.data,
        }
      }
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      }
    }
  },
}
