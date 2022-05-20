<template>
    <div>
        <div class="section-title">
            <span>子任务</span>
            <div class="edit">
            <div class="hover-iconbtn" @click="newrelated">
                <el-tooltip  content="添加" effect="dark"  placement="bottom">
                    <icon  name="add" />
                </el-tooltip>
            </div>
            </div>
            </div>
            <div class="progress" v-if="relatedlist.length>0">
                <el-progress :stroke-width="10" :percentage="percentage" :format="format"></el-progress>
            </div>
            <div class="section-body" >
                <div class="detail-related-list" v-if="relatedlist.length>0">
                    <draggable
                    class="contentlist"
                    v-model="relatedlistmove"
                    animation="300"
                    dragClass="dragClass"
                    ghostClass="ghostClass"
                    chosenClass="chosenClass"
                    @start="onStart"
                    @end="onEnd"
                    >
                    <div class="detail-related-item" v-for="(item,index) in relatedlistmove" :key="item.id">
                        <div class="relateditem-left">
                            <div class="relateditem-icon">
                                <img :src='"/static/img"+item.fields.issuetype.iconUrl' alt="">
                            </div>
                            <div class="relateditem-name">
                                OA1-37
                            </div>
                            <div class="relateditem-title">
                                <div v-show="!item.edit">
                                    <span v-html="item.fields.summary"></span>
                                    <i class="el-icon-edit"  @click="openedit(index,item)"></i>
                                </div>
                                <div v-show="item.edit">
                                    <input
                                    class="searchinput"
                                    @change="edited(item)"
                                    @keydown="(e) => finishedit(e, item)"
                                    @keydown.27.stop="(e) => finishedit(e, item)"
                                    @blur="(e) => finishedit(27, item)"
                                    ref="relateditem"
                                    size="mini" type="text" v-model="item.fields.summary" />
                                </div>
                            </div>
                        </div>
                        <div class="relateditem-right">
                            <div class="relateditem-user" @click="$set(item,'edituser',true)">
                                
                                <div v-if="!item.edituser">
                                <Userhead :userid="item.OwningUser"/>
                                </div>
                                <div v-else>
                                    <researchelselect 
                                    :focus="true"
                                    :filterables="true"
                                    :borderradius="true"
                                    @blur="item.edituser = false"
                                    :defaultdata="[{ID:item.OwningUser,Name:item.OwningUserName,Icon:''}]"
                                    @change="(id,name,icon)=>OwningUserchange(item,id,name,icon)"
                                    v-model="item.OwningUser"
                                    name="OwningUser"
                                    size="mini"
                                    optionsize="medium"
                                    objtypecode="8" />
                                </div>
                            </div>
                            <div class="relateditem-status">
                                <el-dropdown trigger="click">
                                <span class="el-dropdown-link">
                                    <el-tag size="small">进行中<i class="el-icon-arrow-down el-icon--right"></i></el-tag>
                                </span>
                                <el-dropdown-menu  slot="dropdown">
                                    <el-dropdown-item>
                                      <el-tag type="info" size="mini">未开始</el-tag>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                      <el-tag size="mini">进行中</el-tag>
                                    </el-dropdown-item>
                                    <el-dropdown-item>
                                      <el-tag type="success" size="mini">已完成</el-tag>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div>
                    </div>
                    </draggable>

                </div>
                <div class="newtask" v-show="shownewtask">
                    <div class="searchinput">
                    <input  @keydown.13="savetask" ref="newtaskcontainer" class="el-input__inner" v-model="newtasksubject" placeholder="需要做什么"/>

                    </div>

                    <div class="newtaskfooter">
                        <el-button @click="savetask" :class="{'active':newtasksubject!=''}" type="primary" size="small">创建</el-button>
                        <div @click="shownewtask=false" size="small" class="hoverbtn">取消</div>
                    </div>
                </div>
            </div>
            
    </div>
</template>
<script>
import Userhead from '@/components/Userheadphoto.vue'
import commonapi from '@/api/commonapi.js'
import researchelselect from '@/components/dropbtn/researchelselect.vue'
import icon from '@/icon/icon.vue'
import draggable from "vuedraggable"
import {ListViewRankBefore,ListViewRankAfter} from '@/api/projectapi.js'


