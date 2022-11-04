import cookie from 'cookie'
import { configUrl as configLink } from '@/constants'

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

export const getTokenFromCookie = (request) => {
  try {
    const cookieString = request.headers.cookie
    const cookieObj = cookie.parse(cookieString)

    return cookieObj.access_token
  } catch (error) {
    return null
  }
}

export const getUrlHome = () => configLink.home

export const getUrlPostDetail = (url) => {
  if (url) {
    return `${configLink.postDetail}/${url}`
  }

  return configLink.postDetail
}

export const getUrlCategories = (url) => {
  if (url) {
    return `${configLink.categories}/${url}`
  }

  return configLink.categories
}

export const getUrlSearch = (url) => {
  if (url) {
    return `${configLink.search}/${url}`
  }

  return configLink.search
}

export const getUrlUser = (url) => {
  if (url) {
    return `${configLink.user}/${url}`
  }

  return configLink.user
}

export const getUrlLogin = (url) => {
  if (url) {
    return `${configLink.login}/${url}`
  }

  return configLink.login
}

export const getUrlRegister = (url) => {
  if (url) {
    return `${configLink.register}/${url}`
  }

  return configLink.register
}

export const getUrlTags = (url) => {
  if (url) {
    return `${configLink.tag}/${url}`
  }

  return configLink.tag
}
