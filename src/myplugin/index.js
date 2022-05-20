import icon from '@/icon/icon.vue'
const install = function (Vue, options) {
    Vue.component('icon', icon);

    // Vue.mixin({
    //   components:{
    //     icon
    //   }
    // })
    // Vue.prototype.$myMethod = function (methodOptions) {
    // }
    
  }
  export default install