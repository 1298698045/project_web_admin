<template>
<div class="head-container">
    <div class="head-breadcrumb" v-if="!hiddenbread">
        <div class="breadcrumb">
            <el-breadcrumb >
                <el-breadcrumb-item>
                    <router-link tag="a" to="/projects/list">项目</router-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <!-- <div>
                        {{name}}
                    </div> -->
                    <router-link tag="a" 
                    :to='"/projects/board/"+this.$route.params.projectname+"?id="+this.$route.query.id'
                    >{{name}}</router-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-if="childrenname">
                    <router-link tag="a" :to="childrenurl">{{childrenname}}</router-link>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
    <div class="head-title">
        <div class="head-name">{{title}}</div>
        <div class="head-operate">
            <slot name="rightbtn">
                <div class="head-operate-item hover-iconbtn">
                <el-tooltip content="收藏" effect="dark"  placement="bottom">
                    <i class="el-icon-star-off"></i>
                </el-tooltip>
            </div>
            </slot>
            <div class="head-operate-item iconbtn" v-if="!hiddendropdown">
                <el-dropdown trigger="click" @command="commandclick">
                    <el-tooltip content="更多" effect="dark"  placement="bottom">
                        <div class="el-icon-more"></div>
                    </el-tooltip>
                    <slot name="dropdown"></slot>
                </el-dropdown>
            </div>
        </div>
    </div>
</div>
    

</template>
<script>
import commonapi from '@/api/commonapi.js'

export default {
    data(){
        return {

        }
    },
    props:['name','title','childrenname','childrenurl','hiddenbread','hiddendropdown'],
    methods:{
        commandclick(common){
            this.$emit('commandclick',common)
        }
    },
    created(){
    }
}
</script>
<style scoped>
.head-operate{
    display: flex;
    align-items: center;
}
.head-container{
    padding: 30px 40px 0 40px;
}
.head-title{
    color: rgb(66, 82, 110);
    display: flex;
    justify-content: space-between;
    padding: 9px 0;
    height: 50px;
    box-sizing: border-box;
}
.head-title .head-name{
    font-size: 22px;
}
/* .head-name{
    padding:0 2px;
} */
/* .head-name:hover{
    background-color: rgb(231, 232, 236);
} */
.el-dropdown{
    display: block;
}
</style>