export default {
    data(){
        return{
            clicktime:false,
            newtasksubject:'',
            shownewtask:false,
            relatedlistmove:[]
        }
    },
    props:['itemid','relatedlist'],
    watch:{
        relatedlist(){
            this.relatedlistmove = this.relatedlist
        }
    },
    computed:{
      completedsubtask(){
          return this.relatedlistmove.filter((item)=>{return item.fields.status.statusCategory.id==3})
      },
      percentage(){
          if(this.relatedlistmove.length==0){
              return 0
          }
          return (this.completedsubtask.length/this.relatedlistmove.length)*100
      }
    },
    components:{
        Userhead,
        commonapi,
        researchelselect,
        icon,
        draggable
    },
    created(){
        this.relatedlistmove = this.relatedlist
        // this.getdata()
    },
    methods:{
        onStart(){},
        onEnd(e){
            const rowid = e.item._underlying_vm_.id
            if(e.newIndex==0){
                ListViewRankBefore({relativeIssueId:this.relatedlistmove[1].id,issueId:rowid})
            }else{
                ListViewRankAfter({relativeIssueId:this.relatedlistmove[e.newIndex-1].id,issueId:rowid})
            }
        },
        reload(){
            // this.getdata()
            this.$emit('reload')
        },
        format(percentage) {
            return `${percentage}%已完成` ;
        },
        OwningUserchange(item,id,name,icon){
            item.edituser = false
            this.edited(item)
        },
        openedit(index,item){
            this.$set(item,'edit',true)
            this.$nextTick(()=>{
                this.$refs.relateditem[index].focus()
            })
        },
        finishedit(e, item) {
            if(e==27){
                if(item.Subject==''){
                    this.reload()
                }else{
                    item.edit = false
                }
            }
            if(e.keyCode == 13){
                
                item.edit = false
            }
        },
        edited(item){
            if(item.fields.summary!=''){
                const fields = {
                    ParentActivityId:{Id:this.itemid},
                    Subject:item.fields.summary,
                    RegardingObjectId:{Id:this.$route.query.id},
                    ActivityTypeCode:4212,
                    // StatusCode:item.StatusCode,
                    OwningUser:{Id:item.OwningUser},
                    IssueType:10010
                }
                commonapi.entitysaverecord(fields,4200,item.id).then(()=>{
                    this.$message.success('保存成功')
                    this.reload()
                })
            }
        },
        newrelated(){
            this.shownewtask = true
            this.$nextTick(()=>{
                this.$refs.newtaskcontainer.focus()
            })
        },
        getdata(){
            const filterQuery = 'ParentActivityId\teq\t'+this.itemid
            commonapi.entitygridsearch('00U',filterQuery).then((res)=>{
                this.relatedlist = res.rows
            })
        },
        savetask(){
            if(this.newtasksubject!=''){
                commonapi.entitysaverecord({
                    Subject:this.newtasksubject,
                    RegardingObjectId:{Id:this.$route.query.id},
                    ActivityTypeCode:4212,
                    ParentActivityId:{Id:this.itemid},
                    IssueType:10010
                },4200).then(()=>{
                    this.newtasksubject = ''
                    this.$message.success('保存成功')
                    this.reload()
                    this.newrelated()
                })
            }
        }
    }
}
</script>
<style scoped>
.edit-foot{
    margin-top: 10px;
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
.detail-related-item{
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;
    height: 40px;
}
.detail-related-item+.detail-related-item{
    border-top: 1px solid #dedede;
}
.detail-related-item:hover{
    background-color: #f3f3f3;
}
.detail-related-item>div{
    display: flex;
}
.detail-related-item>div>div{
    margin-right: 10px;
}
.detail-related-list{
    padding:3px;
    border: 1px solid #dedede;
    border-radius: 4px;
}
.relateditem-title i{
    margin-left: 3px;
    cursor: pointer;
    display: none;
}
.detail-related-item:hover i{
    display: inline-block;
}
.el-dropdown-menu__item{
    padding: 0 50px 0 10px;
    border-left: 2px solid transparent;
    line-height: 32px;
}
.el-dropdown-menu__item:hover{
    border-left: 2px solid #0052CC;
    background-color: rgb(244,245,247);
}
.el-tag--mini{
    height: 22px;
    line-height: 22px;
}
.relateditem-title input{
    border: 2px solid rgb(76,144,255);
    outline: none;
    height: 22px;
    line-height: 22px;
    text-indent: 5px;
    border-radius: 4px;
    width: 200px;
}
.detail-body{
    padding: 0 0 0 35px;
    display: flex;
    justify-content: space-between;
    height: calc(100vh - 150px);
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
    display: flex;
    justify-content: space-between;
}
.edit>>>svg{
    width: 16px;
    height: 16px;
}
.edit>>>.hover-iconbtn{
    height: 24px;
    width: 24px;
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
.progress{
    padding: 5px;
}
.el-progress{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.progress>>>.el-progress-bar{
    margin-right: -100px;
    padding-right: 100px;
}
.progress>>>.el-progress__text{
    font-size: 14px !important;
}
.newtask{
    margin-top: 10px;
}
.newtaskfooter{
    margin-top: 10px;
    text-align: right;
}
.newtaskfooter>button{
    margin-right: 5px;
    height: 31px;
    background-color: rgba(9,30,66,0.04) !important;
    color: #A5ADBA;
}
.newtaskfooter>button>>>span{
    background-color: rgba(9,30,66,0.04) !important;
}
.newtaskfooter>button.active{
    background-color: #0052CC !important;
    color: #fff;
}
.relateditem-icon img{
    width: 16px;
    height: 16px;
}
.relateditem-left{
    flex: 1;
    align-items: center;
}
.relateditem-icon{
    display: flex;
    align-items: center;
}
.relateditem-title{
    flex: 1;
}
.relateditem-title>div{
    width: 100%;
}
.relateditem-title input{
    width: 100%;
}
</style>