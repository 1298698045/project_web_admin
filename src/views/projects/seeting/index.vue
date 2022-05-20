<template>
    <div class="seetingbox">
        
        <router-view />
    </div>
</template>

<script>
import boardhead from '@/components/head/boardhead.vue';
export default {
    data(){
        return {
            name:'123',
        }
    },
    computed:{
        title(){
            return this.$route.meta.title
        }
    },
    components:{
        boardhead
    },
    created(){
        //面板数据
        //分组
        this.getdata()
    },
    methods:{
        getdata(){
        }
    }
};
</script>
<style scoped>
    .leftshelterbox,.rightshelterbox{
        position: sticky;
        width: 40px;
        background-color: #fff;
        z-index: 3;
    }
    .leftshelterbox{
        left: 0;
    }
    .rightshelterbox{
        right: 0;
    }
    .container{
        overflow: auto;
        height: calc(100vh - 230px);
        /* width: calc(100vw - 241px); */
        margin-top: 20px;
        box-sizing: border-box;
        position: relative;
    }
    .container-flexbox{
        width: fit-content;
        display: flex;
        padding-bottom: 50px;
    }
    .main-container-body{
        flex: 1;
    }
    .head{
        margin-top: 0px;
        padding: 0 40px;
    }
    .seetingbox{
        overflow: auto;
        height: 100%;
    }
</style>