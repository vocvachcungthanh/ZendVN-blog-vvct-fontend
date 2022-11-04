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

  pushParentComment(state, newComment) {
    const postNew = newComment.post
    const isCheckPost = state.commentsPaging.comments.filter(
      (item) => item.post === postNew
    )

    if (isCheckPost.length > 0) {
      state.commentsPaging = {
        ...state.commentsPaging,
        comments: [newComment, ...state.commentsPaging.comments],
      }
    } else {
      state.commentsPaging = {
        ...state.commentsPaging,
        comments: [newComment],
      }
    }
  },

  increaseCommentReplyCount(state, parentId) {
    let isFound = false
    const newComments = state.commentsPaging.comments.map((cmt) => {
      if (cmt.id === parentId) {
        isFound = true

        return {
          ...cmt,
          commentReplyCount: cmt.commentReplyCount + 1,
        }
      } else {
        return cmt
      }
    })

    if (isFound) {
      state.commentsPaging = {
        ...state.commentsPaging,
        comments: newComments,
      }
    }
  },

  pushReplyComments(state, { newComment, parentId }) {
    const key = `reply-parent-${parentId}`

    if (state.hasCommentReplyPaging[key]) {
      //
    } else {
      state.hasCommentReplyPaging = {
        ...state.hasCommentReplyPaging,
        [key]: {
          commentsReply: [newComment],
          curPage: 1,
          wpTotal: 1,
          wpTotalPages: 1,
        },
      }
    }
  },
}
