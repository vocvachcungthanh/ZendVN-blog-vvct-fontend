export default {
  setCategories(state, categories) {
    const hashCategories = {}

    categories.forEach((item) => {
      const categoryId = item.id

      hashCategories[categoryId] = item
    })

    state.categoriesList = hashCategories
  },
}
