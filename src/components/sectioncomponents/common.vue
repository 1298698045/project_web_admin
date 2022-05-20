<template>
            <div>
                <div class="section-title">活动</div>
            <div class="section-body">
                <div class="detail-active-head">
                显示：
                <div @click="commontabchange(0)" class="tabbtn" :class="{'active':activebtn.commontabactive==0}">
                    全部
                </div>
                <div @click="commontabchange(1)" class="tabbtn" :class="{'active':activebtn.commontabactive==1}">
                    评论
                </div>
                <div @click="commontabchange(2)" class="tabbtn" :class="{'active':activebtn.commontabactive==2}">
                    历史记录
                </div>
                <div @click="commontabchange(3)" class="tabbtn" :class="{'active':activebtn.commontabactive==3}">
                    工作日志
                </div>
                <div class="sort" @click="sortchange">
                    <div class="sort hover pointer" v-if="sort=='down'">
                        <span>先显示最新的</span>
                        <icon name="sortdown"/>
                    </div>
                    <div class="sort hover pointer" v-else>
                        <span>先显示最旧的</span>
                        <icon name="sortup"/>
                    </div>
                </div>
                </div>
                <div class="detail-active-body">
                    <div class="common-container" v-show="activebtn.commontabactive==1">
                        <div class="common-container-left">
                            <Userhead :width="'32px'" :height="'32px'" />
                        </div>
                        <div class="common-container-right">
                            <div class="common-paceholder" v-show="!control.writecommon" @click="control.writecommon=true">
                                添加评论...
                                </div>
                            <div class="common-editor" v-show="control.writecommon">
                                <editor v-model="commoneditdescribe.value" :init="commoneditdescribe.init"></editor>
                                <div class="edit-foot">
                            <el-button type="primary" size="mini" @click="savecommon">保存</el-button>
                                <el-button @click="control.writecommon=false" size="mini">取消</el-button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="activebtn.commontabactive==3" @click="addworklog" class="addworklog">添加工作日志</div>
                    <div v-if="commonlist.length==0" class="el-empty">
                        <el-empty :image-size="140"></el-empty>
                    </div>
                    <div class="manipulate-list" v-for="item in commonlist" :key="item.id">
                        <div class="manipulate-item" v-if="item.__typename=='CommentItem'">
                            <div class="manipulate-left">
                                <Userhead :width="'32px'" :height="'32px'" :popover="true" 
                                :userid="item.commentItem.createdBy.accountId"
                                :url="item.commentItem.createdBy.picture"/>
                            </div>
                            <div class="manipulate-right">
                                <div class="manipulate-head">
                                    <span class="name">{{item.commentItem.createdBy.name}}</span>
                                    <!-- <span class="type">已更新描述</span> -->
                                    <span class="time">{{item.commentItem.createdOn}}</span>
                                    <el-tag effect="dark" type="info" size="mini">评论</el-tag></div>
                                    <div class="manipulate-body" v-html="item.commentItem.body">
                                    </div>
                            </div>
                        </div>
                        <div class="manipulate-item" v-else>
                            <div class="manipulate-left">
                                <Userhead :width="'32px'" :height="'32px'" :popover="true" 
                                :userid="item.historyItem.actor.accountId"
                                :url="item.historyItem.actor.avatarUrl"/>
                            </div>
                            <div class="manipulate-right">
                                <div class="manipulate-head">
                                    <span class="name">{{item.historyItem.actor.displayName}}</span>
                                    <span class="type">已更新 {{item.historyItem.fieldDisplayName}}</span>
                                    <span class="time">{{item.historyItem.created}}</span>
                                    <el-tag effect="dark" type="info" size="mini">历史记录</el-tag></div>
                                    <div class="manipulate-body">
                                        {{item.historyItem.from.value}} -> {{item.historyItem.to.value}}
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Worklog v-model="worklog" />
            </div>
            </div>
</template>
<script>
import tinymceinit from "@/utils/tinymceinit.js"
import tinymce from "tinymce";
import Editor from "@tinymce/tinymce-vue";
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default'
import Userhead from '@/components/Userheadphoto.vue'
import icon from '@/icon/icon.vue'
import {projectcommentgetlist} from '@/api/projectapi.js'
import commonapi from '@/api/commonapi'
import Worklog from '@/alert/Worklog.vue'

export default {
    data(){
        return{
            sort:'up',
            activebtn:{
                commontabactive:0
            },
            control:{
                writecommon:false
            },
            commoneditdescribe:{
                value:'',
                show:false,
                init: tinymceinit.init
            },
            commonlist:[],
            worklog:false,
        }
    },
    props:['itemid'],
    components:{
        Editor,
        Userhead,
        icon,
        Worklog
    },
    created(){
        this.getcommon()
    },
    methods:{
        addworklog(){
            this.worklog = true
        },
        getcommon(){
            // var filterQuery = 'RegardingObjectId\teq\t'+this.itemid
            var filterQuery = ''
            if(this.activebtn.commontabactive!=''){
                filterQuery += 'CommentType\teq\t'+this.activebtn.commontabactive
            }
            projectcommentgetlist({
                // filterQuery:filterQuery,
                type:this.activebtn.commontabactive,
                regardingObjectId:this.itemid,
                sort:this.sort,
                entityType: "10C",
                pageSize:1000,
                pageNumber:1
            }).then((res)=>{
                this.commonlist = res.actions[0].returnValue.Data
            })
        },
        commontabchange(type){
            this.activebtn.commontabactive = type
            this.getcommon()
        },
        savecommon(){
            commonapi.entitysaverecord({
                Body:this.commoneditdescribe.value,
                RegardingObjectId:{
                    Id:this.itemid
                },
                CommentType:1,
                RegardingObjectTypeCode:4212
            },20310).then(()=>{
                this.control.writecommon = false
                this.getcommon()
            })
        },
        sortchange(){
            const sort = this.sort=='up'?'down':'up'
            this.sort = sort
            this.getcommon()
        }
    }
}
</script>
<style scoped>
.tabbtn{
    padding: 4px 5px;
    cursor: pointer;
    color: rgb(66, 82, 110) ;
    border-radius: 4px;
    background-color: rgb(243, 243, 245);
    display: inline-block;
    margin-right: 5px;
}
.tabbtn.active{
    color: rgb(244, 245, 247) ;
    background-color: rgb(80, 95, 121);;
}
.manipulate-head{
    color: #666;
}
.manipulate-head .name,.manipulate-head .type{
    color: #000;
}
.manipulate-body{
    margin: 5px;
}
.manipulate-item{
    display: flex;
    margin: 20px 0;
}
.manipulate-left{
    padding: 5px 10px 0 0;
}
.common-paceholder{
    padding: 10px;
    border: 1px solid #dedede;
    border-radius: 4px;
}
.common-container{
    display: flex;
}
.common-container{
    margin-top: 15px;
}
.common-container-left{
    margin-right: 10px;
    padding-top: 5px;
}
.common-container-right{
    flex: 1;
}
.edit-foot{
    margin-top: 10px;
}
.section-title{
    font-weight: 700;
    padding: 0 5px;
}
.section-body{
    margin: 5px 0;
    padding: 0 5px;
}
.sort{
    display: flex;
    float: right;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
    align-items: center;
}
.sort>>>svg{
    width: 16px;
    height: 16px;
    margin-left: 1px;
}
.el-empty{
    display: flex;
    justify-content: center;
    width: 100%;
}
.addworklog{
    cursor: pointer;
    color: #108def;
    margin: 10px 0;
}
</style>