function mapPostCategories(hashCategories) {
  return (post) => {
    const listCategoriesId = post.categories
    const listCategories = listCategoriesId.map((id) => {
      return hashCategories[id]
    })

    return {
      ...post,
      categories: listCategories,
    }
  }
}

export default {
  getPopularList(postState, _, rootState) {
    const hashCategories = rootState.categories.categoriesList
    const popularList = postState.popularList

    return popularList.map(mapPostCategories(hashCategories))
  },

  getArticleList(postState, _, rootState) {
    const categories = rootState.categories.categoriesList
    const articlesList = postState.articlesPaging.articles

    return articlesList?.map(mapPostCategories(categories))
  },

  getArticleSearch(postState, _, rootState) {
    const hashCategories = rootState.categories.categoriesList
    const articlesList = postState.articlesSearch.articles

    return articlesList.map(mapPostCategories(hashCategories))
  },
}
