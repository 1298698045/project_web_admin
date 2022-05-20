<template>
<div>
    <div class="adduser" @click="addpeopledialog = true">
        <img src="/static/img/svg/addpeople.svg" alt="">
    </div>
    <el-dialog :append-to-body="true" :show-close="false" :visible.sync="addpeopledialog" width="400px" top="10vh">
        <addpeople></addpeople>
    </el-dialog>
</div>
    
</template>
<script>
import addpeople from '@/alert/addpeople.vue'

export default {
    data(){
        return {
            addpeopledialog:false
        }
    },
    components:{
        addpeople
    }
    
}
</script>
<style scoped>
.adduser{
    width: 32px !important;
    height: 32px !important;
    line-height: 32px;
    color: rgb(122, 134, 154);
    background-color: rgb(223, 225, 230);
    border-radius: 50%;
    display: flex;
    align-items: center;   
    justify-content: center;
    cursor: pointer;
}
</style>