export default function ({ $axios, env }, inject) {
  const api = $axios.create({
    headers: {},
  })

  const wpApi = $axios.create()

  api.setBaseURL(env.baseUrl + '/wp/v2')
  wpApi.setBaseURL(env.baseUrl)

  inject('api', api)
  inject('wpApi', wpApi)
}
