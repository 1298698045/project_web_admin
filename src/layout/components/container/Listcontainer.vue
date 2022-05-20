<template>
    <div class="main-container">
        <div class="head">
            <div class="head-name">摘要</div>
        </div>
        <div class="container">
            <div class="container-flexbox">
                <div class="leftshelterbox"></div>
                <div class="main-container-body">
                    <router-view  />
                </div>
                <div class="rightshelterbox"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Listcontainer',
}
</script>
<style scoped>
    .head-name{
        font-size: 22px;
        color: #172b4d;
        padding: 10px 5px;
    }
    .main-container{
        border-left: 0;
        padding:25px 35px 35px 35px;
    }
</style>