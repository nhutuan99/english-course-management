import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    modules: {},
    state: {
      decks: [],
      cards: [],
      token: null,
      adminRule: false,
      userInfo: null
    },
    mutations: {
      addDeck(state, newDeck) {
        state.decks.push(newDeck)
      },
      addCard(state, newCard) {
        state.cards.push(newCard)
      },
      editDeck(state, editDeck) {
        const deckIndex = state.decks.findIndex(
          (deck) => deck.id === editDeck.id
        )
        state.decks[deckIndex] = editDeck
      },
      deleteDeck(state, deleteDeck) {
        const trash = state.decks.filter((deck) => deck.id === deleteDeck.id)
        state.decks.splice(trash, 1)
      },
      setDecks(state, decks) {
        state.decks = decks
      },
      setCards(state, cards) {
        state.cards = cards
      },
      setToken(state, token) {
        state.token = token
      },
      setAdmin(state, admin) {
        state.adminRule = admin
      },
      setUserInfo(state, info) {
        state.userInfo = info
      },
      clearToken(state) {
        state.token = null
      }
    },
    actions: {
      async nuxtServerInit({ commit }, context) {
        return await axios
          .get(process.env.baseApi + '/decks.json')
          .then((resp) => {
            const deckArr = []
            for (const i in resp.data) {
              deckArr.push({ ...resp.data[i], id: i })
            }
            commit('setDecks', deckArr)
          })
          .then(async () => {
            await axios
              .get(process.env.baseApi + '/cards.json')
              .then((resp) => {
                const cardArr = []
                for (const i in resp.data) {
                  cardArr.push({ ...resp.data[i], id: i })
                }
                commit('setCards', cardArr)
              })
          })
          .catch((e) => context.error(e))
      },
      setDecks({ commit }, decks) {
        commit('setDecks', decks)
      },
      setCards({ commit }, cards) {
        commit('setCards', cards)
      },
      setAdmin({ commit }, admin) {
        commit('setAdmin', admin)
      },
      addDeck({ commit }, deckData) {
        return axios
          .post(
            process.env.baseApi + '/decks.json?auth=' + this.state.token,
            deckData
          )
          .then((resp) => commit('addDeck', { ...deckData, id: resp.name }))
          .catch((e) => e)
      },
      addCard({ commit }, cardData) {
        return axios
          .post(
            process.env.baseApi + '/cards.json?auth=' + this.state.token,
            cardData
          )
          .then((resp) => commit('addCard', { ...cardData, id: resp.name }))
          .catch((e) => e)
      },
      editDeck({ commit }, deckData) {
        return axios
          .put(
            process.env.baseApi +
              '/decks/' +
              deckData.id +
              '.json?auth=' +
              this.state.token,
            deckData
          )
          .then((res) => {
            commit('editDeck', { ...res.data, id: deckData.id })
            return {
              ...res.data,
              id: deckData.id
            }
          })
          .catch((e) => e)
      },
      deleteDeck({ commit }, id) {
        return axios
          .delete(process.env.baseApi + '/decks/' + id + '.json')
          .then(() => commit('deleteDeck', id))
          .catch((e) => e)
      },
      authenticate({ commit, dispatch }, credentials) {
        return new Promise((resolve, reject) => {
          let urlAuth = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`

          if (!credentials.isLogin) {
            urlAuth = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.API_KEY}`
          }
          this.$axios
            .$post(urlAuth, {
              displayName: credentials.fullname,
              email: credentials.email,
              password: credentials.password,
              returnSecureToken: true
            })
            .then((res) => {
              if (res && res !== undefined) {
                if (res.localId === 'a6dG1h4sGkddYk75xFJ3D6hsuCa2') {
                  // Admin Rule
                  dispatch('setAdmin', true)
                }
                // set token
                commit('setToken', res.idToken)

                localStorage.setItem('token', res.idToken)
                localStorage.setItem(
                  'tokenDuration',
                  new Date().getTime() + res.expiresIn * 1000
                )
                Cookies.set('token', res.idToken)
                Cookies.set(
                  'tokenDuration',
                  new Date().getTime() + res.expiresIn * 1000
                )
                dispatch('setTimerToken', res.expiresIn * 1000)
                // get user info
                commit('setUserInfo', res)
                resolve({ success: true })
              }
            })
            .catch((err) => {
              reject(err.response)
            })
        })
      },
      setTimerToken({ commit }, duration) {
        setTimeout(() => {
          commit('clearToken')
        }, duration)
      },
      initToken({ commit, dispatch }, req) {
        let token, tokenDuration

        if (req) {
          if (!req.headers.cookie) return false

          const tokenKey = req.headers.cookie
            .split(';')
            .find((c) => c.trim().startsWith('token='))

          console.log('tokenKey:', tokenKey)
          const tokenExpirationKey = req.headers.cookie
            .split(';')
            .find((c) => c.trim().startsWith('tokenExpiration='))
          console.log('tokenExpirationKey:', tokenExpirationKey)

          if (!tokenKey || !tokenExpirationKey) {
            return false
          }

          token = tokenKey.split('=')[1]
          tokenDuration = tokenExpirationKey.split('=')[1]
        } else {
          token = localStorage.getItem('token')
          tokenDuration = localStorage.getItem('tokenDuration')
          if (new Date().getTime() > tokenDuration || !token) {
            dispatch('setTimerToken', tokenDuration - new Date().getTime())
            return false
          }
          commit('setToken', token)
        }
      },
      logout({ commit, dispatch }) {
        commit('clearToken')
        dispatch('setAdmin', false)
        Cookies.remove('token')
        Cookies.remove('tokenDuration')
        localStorage.removeItem('token')
        localStorage.removeItem('tokenDuration')
      }
    },
    getters: {
      decks(state) {
        return state.decks
      },
      cards(state) {
        return state.cards
      },
      isAuthenticated(state) {
        return state.token !== null
      },
      isAdmin(state) {
        return state.adminRule === true
      },
      userInfo(state) {
        return state.userInfo
      }
    }
  })
}

export default createStore
