export const actions = {
  getGames (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_games', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getClientIP (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('https://ipinfo.io/?token=9a50bf62c4b1b0', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  },
  getGameURL (ctx, { $axios, params }) {
    return new Promise((resolve, reject) => {
      $axios.post('front/get_game_url', params)
        .then((res) => {
          resolve(res.data)
        })
        .catch(reject)
    })
  }
}
