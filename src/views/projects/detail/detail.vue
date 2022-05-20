<template>
<div class="project-detail" :class="{'onearrange':twoarrange}">
<div class="head-container">
    <div class="head-breadcrumb">
        <div class="breadcrumb">
            <el-breadcrumb>
                <el-breadcrumb-item class="breadcrumbitem">
                    <!-- <el-tooltip class="item" effect="dark" content="更改项目类型" placement="bottom"> -->
                        <img v-if="informationdata.record.IssueType" :src="'/static/img'+informationdata.record.IssueType.content.iconUrl" alt="">
                    <!-- </el-tooltip> -->
                    <div class="task-title" v-if="informationdata.record.IssueKey">
                        <a @click="opendetail">
                            <span>{{informationdata.record.IssueKey.content}}</span>
                        </a>
                        <copylink :copy="itemid"/>
                    </div>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="head-operate">
                <el-tooltip content="关注" effect="dark"  placement="bottom">
                    <guanzhu />
                </el-tooltip>
                <el-tooltip content="表决" effect="dark"  placement="bottom">
                    <biaojue />
                </el-tooltip>
                <el-tooltip content="分享" effect="dark"  placement="bottom">
                    <sharepopup class="sharepopup" />
                </el-tooltip>

            <div class="head-operate-item svgiconbtn">
                <el-dropdown trigger="click" @command="handleCommand">
                    <el-tooltip content="更多" effect="dark" placement="bottom">
                        <icon name="gengduo" />
                    </el-tooltip>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>记录工作</el-dropdown-item>
                        <el-dropdown-item>Connect Slack channel</el-dropdown-item>
                        <el-dropdown-item divided>转换为子任务</el-dropdown-item>
                        <el-dropdown-item command="move">移动</el-dropdown-item>
                        <el-dropdown-item command="copy">克隆</el-dropdown-item>
                        <el-dropdown-item command="delete">删除</el-dropdown-item>
                        <el-dropdown-item divided>查找字段</el-dropdown-item>
                        <el-dropdown-item divided>打印</el-dropdown-item>
                        <el-dropdown-item >打印</el-dropdown-item>
                        <el-dropdown-item >导出 XML</el-dropdown-item>
                        <el-dropdown-item >导出 Word</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="head-operate-item hover-iconbtn" @click="$emit('close')" v-if="popup!=false">
                <el-tooltip content="关闭" effect="dark"  placement="bottom">
                    <icon name="guanbi" />
                </el-tooltip>
            </div>
        </div>
    </div>
    
    
</div>
<div class="detail-body" :style="{height:detailheight}">
    <div class="detail-left" >
        <div class="head-title">
        <div class="head-name" style="width:100%" @click="editsubject">
            <div v-show="!edittitle" >
            {{informationdata.record.Subject}}
            </div>
            <div v-show="edittitle" style="width:100%">
                <el-input 
                class="searchinput"
                style="width:100%" 
                 ref="subject"
                v-model="informationdata.record.Subject" 
                @blur="edittitle=false" @change="savedetail('Subject');edittitle=false"></el-input>
            </div>
        </div>

        
    </div>
        <div class="head-operate">
            <div class="head-operate-item btn"  @click="addfile">
                <el-tooltip content="添加附件" effect="dark"  placement="bottom">
                    <i class="el-icon-link">添加附件</i>
                </el-tooltip>
            </div>
            <div class="head-operate-item btn"  @click="newrelated">
                <el-tooltip content="添加子事务" effect="dark"  placement="bottom">
                    <div  class="addsubtask">
                        <icon name="subtasknumber"></icon>添加子事务</div>
                </el-tooltip>
            </div>
            <div class="head-operate-item btn" @click="newrelated">
                <el-tooltip content="链接事务" effect="dark"  placement="bottom">
                    <i class="el-icon-connection">链接事务</i>
                </el-tooltip>
            </div>
            <!-- <div class="head-operate-item iconbtn">
                <el-dropdown trigger="click">
                    <el-tooltip content="更多" effect="dark" placement="bottom">
                        <div class="el-icon-more"></div>
                    </el-tooltip>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>管理工作流</el-dropdown-item>
                        <el-dropdown-item>配置看板</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div> -->
        </div>

        <div class="detail-section detail-describe">
            <div class="section-title">描述</div>
            <div class="section-body">
                <div v-show="!editdescribe.show" @click="editdescribe.show=true">
                    <div class="descriptioncontainer" 
                        v-if="informationdata.record.Description!=''" 
                        v-html="informationdata.record.Description">
                    </div>
                    <div v-else class="placeholder">
                        <span >添加描述...</span>
                    </div>
                </div>
                <div class="editorcontent" v-show="editdescribe.show">
                    <Editor v-model="informationdata.record.Description"></Editor>
                    <div class="edit-foot">
                        <el-button @click="savedetail('Description')" type="primary" size="mini">保存</el-button>
                        <el-button @click="editdescribe.show=false" size="mini">取消</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-section detail-describe">
            <div class="section-title">附件</div>
            <div class="section-body">
                <fileupload :autoupload="true" :itemid="itemid" ref="fileupload" />
            </div>
        </div>
        <div class="detail-section detail-related" v-if="informationdata.record.subtask">
            <Subtask  :relatedlist="informationdata.record.subtask.content" ref="Subtask" :itemid="itemid" @reload="reloadinformation();$emit('reload')" />
        </div>
        <information v-if="twoarrange" :informationdata='informationdata'></information>
        <div class="detail-section detail-active">
            <Common :itemid="itemid"/>
        </div>
    </div>
    <div class="detail-right" v-if="!twoarrange">
        <information @reload="reloadinformation" :informationdata='informationdata'></information>
    </div>
