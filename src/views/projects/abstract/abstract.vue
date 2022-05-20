<template>
    <div class="abstract">
        <boardhead :name=name :title="'摘要'">
            <span slot></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>管理工作流</el-dropdown-item>
                <el-dropdown-item>配置看板</el-dropdown-item>
            </el-dropdown-menu>
        </boardhead>
        <div class="container">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="动态" name="first">
                        <div class="manipulate-list" >
                        <div class="manipulate-item" v-for="i in 10" :key="i">
                            <div class="manipulate-left">
                                <Userhead :width="'32px'" :height="'32px'" />
                            </div>
                            <div class="manipulate-right">
                                <div class="manipulate-head">
                                    <span class="name">jack liu</span>
                                    <span class="type">将</span>
                                    <span class="project">oa项目</span>
                                    <span class="movement">的</span>
                                    <span class="type">截止日期</span>
                                    <span class="movement">改变为</span>
                                    <span class="message">2021年10月11日</span>
                                </div>
                                <div class="manipulate-body">
                                    <span class="type">
                                        <img src="/static/img/svg/viewavatar.svg" alt="">
                                    </span>
                                    <div class="time">2021-10-18</div>
                                    <div class="comment" @click="commentindex=i">评论</div>
                                </div>
                                <div class="commentbox" v-if="commentindex==i">
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                    <div class="commentbox-footer">
                                        <el-button @click="commentindex=null" type="primary" size="mini">添加</el-button>
                                        <el-button @click="commentindex=null" size="mini">取消</el-button>
                                    </div>
                                    </div> 
                            </div>
                        </div>
                    </div>
                    <div class="projectinformation">
                        <div class="projectinformation-item">
                            <div class="projectinformation-label">项目负责人</div>
                            <div class="projectinformation-value">
                                <Userhead :width="'24px'" :height="'24px'" />
                                <span class="username">jack liu</span>
                            </div>
                        </div>
                        <div class="projectinformation-item">
                            <div class="projectinformation-label">上周最活跃</div>
                            <div class="projectinformation-value">
                                <Userhead :width="'24px'" :height="'24px'" />
                                <Userhead :width="'24px'" :height="'24px'" />
                            </div>
                        </div>
                        <div class="projectinformation-item">
                            <div class="projectinformation-label">秘钥</div>
                            <div class="projectinformation-value">
                                LUIF
                            </div>
                        </div>
                        <div class="projectinformation-item">
                            <div class="projectinformation-label">事务状态</div>
                            <div class="status-list">
                                <div class="statusitem">
                                    <span class="statusitem-name">待办</span>
                                    <span class="statusitem-number">7</span>
                                </div>
                                <div class="statusitem">
                                    <span class="statusitem-name">正在进行</span>
                                    <span class="statusitem-number">0</span>
                                </div>
                                <div class="statusitem">
                                    <span class="statusitem-name">完成</span>
                                    <span class="statusitem-number">0</span>
                                </div>
                                <div class="statusitem">
                                    <span class="statusitem-name">无类别</span>
                                    <span class="statusitem-number">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </el-tab-pane>
                    <el-tab-pane label="统计" name="second">
                        <div class="statistics">
                            <!-- <div class="work-filter">
                                <div class="work-filter-title">事务</div>
                                <div class="work-filter-list">
                                    <div>
                                        <div>所有事务</div>
                                        <div>未解决</div>
                                    </div>
                                    <div>
                                        <div>最近添加的</div>
                                        <div>近期已解决</div>
                                        <div>最近更新</div>
                                    </div>
                                    <div>
                                        <div>已指派给我</div>
                                        <div>我报告的</div>
                                    </div>
                                    <div>
                                        <div>未排程</div>
                                        <div>杰出的</div>
                                    </div>
                                </div>
                            </div> -->
                            <div class="statistics-main">
                                <div class="statistics-left">
                                    <div class="statistics-item">
                                        <div class="statisticsitem-title">按事务状态</div>
                                        <div class="statisticsitem-table">
                                            <div class="item-table-head">
                                                <div style="width:50%">状态</div>
                                                <div style="width:25%">事务</div>
                                                <div style="width:25%">百分比</div>
                                            </div>
                                            <div class="item-table-body">
                                                <div class="itemtablebody-list" v-for="item in Statistics.status" :key="item">
                                                <div class="itemtablebodylist-name" style="width:50%">{{item.Label}}</div>
                                                <div style="width:25%">{{item.Quantity}}</div>
                                                <div style="width:25%"><el-progress :percentage="item.Percent==null?'':item.Percent"></el-progress></div>
                                                </div>
                                            </div>
                                            <!-- <div class="item-table-footer">查看问题</div> -->
                                        </div>
                                    </div>
                                    <div class="statistics-item">
                                        <div class="statisticsitem-title">按优先级</div>
                                        <div class="statisticsitem-table">
                                            <div class="item-table-head">
                                                <div style="width:50%">优先级</div>
                                                <div style="width:25%">事务</div>
                                                <div style="width:25%">百分比</div>
                                            </div>
                                            <div class="item-table-body">
                                                <div class="itemtablebody-list" v-for="item in Statistics.priority" :key="item">
                                                <div class="itemtablebodylist-name" style="width:50%">{{item.Label}}</div>
                                                <div style="width:25%">{{item.Quantity}}</div>
                                                <div style="width:25%"><el-progress :percentage="item.Percent==null?'':item.Percent"></el-progress></div>                                               
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="statistics-right">
                                    <div class="statistics-item">
                                        <div class="statisticsitem-title">按负责人</div>
                                        <div class="statisticsitem-table">
                                            <div class="item-table-head">
                                                <div style="width:50%">负责人</div>
                                                <div style="width:25%">事务</div>
                                                <div style="width:25%">百分比</div>
                                            </div>
                                            <div class="item-table-body">
                                                <div class="itemtablebody-list" v-for="item in Statistics.assignee" :key="item">
                                                <div class="itemtablebodylist-name" style="width:50%">{{item.Label}}</div>
                                                <div style="width:25%">{{item.Quantity}}</div>
                                                <div style="width:25%"><el-progress :percentage="item.Percent==null?'':item.Percent"></el-progress></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div> 
                    </el-tab-pane>
                </el-tabs>
        </div>
    </div>
