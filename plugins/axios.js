export default function ({ $axios, $sentry }) {
  $axios.onResponse((response) => {
    return Promise.resolve(response.data)
  })

  $axios.onError((error) => {
    if (!error) return
    const { response } = error

    if (
      response &&
      response.status &&
      [401, 403, 410, 400, 404].includes(response.status)
    ) {
      $sentry.captureException(error)
    }

    return Promise.reject(error)
  })
}
