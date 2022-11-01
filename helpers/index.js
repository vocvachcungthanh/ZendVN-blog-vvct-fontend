export const cutText = (text, start, end) => {
  let result = text

  if (result?.length > end) {
    result = `${text.slice(start, end - 4)} ...`
  }

  return result
}

export const recursiveMenu = (menus) => {
  const result = []

  menus.forEach((menu) => {
    result.push({
      ID: menu.ID,
      title: menu.title,
      url: menu.url,
      children: recursiveMenu(menu.child_items || []),
    })
  })

  return result
}

export const formatDay = (created) => {
  return {
    format: created.format('DD/MM/YYYY'),
    relative: created.fromNow(),
  }
}