</div>
    <movetask ref="movetask" :project="informationdata.record.RegardingObjectId" :itemid="itemid" />
    <copytask ref="copytask" :Subject="informationdata.record.Subject" :itemid="itemid" />
</div>
</template>
<script>
import Editor from "@/components/editor.vue";
import Userhead from '@/components/Userheadphoto.vue'
import fileupload from '@/components/fileupload.vue'
import information from "@/components/sectioncomponents/information";
import commonapi from '@/api/commonapi.js'
import icon from '@/icon/icon.vue'
import Subtask from '@/components/sectioncomponents/Subtask.vue'
import Common from '@/components/sectioncomponents/common.vue'
import sharepopup from "@/components/popup/share.vue";
import guanzhu from "@/components/popup/guanzhu.vue";
import biaojue from "@/components/popup/biaojue.vue";
import copylink from "@/components/copylink.vue";
import {IssueDataGet} from "@/api/projectapi.js";

import movetask from "@/alert/movetask.vue";
import copytask from "@/alert/copytask.vue";

export default {
    inject:['reload'],
    data(){
        return {
            id:'',
            name:'',
            title:'任务详情',
            edittitle:false,
            fileList:[],
            editdescribe:{
                show:false
            },
            informationdata:{
                record:{}
            },
            relatedlist:[
            ],
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
        }
    },
    props:['twoarrange','detailheight','itemid','popup'],
    watch:{
        itemid(){
            this.getdata()
        }
    },
    computed:{
    },
    created(){
        if(this.$route.params.projectname){
            this.name = this.$route.params.projectname
        }
        // this.itemid = this.$route.query.id
        this.getdata()
    },
    mounted() {
        tinymce.init({});
    },
    components:{
        Userhead,
        Editor,
        information,
        fileupload,
        icon,
        Subtask,
        Common,
        sharepopup,
        guanzhu,
        biaojue,
        copylink,
        movetask,
        copytask,
        
    },
    methods:{
        addfile(){
            this.$refs.fileupload.$el.childNodes[0].childNodes[1].click()
        },
        opendetail(){
            const url = this.$router.resolve({
                path:'/projects/detail/'+this.$route.params.projectname,
                query:{
                    id:this.$route.query.id,
                    itemid:this.itemid
                }
            })
            window.open(url.href)
        },
        handleCommand(command){
            if(command=='move'){
                this.$refs.movetask.show()
            }
            if(command=='copy'){
                this.$refs.copytask.show()
            }
            if(command=='delete'){
                this.$confirm('<p>您将永久删除此事务及其所有子任务、评论、附件以及所有数据。您应该将您不想删除的全部子任务移动到另一个父事务中。</p><p>如果不确定，可以解决或关闭此事务。</p>', '删除 '+this.informationdata.record.IssueKey.content+' 及其子任务?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                confirmButtonClass:'warningbtn',
                type: 'warning',
                dangerouslyUseHTMLString: true
            }).then(() => {
                commonapi.entitydelete(4200,this.itemid).then(()=>{
                    this.reload()
                })
            })
            }
        },
        titlechange(){
            console.log(123)
        },
        reloadinformation(){
            this.$emit('reload')
            this.getdetail()
        },
        newrelated(){
            this.$refs.Subtask.newrelated()
        },
        savedetail(column){
            const fields = {}
            fields[column] = this.informationdata.record[column]
            commonapi.entitysaverecord(fields,4200,this.informationdata.id).then(()=>{
                this.$message.success('保存成功')
                this.getdetail()
                this.$emit('reload')
                this.editdescribe.show = false
            })
        },
        getdata(){
            this.getdetail()
        },
        getdetail(){
            return IssueDataGet(this.itemid).then((res)=>{
                let record = {}
                res.data.fields.forEach(item => {
                    record[item.key]=item
                });
                this.informationdata.id = res.data.id
                this.informationdata.record = {
                    Subject:record.Subject.content,
                    Description:record.Description.content,
                    OwningUser:{
                        Id:record.OwningUser.content.id,
                        Name:record.OwningUser.content.displayName
                    },
                    CreatedBy:{
                        Id:record.OwningUser.content.id,
                        Name:record.OwningUser.content.displayName,
                        Icon:record.OwningUser.content.self
                    },
                    PriorityCode:record.PriorityCode,
                    ScheduledStart:record.ScheduledStart.content,
                    ScheduledEnd:record.ScheduledEnd.content,
                    IssueType:record.IssueType,
                    IssueKey:record.IssueKey,
                    StateCode:record.StateCode,
                    RegardingObjectId:{
                        id:record.RegardingObjectId.content.id,
                        name:record.RegardingObjectId.content.name,
                        avatarValue:{
                            large:record.RegardingObjectId.content.avatarValue.large
                        }
                    },
                    subtask:record.subtask,
                    id:this.itemid,
                    TimeOriginalEstimate:record.TimeOriginalEstimate.content
                }
            })
            // commonapi.entitygetdetail(4200,this.itemid).then((res)=>{
            //     this.informationdata = res
            // })
        },
        editsubject(){
            this.edittitle = true
            this.$nextTick(()=>{    
                this.$refs.subject.focus()
            })
        }
    }
}
</script>
<style scoped>
.head-operate{
    display: flex;
}
.head-container{
    padding: 15px 40px 0 40px;
}
.head-title{
    font-size: 22px;
    color: #172b4d;
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    margin-bottom: 5px;
}
.head-name{
display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
}
.el-dropdown{
    display: block;
}
.detail-left{
    width: 60%;
    padding-right: 20px;
    box-sizing: border-box;
}
.detail-left .head-operate{
    padding: 0 5px;
}
.onearrange .detail-left {
    width: 100%;
    padding-right: 10px;
}
.onearrange .detail-body{
  height: calc(100vh - 220px);
}
.onearrange .head-container{
  padding-left: 15px;
}
.onearrange .detail-body{
  padding-left: 15px;
}
.detail-body{
    padding: 0 0 0 35px;
    display: flex;
    justify-content: space-between;
    height: calc(95vh - 100px);
}
.detail-body>div{
    overflow: auto;
    height: 100%;
}
.detail-section {
    margin: 15px 0;
}
.section-title{
    font-weight: 700;
    padding: 0 5px;
}
.section-body{
    margin: 5px 0;
    padding: 0 5px;
}
.detail-describe .section-body{
    padding: 0;
}
.placeholder{
    color: #777;
    border-radius: 4px;
    cursor: pointer;
    padding: 7px 5px;
}
.placeholder:hover{
    background-color: rgb(231, 231, 233);
}
.detail-right{
    width: 40%;
    box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 20px;
}
.detail-right .section-body{
    padding: 0 5px;
}
.edit-foot{
    margin-top: 10px;
}
.el-dropdown-menu__item{
    padding: 0 30px 0 10px;
}
.sharepopup>>>.title{
    display: none;
}
.sharepopup>>>.icon{
    margin: 0;
}
.sharepopup>>>svg{
    width: 22px;
    height: 22px;
}
.breadcrumbitem>>>.el-breadcrumb__inner{
    display: flex;
    align-items: center;
}
.breadcrumbitem img{
    margin-right: 5px;
    cursor: pointer !important;
}
.breadcrumbitem a{
    text-decoration:underline;
    cursor: pointer !important;
}
.head-breadcrumb{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.head-breadcrumb img{
    width: 16px;
    height: 16px;
}
.task-title{
    display: flex;
    align-items: center;
}
.task-title>>>svg{
    width: 18px;
    height: 18px;
    margin-left: 3px;
}
.copylink{
    visibility: hidden;
    cursor: pointer;
}
.task-title:hover .copylink{
    visibility: initial;
}
.descriptioncontainer{
    padding: 5px;
}
.head-name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.head-name:hover{
    background-color: #f2f2f2;
}
.addsubtask{
    display: flex;
    align-items: center;
    color: #42526e ;
}
.addsubtask>>>svg{
    width: 16px;
    height: 16px;
    margin-right: 3px;
}

</style>