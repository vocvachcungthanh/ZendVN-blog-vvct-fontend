export default {
  isLogin(authorState) {
    if (authorState.currentUser) {
      return true
    }

    return false
  },

  avatarAuthor(authorState) {
    if (!authorState.currentUser) {
      return ''
    }

    if (authorState.currentUser.simple_local_avatar) {
      return authorState.currentUser.simple_local_avatar.full
    }

    const num = (authorState.currentUser.id % 4) + 1
    return `/assets/images/avatar${num}.jpg`
  },
}
