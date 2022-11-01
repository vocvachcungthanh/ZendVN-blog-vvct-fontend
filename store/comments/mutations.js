export default {
  setCommentsList(state, data) {
    const commentsValue = data.comments
    const commentsState = state.commentsPaging.comments

    if (data.curPage > 1) {
      data.comments = [...commentsState, ...commentsValue]
    }

    state.commentsPaging = data
  },

  setCommentReplyList(
    state,
    { curPage, wpTotal, wpTotalPages, comments, parent }
  ) {
    const key = `reply-parent-${parent}`

    const data = {
      curPage,
      wpTotal,
      wpTotalPages,
      commentsReply: comments,
    }

    if (curPage > 1) {
      data.commentsReply = [
        ...state.hasCommentReplyPaging[key].commentsReply,
        ...data.commentsReply,
      ]
    }

    state.hasCommentReplyPaging = {
      ...state.hasCommentReplyPaging,
      [key]: data,
    }
  },
}
