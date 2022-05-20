<template>
  <div class="container">
      <div class="title">
          Your work
      </div>
      <Recentprojects :data="Recentprojects" />
      <Myworklist />
  </div>
</template>
<script>
import { HomeBoardProjectRecent } from '@/api/projectapi.js'
import Userhead from '@/components/Userheadphoto.vue'
import Recentprojects from '@/components/recentprojects.vue'
import Myworklist from '@/components/myworklist.vue'
export default {
  data() {
    return {
      activeName:'first',
      Recentprojects:[]
    };
  },
  components:{
    Userhead,Recentprojects,Myworklist
  },
  created(){
    this.$store.state.showleftNavbar = false
    this.getdata().then((res)=>{
      this.Recentprojects = res
    })
  },
  methods:{
    getdata(){
      return HomeBoardProjectRecent()
    }
  }
};
</script>
<style scoped>
    .title{
        padding: 30px 45px;
        font-size: 22px;
        color: #172B4D;        
    }
</style>