<template>
    <div class="createdproject">
        <div class="createdproject-head">
            <i class="el-icon-close" @click="closepopup"></i>
        </div>
        <div class="createdproject-body">
            <div class="body-main">
            <div class="createdproject-left">
            <div class="createdproject-title">添加项目详情</div>
            <div class="createdproject-description">您可以随时在项目设置中更改这些详情。</div>
            <div class="createdproject-form">
                <div class="from-item">
                    <div class="item-label">名称
                        <span>*</span>
                    </div>
                    <div class="item-value">
                       <el-input v-model="form.Name"></el-input>
                    </div>
                </div>
                <div class="from-item">
                    <div class="item-label">键
                        <!-- <span>*</span> -->
                    </div>
                    <div class="item-value">
                       <el-input style="width:50%" v-model="form.ProjectKey"></el-input>
                    </div>
                </div>
            </div>
        </div>
        <div class="createdproject-right">
                <div class="right-head">
                    <div class="right-head-title">模板</div>
                    <div class="right-head-btn">
                        <div class="hover-btn">更改模板(暂不可用)</div>
                    </div>
                </div>
                <div class="right-body">
                    <div class="project-model">
                        <div class="model-left">
                            <div class="model-img">
                                <img src="/static/img/svg/kanban.svg" alt="">
                            </div>
                        </div>
                        <div class="model-right">
                            <div class="model-title">客户服务管理</div>
                            <div class="model-description">使用专为帮助外部客户而设计的模板，快速提供卓越的服务体验。</div>
                        </div>
                    </div>
                </div>
        </div>
        </div>
        <div class="createdproject-footer">
            <el-button size="small" @click="closepopup">取消</el-button>
            <el-button size="small" type="primary" @click="entitysaverecord">创建项目</el-button>
        </div>
        </div>
        
    </div>
</template>
<script>
import {ProjectEdit} from '@/api/projectapi.js'

export default {
    inject:['reload'],
    data(){
        return {
            form:{
                Name:''
            }
        }
    },
    methods:{
        closepopup(){
            this.$parent.showpopup = false
        },
        entitysaverecord(){
            if(this.form.Name!=''){
                ProjectEdit({
                        Name:this.form.Name,
                        ProjectKey:this.form.ProjectKey
                },20290).then(res=>{
                    this.$message.success('创建项目成功');
                    if(this.$route.path=='/projects/list'){
                        this.reload()
                    }
                    this.closepopup()
                })
            }else{
                this.$message.error('请填写项目名称');
            }
        }
    }
}
</script>
<style scoped>
    .createdproject-head{
        padding: 20px;
    }
    .createdproject-head i{
        font-size: 24px;
        cursor: pointer;
        font-weight: 700;
    }
    .createdproject{
        background-color: #fff;
        width: 100%;
        height: 100%;
    }
    .createdproject-body{
        width: 900px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .body-main{
        display: flex;
        width: 100%;
        justify-content: space-between;

    }
    .body-main>div{
        width: 45%;
    }
    .createdproject-title{
        font-size: 28px;
        font-weight: 700;
        line-height: 50px;
    }
    .item-label{
        margin: 5px 0;
    }
    .createdproject-description{
        font-size: 12px;
    }
    .item-label>span{
        color: #DE350B;
    }
    .createdproject-right{
        background-color: rgb(250, 251, 252);
        border-radius: 20px;
        padding:30px 20px;
    }
    .right-head{
        display: flex;
        justify-content: space-between;
    }
    .hover-btn{
        cursor: pointer;
    }
    .right-body{
        border-radius: 10px;
        margin-top: 20px;
        overflow: hidden;
        box-shadow: rgb(9 30 66 / 13%) 0px 1px 1px, rgb(9 30 66 / 13%) 0px 0px 1px;
    }
    .model-left{
        padding:20px 10px;
        background-color: rgb(244, 245, 247);
        box-sizing: border-box;
    }
    .model-right{
        background-color: #fff;
        padding:10px 20px;
    
    }
    .model-img img{
        width: 85px;
        height: 55px;
    }
    .project-model{
        display: flex;
    }
    .model-title{
        line-height: 30px;
    }
    .model-description{
        font-size: 12px;
        color: rgb(107, 119, 140);
    }
    .createdproject-footer{
        text-align: right;
        margin-top: 30px;
    }
</style>