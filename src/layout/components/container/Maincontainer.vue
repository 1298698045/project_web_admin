<template>
    <div class="main-container">
        <!-- <div class="head">
            <div class="breadcrumb">
                <Breadcrumb />
            </div>
        </div> -->
        <router-view />
    </div>
    
</template>
<script>
import Breadcrumb from '../../components/Breadcrumb'
export default {
  name: 'Maincontainer',
  components:{
      Breadcrumb
  },
}
</script>
<style scoped>
    .main-container{
        position: relative;
        border-left: 1px solid #dedede;
    }
    
</style>