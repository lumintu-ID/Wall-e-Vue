import axios from 'axios'

export default {
  state: {
    userData: {},
    userList: {},
    userSort: 'user_first_name',
    userPage: 1,
    userLimit: 5,
    userTotal: 0,
    pin: '',
    searchName: ''
  },
  mutations: {
    setUserData(state, payload) {
      state.userData = payload
    },
    setUserList(state, payload) {
      state.userList = payload
    },
    setUserPage(state, payload) {
      state.userPage = payload
    },
    setUserSort(state, payload) {
      state.userSort = payload
    },
    setUserTotal(state, payload) {
      state.userTotal = payload
    },
    setPin(state, payload) {
      state.pin = payload
    },
    setSearchName(state, payload) {
      state.searchName = payload
    }
  },
  actions: {
    check(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_URL}/users/pin`,
            payload.user_pin
          )
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    patchPin(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/users/patch/pin`,
            payload
          )
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    patchProfile(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/users/patch/image`,
            payload.formData
          )
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    deleteImage(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/users/delete/image`
          )
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    patchDataUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/users/patch/profile`,
            payload.form
          )
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    patchPassword(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}/users/patch/password`,
            payload.form
          )
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    getUserById(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}/users/${payload}`)
          .then(response => {
            context.commit('setUserData', response.data.data[0])
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    getAllUsers(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_URL}/users/user/name?search=${context.state.searchName}&page=${context.state.userPage}&limit=${context.state.userLimit}`
          )
          .then(response => {
            context.commit('setUserList', response.data.data)
            context.commit('setUserTotal', response.data.pagination.totalData)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getUserData(state) {
      return state.userData
    },
    getUserList(state) {
      return state.userList
    },
    getUserPage(state) {
      return state.userPage
    },
    getUserSort(state) {
      return state.userSort
    },
    getUserLimit(state) {
      return state.userLimit
    },
    getTotalData(state) {
      return state.userTotal
    }
  }
}
