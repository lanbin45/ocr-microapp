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
    }
  },
  mutations: {
    testCount (state) {
      state.count++
    },
    saveUserInfo (state, data) {
      state.userInfo = Object.assign({}, data)
    },
    saveFormImage (state, data) {
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
    }
  },
  actions: {
    getCount ({ commit }) {
      commit('testCount', 1)
    },
    saveUser ({commit}, userInfo) {
      commit('saveUserInfo', userInfo)
    },
    saveFormImage ({commit}, formImage) {
      commit('saveFormImage', formImage)
    }
  }
})

export default store
