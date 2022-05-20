import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    projecttype:'',
    showleftNavbar: true,
    firstprojectfilterid:'',
    getters:{
      token:''
    },
    boardpermissions:[]
  },
  mutations: {
    // hideleftNavbar(state){
    //     state.showleftNavbar = false
    // }
  }
})
export default store
