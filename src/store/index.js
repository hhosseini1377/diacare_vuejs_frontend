import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import '../plugins/moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    onLoad: false,
    user: false,
    apiBase: 'http://212.23.201.189/',
    snackbar : {
      time: 2000,
      show: false,
      color: 'green',
      message: '',
    },
  },
  mutations: {
    setSnackbar(state, payload){
      state.snackbar = payload;
    },
    setUser(state, payload){
      state.user = payload;
    }
  },
  getters: {
    api: (state) => (req) => {
      if(req.loader !== false){
        state.onLoad = true
      }

      let res = axios({
        method: req.method,
        url: state.apiBase + req.url,
        data: req.data?req.data:null,
        headers: (state.user.access_token)?{'Authorization': `Bearer ${state.user.access_token}`}:{}
      });

      res.then(() => {
        state.onLoad = false;
      }).catch(e => {
        if(e.response.status==401){
          this.$store.commit('setSnackbar', {
            show: this.$moment().unix(),
            time: 2000,
            message: 'توکن نامعتبر یا منقضی شده است',
            color: 'error'
          })
        }
        state.onLoad = false;
      })

      return res;
    },
  },
  actions: {},
  modules: {}
})
