<template>
    <div class="seetingbox">
        <router-view />
    </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    computed:{
        title(){
            return this.$route.meta.title
        }
    },
    components:{
    },
    created(){
        this.getdata()
    },
    methods:{
        getdata(){
        }
    }
};
</script>
<style scoped>
    .seetingbox{
        overflow: auto;
        height: 100%;
    }
</style>