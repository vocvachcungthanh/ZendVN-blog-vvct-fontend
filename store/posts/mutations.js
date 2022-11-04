export default {
  setLatestList(state, data) {
    state.latestList = data
  },

  setPopularList(state, data) {
    state.popularList = data
  },

  setArticlesList(state, data) {
    const articlesValue = data.articles
    const articlesState = state.articlesPaging.articles

    state.articlesPaging = {
      ...data,
      articles: [...articlesState, ...articlesValue],
    }
  },

  setSearchPost(state, data) {
    state.articlesSearch = data
  },

  setPostDetail(state, post) {
    state.postDetail = post
  },

  setRelatedPost(state, post) {
    state.postRelatedPost = post
  },

  increaseCommentCount(postsState) {
    if (postsState.postDetail) {
      postsState.postDetail = {
        ...postsState.postDetail,
        commentCount: postsState.postDetail.commentCount + 1,
      }
    }
  },
}