</template>

<script>
import boardhead from '@/components/head/boardhead.vue';
import Userhead from '@/components/Userheadphoto.vue'
import {projectsummarystatistics} from '@/api/projectapi.js'


export default {
    data(){
        return {
            commentindex:null,
            name:'oa',
            activeName:'first',
            Statistics:{}
        }
    },
    components:{
        boardhead,Userhead
    },
    created(){
        this.getdata()
    },
    methods:{
        getdata(){
            projectsummarystatistics(this.$route.query.id).then((res)=>{
                this.Statistics = res.data.Statistics
            })
        }
    }
};
</script>
<style scoped>
    .head-container>>>.head-operate-item{
        display: none;
    }
    .container{
        padding:0px 40px;
    }
    .manipulate-head{
    color: #333;
    font-size: 12px;

    }

.manipulate-body{
    margin: 10px 0;
}
.manipulate-item{
    display: flex;
    margin: 20px 0;
}
.manipulate-left{
    padding: 5px 10px 0 0;
}
.manipulate-head .name,.manipulate-head .project{
    color: #3b73af;
    cursor: pointer;
}
.manipulate-body{
    display: flex;
    color: #666;
    font-size: 12px;
}
.manipulate-body .time{
    margin-left: 10px;

}
.manipulate-body .comment{
    margin-left: 10px;
    color: #3b73af;
    cursor: pointer;
}
.manipulate-item{
    border-bottom: 1px solid #dedede;
}
.commentbox{
    padding-bottom: 10px;
}
.commentbox textarea{
    width: 100%;
    padding: 5px;
}
.abstract{
    height: calc(100vh - 55px);
    overflow: auto;
}
.manipulate-list{
    width: 60%;
}
#pane-first{
    display: flex;
    justify-content: space-between;
}
.projectinformation{
    width: 30%;
}
.projectinformation-label{
    color: #666;
}
.projectinformation-value{
    display: flex;
    margin: 10px 0 15px 0;
}
.projectinformation-value>>>.item-img{
    margin-right: 8px;
}
.projectinformation-value .username{
    color: #3b73af;
    cursor: pointer;
}
.statusitem{
    display: flex;
    justify-content: space-between;
    margin: 6px 0;
}
.statusitem-name{
    color: #0052CC;
    cursor: pointer;
}
.statusitem-number{
    border-radius: 10px;
    background-color: #dfe1e6;
    color: #172b4d;
    padding:2px 8px;
    font-size: 12px;
}
.work-filter-list{
    display: flex;
    line-height: 30px;
    justify-content: space-between;
}
.work-filter-list>div>div{
    color: #0052CC;
    cursor: pointer;
}
.work-filter-title{
    margin:15px 0 10px 0;
    font-size: 23px;
}
.statistics{
    border-bottom: 1px solid #dedede;
    padding-bottom: 5px;
}
.item-table-head,.itemtablebody-list{
    display: flex;
}
.item-table-head{
        color: #6c798f;
        font-size: 12px;
        padding: 5px;
}
.item-table-body{
    padding:5px 10px;
    border-bottom: 2px solid #dedede;
    border-top: 2px solid #dedede;
}
.statistics-main{
    display: flex;
    justify-content: space-between;
}
.statistics-main>div{
    width: 48.5%;
}
.statisticsitem-title{
    font-size: 20px;
}
.statisticsitem-table{
    margin: 10px 0;
}
.itemtablebodylist-name{
    color: #0052CC;
    cursor: pointer;
}
.itemtablebody-list{
    margin: 5px 0;
    
}
.statistics-item{
    margin-bottom: 20px;
}
.item-table-footer{
    margin: 10px 5px;
    color: #0052CC;
    cursor: pointer;
}
</style>