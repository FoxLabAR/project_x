// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import { firestoreAction } from 'vuexfire'
const db = require('../db.js')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    Grupos: [],
    Eventos:[],
    Usuarios:[],
  },
  mutations: {
    setCurrentUser (state, val) {
      state.currentUser = val
    },
    setUserProfile (state, val) {
      state.userProfile = val
    }
  },

  actions: {
    bindGrupos: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('Grupo', db.collection('Grupo'))
    }),
    bindEventos: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('Eventos', db.collection('Eventos'))
    }),
    bindUsuarios: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('Usuarios', db.collection('Usuarios'))
    }),
    fetchUserProfile ({ commit, state }) {
      db.usuariosDB.doc(state.currentUser.uid).get().then(res => {
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
    }
  },
})