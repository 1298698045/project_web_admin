<template>
    <div class="recentprojects">
        <div class="head">
            <span>
            最近的项目
            </span>
            <el-link type="primary">查看所有项目</el-link>
        </div>
        <div class="body">
            <div class="card-list">
                <div class="card-item" v-for="item in data" :key="item.id">
                    <div class="item-left">
                        <img class="item-img" :src="item.avatarUrl" alt="">
                    </div>
                    <div class="item-right">
                        <div class="item-body">
                            <div class="item-title">
                                <div @click="goproject(item)" class="item-name" :title="item.name">{{item.name}}</div>
                            <div class="item-type">{{item.projectType}}</div>
                            </div>
                            <div class="item-link">
                                <div class="link-title">统计</div>
                                <div class="link-item">
                                    <span>我未处理的事务</span>
                                    <span class="link-number">{{item.processCount}}</span>
                                    </div>
                                <div class="link-item">
                                    <span>事务总数</span>
                                     <span class="link-number">{{item.totalCount}}</span>
                                    </div>
                            </div>
                        </div>
                        <div class="item-foot">
                            <el-dropdown :class="'link-item'" trigger="click" :style="{'font-size':'12px',cursor:'pointer',color:'rgb(23, 43, 77)'}">
                                <span class="el-dropdown-link">
                                    一个看板<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>看板</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['data'],
    methods:{
        goproject(item){
            this.$router.push('/projects/board/'+item.name+'?id='+item.id)
        }
    }
}
</script>
<style scoped>
    .recentprojects{
        background-color: rgb(250, 251, 252);
    }
    .body{
        overflow: auto;
        padding-bottom: 10px;
    }
    .head{
        font-size: 16px;
        padding: 15px 30px;
        color: #222;
        display: flex;
        justify-content: space-between;

    }
    .card-list{
        display: flex;
        flex-wrap: nowrap;
        padding: 0 30px;
        width: fit-content;
    }
    .card-item{
        width: 240px;
        height: 165px;
        border-radius: 4px;
        margin: 0 5px;
        border: 1px solid #dedede;
        flex: none;
        background-color: #fff;
    }
    .card-item{
        display: flex;
    }
    .item-left{
        width: 20px;
        background-color: rgb(179, 245, 255);
        position:relative;
        border-radius: 4px 0 0 4px;
    }
    .item-right{
        flex: 1;
        padding:15px 0;
    }
    .item-body{
        padding: 0 20px 5px 20px;
    }
    .item-img{
        
        width: 24px;
        height: 24px;
        border-radius: 4px;
        position: absolute;
        top: 20px;
        left: 10px;
    }
    .item-title{
        cursor: pointer;
    }
    .item-name{
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 180px;
    }
    .item-type{
        font-size: 13px;
    }
    .link-title{
        font-size: 12px;
        font-weight: 700;
        color: rgb(74, 84, 103);
        margin: 10px 0 5px 0;
    }
    .item-link{
        font-size: 12px;
    }
    .link-item:hover{
        background-color: rgb(230, 232, 235);
    }
    .link-item{
        cursor: pointer;
        padding: 3px;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
    }
    .item-foot{
        border-top: 1px solid #dedede;
        font-size: 12px;
        display: flex;
        align-items: center;
        height: 33px;
        padding: 0 20px;
    }
    .link-number{
        background-color: #d4d4d4;
        border-radius: 12px;
        width: 30px;
        text-align: center;
    }
</style>