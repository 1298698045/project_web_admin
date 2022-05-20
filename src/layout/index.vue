<template>
    <div v-show="showrouterview">
        <div class="header">
            <Topbar @projectnamechange="projectnamechange" />
        </div>
        <div v-if="!showleftNavbar" class="body-container">
            <div>
                <router-view />
            </div>
        </div>
        <div v-else class="body">
            <div  class="left-nav" :class="{'active':showleft}">
                <transition name="leftnav">
                    <div v-show='showleft'>
                        <Navbar :projectname="projectname" />
                    </div>
                </transition>
                <div @click='toggleleftnav()' class="show-leftbtn" :class="{'active':showleft}">
                    <i class="el-icon-arrow-right" v-show='!showleft' ></i>
                    <i class="el-icon-arrow-left" v-show='showleft'></i>
                </div>
            </div>
            <div class="main-container">
                <router-view />
                <!-- <Listcontainer v-else/> -->
            </div>          
        </div>
        <div class="popup-container" v-if="showpopup">
            <div class="createdprojectbox">
                <Createdproject />
            </div>
        </div>
    </div>
</template>
<script>
import { Topbar,Navbar } from './components'
import { Maincontainer,Listcontainer } from './components/container'
import Breadcrumb from './components/Breadcrumb'
import Createdproject from '@/alert/createdproject.vue'

export default {
  name: 'Layout',
  components:{
      Topbar,
      Navbar,
      Maincontainer,
      Listcontainer,
      Breadcrumb,
      Createdproject
  },
  data () {
    return {
        showrouterview:true,
        showleft:true,
        showpopup:false,
        projectname:'',
    }
  },
  computed:{
      showleftNavbar(){
          return this.$route.meta.showleftNavbar
      }
  },
  methods:{
      toggleleftnav(){
          this.showleft = !this.showleft
      },
      projectnamechange(val){
          this.projectname = val
      }
  }
}
</script>
<style scoped>
    .head{
        margin-top: 30px;
        padding: 0 40px;
    }
    .header{
        position: fixed;
        top: 0;
        width: 100%;
        background-color: #fff;
        z-index: 10;
    }
    .body{
        display: flex;
        height: calc(100vh - 56px);
        margin-top: 56px;
    }
    .leftnav-enter-active, .leftnav-leave-active {
        transition: all .3s;
    }
    .left-nav{
        transition: all .3s;
        overflow: hidden;
        box-sizing: border-box;
        width: 20px;
        border-right: 1px solid #dedede;
    }
    .left-nav.active{
        width: 240px;
    }
    .main-container{
        flex: 1;
        overflow: hidden;
    }
    .body-container{
        overflow-x: hidden;
        margin-top: 56px;
    }
    .show-leftbtn{
        width: 24px;
        height: 24px;
        line-height: 24px;
        font-weight: 700;
        border-radius: 50%;
        border: 1px  solid #dedede;
        position: absolute;
        left: 7px;
        top: 100px;
        z-index: 2;
        background-color: white;
        text-align: center;
        cursor: pointer;
        transition: all .3s;
    }
    .show-leftbtn.active{
        left: 227px;
    }
    .show-leftbtn:hover{
        background-color: #2684FF;
        color: white;
    }
    .popup-container{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
    }
    .createdprojectbox{
        width: 100%;
        height: 100%;
    }
    
</style>