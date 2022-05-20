<template>
  <div id="app">
    <router-view v-if="showrouterview"/>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'App',
  data(){
    return{
      showrouterview:true
    }
  },
  watch:{
    $route(val){
      if(!getToken()){
        if(val.meta.power!=false){
          alert('请先登录')
          this.$router.push('/login')
        }
      }
    }
  },
  provide(){
    return{
      reload:this.reload,
    }
  },
  created(){
  },
  mounted(){
  },
  methods:{
    reload(){
      this.showrouterview = false
          this.$nextTick(()=>{
            this.showrouterview = true
        })
    }
  }
}
</script>