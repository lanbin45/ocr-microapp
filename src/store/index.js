import Vue from 'vue'
import Vuex from 'vuex'
// import api from './utils/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    userInfo: {
      avararUrl: '',
      city: '',
      country: '',
      gender: 1,
      language: '',
      nickName: '',
      province: ''
    },
    formImageFile: {
      tempFilePaths: '',
      tempFiles: {
        path: '',
        size: 0
      },
      width: 0,
      height: 0
    },
    cardImageFile: [],
    deviceInfo: {},
    requestId: '',
    email: '',
    excelData: []
  },
  mutations: {
    testCount (state) {
      state.count++
    },
    setUserInfo (state, data) {
      state.userInfo = Object.assign({}, data)
    },
    setFormImage (state, data) {
      if (data.tempFilePaths) {
        state.formImageFile.tempFilePaths = data.tempFilePaths
      }
      if (data.tempFiles || data.tempFiles.path) {
        state.formImageFile.tempFiles.path = data.tempFiles.path
        state.formImageFile.tempFiles.size = data.tempFiles.size
      }
      if (data.width || data.height) {
        state.formImageFile.height = data.height
        state.formImageFile.width = data.width
      }
    },
    setDeviceInfo (state, data) {
      state.deviceInfo = Object.assign({}, data)
    },
    setRequestId (state, data) {
      state.requestId = data
    },
    setEmail (state, data) {
      state.email = data
    },
    setCardImage (state, data) {
      state.cardImageFile = []
      state.cardImageFile = [...data]
    },
    setExcelData (state, data) {
      state.excelData = []
      state.excelData = [...data]
    }
  },
  actions: {
    getCount ({ commit }) {
      commit('testCount', 1)
    },
    saveUser ({commit}, userInfo) {
      commit('setUserInfo', userInfo)
    },
    saveFormImage ({commit}, formImage) {
      commit('setFormImage', formImage)
    },
    saveDeviceInfo ({ commit }, deviceInfo) {
      commit('setDeviceInfo', deviceInfo)
    },
    saveRequestId ({commit}, requestId) {
      commit('setRequestId', requestId)
    },
    saveEmail ({commit}, email) {
      commit('setEmail', email)
    },
    saveCardImage ({commit}, image) {
      commit('setCardImage', image)
    },
    saveExcelData ({commit}, exceldata) {
      commit('setExcelData', exceldata)
    }
  }
})

export default store
