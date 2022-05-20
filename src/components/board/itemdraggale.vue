<template>
  <div>
    <draggable
      class="draggablecontent"
      v-model="activecontent"
      group="site"
      animation="300"
      dragClass="dragClass"
      ghostClass="ghostClass"
      chosenClass="chosenClass"
      @start="onStart"
      @end="onEnd"
      :move="onMove"
    >
      <transition-group :listid="listid" :groupid="groupid" :statusId="statusId">
        <div
          @click="openitemview(item.ActivityId)"
          class="item"
          v-for="(item, itemindex) in activecontent"
          :key="item.ActivityId"
        >
          <div class="item-title">
              <el-tooltip effect="dark" :content="item.Subject" placement="bottom">

            <div class="item-subject">
                <span>{{ item.Subject }}</span>
            </div>
              </el-tooltip>

            <div class="item-edit">
              <el-dropdown
                trigger="click"
                @command="(command) => itemhandleCommand(command,item,activecontent)"
              >
                <span @click.stop class="el-dropdown-link list-item-btn">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item command="1">添加标记</el-dropdown-item>
                  <el-dropdown-item command="2">删除标记</el-dropdown-item>
                  <el-dropdown-item command="3">添加标签</el-dropdown-item>
                  <el-dropdown-item command="4">添加父项目</el-dropdown-item>
                  <el-dropdown-item command="5">更改父项目</el-dropdown-item> -->
                  <el-dropdown-item command="copy">
                        <copylink :copy="item.ActivityId">
                          复制事务链接
                        </copylink>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="itemindex!=0&&$store.boardpermissions.find((item)=>{return item=='MOVE_ISSUE'})" command="movetop">移动至顶部</el-dropdown-item>
                  <el-dropdown-item v-if="itemindex!=activecontent.length-1&&$store.boardpermissions.find((item)=>{return item=='MOVE_ISSUE'})" command="movebottom">移动至底部</el-dropdown-item>
                  <el-dropdown-item v-if="$store.boardpermissions.find((item)=>{return item=='DELETE_ISSUE'})" command="delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="item-body">
            <div class="item-time">
              <span>
                  <svgicon name="time" />
              </span>
              <span>{{item.dueDate&&item.dueDate!=''?item.dueDate:'未设置时间'}}</span>
            </div>
            <div class="item-parent">
              父任务
            </div>
          </div>
          <div class="item-footer">
            <div class="item-type">
              <el-tooltip  effect="dark" :content="item.issueType.name" placement="bottom">
                  <img :src="'/static/img'+item.issueType.iconUrl" alt="" />
              </el-tooltip>
            </div>
            <div class="item-key">
              <el-tooltip  effect="dark" :content="item.issueId" placement="bottom">
                <span>{{item.issueId}}</span>
              </el-tooltip>
            </div>
            <div class="item-subtask" v-if="item.childIssuesMetadata.total!=0">
              <el-tooltip effect="dark" :content="childIssuesMetadata.total+'个子任务已完成'+item.childIssuesMetadata.complete+'个'" placement="bottom">
                <div class="subtasknumber">
                  <svgicon name="subtasknumber" />
                  <span>{{item.childIssuesMetadata.complete}}/{{item.childIssuesMetadata.total}}</span>
                </div>
              </el-tooltip>
            </div>
            <div class="item-status">
              <el-tooltip effect="dark" :content="item.status.name" placement="bottom">
                  <div>
                    <div v-if="item.status.statusCategoryId==3">
                      <svgicon name="wancheng" />
                    </div>
                    <div v-else>
                      <div class="statusCategoryId" :class="'statusCategoryId'+item.status.statusCategoryId">{{item.status.name}}</div>
                    </div>
                  </div>
              </el-tooltip>
            </div>
            <div class="item-priority">
              <el-tooltip effect="dark" :content="item.PriorityCodeName" placement="bottom">
                  <img :src="'/static/img'+item.priority.iconUrl">
              </el-tooltip>
            </div>
            <div class="item-owneruser">
              <el-tooltip  effect="dark" :content="item.OwningUserName" placement="bottom">
                <Userhead :url="item.assignee.avatarUrl" />
              </el-tooltip>
            </div>
          </div>
        </div>
      </transition-group>
    </draggable>
    <el-dialog title="任务详情" :append-to-body="true" :visible.sync="detaildialog" width="80%" top="5vh">
        <itemdetail :itemid="detailitem" @reload="reloadlist" @close="detaildialog=false"></itemdetail>
    </el-dialog>
          
  </div>
</template>
<script>
import draggable from "vuedraggable"
import Userhead from "../Userheadphoto.vue"
import itemdetail from "@/views/projects/detail/detail.vue"
import commonapi from '@/api/commonapi'
import {TransitionAndRankJWMBoardView} from '@/api/projectapi.js'
import svgicon from '@/icon/icon.vue'
import copylink from "@/components/copylink.vue";

export default {
    data(){
        return {
            drag:false,
            detaildialog:false,
            detailitem:'',
            activecontent:[],
            relatedContext:{},
            throttlemessage:false,
            canmove:false
        }
    },
    components: {
        draggable,
        Userhead,
        itemdetail,
        svgicon,
        copylink
    },
  props: ["content","goupname","listid","groupid",'statusId'],
  watch:{
    content:{
      handler(){
        this.activecontent = this.content
      },
      deep:true
    }
  },
  created() {
    this.activecontent = this.content
  },
  computed: {
    activecontentlist() {
      return (list, key) => {
        if (list) {
          return list.filter((item) => {
            return item.groupid == key;
          });
        } else {
          return list;
        }
      };
    },
  },
  methods: {
    onMove(e,originalEvent){ 
      this.canmove = true
      if(!this.$store.boardpermissions.find((item)=>{return item =='MOVE_ISSUE'})){
        this.canmove = false
        if(!this.throttlemessage){
          this.$message.error('移动失败，没有权限')
          this.throttlemessage = true
          setTimeout(()=>{
            this.throttlemessage = false
          },1000)
        }
        return false;
      }
      this.relatedContext = e.relatedContext
    }, 
      onStart(a) {
      // console.log(a)
      this.drag = true;
    },
    //拖拽结束事件
    onEnd(e) {
      if(!this.canmove){
        return false
      }
      this.drag = false;
      const item = e.item._underlying_vm_
      const relateditem = this.relatedContext.element
      // console.log(relateditem)
      if(relateditem){
        let dragoption = {
          issueIds:[item.ActivityId]
        }
        if(e.newIndex<=this.relatedContext.index){
          dragoption.beforeIssueId = relateditem.ActivityId
        }else{
          dragoption.afterIssueId = relateditem.ActivityId
        }
        let fields = {}
        if(item.ListId!=relateditem.ListId){
          fields.ListId = relateditem.ListId
          fields.stateCode = relateditem.status.statusId
          // console.log(toelement.$attrs,'toelement.$attrs.statusId')

        }
        if(this.goupname&&this.goupname!=''){
          fields[this.goupname] = relateditem[this.goupname]
        }
        this.savesort(dragoption)
        .then(()=>{
          if(Object.keys(fields).length>0){
            return this.saveitem(fields,item.ActivityId)
          }else{
            return true
          }
        })
        .then(()=>{
          this.reloadlist()
        })
      }else{
        let fields = {}
        const toelement = e.to.__vue__
        if(item.ListId!=toelement.$attrs.listid){
          fields.listid =toelement.$attrs.listid
          fields.stateCode = toelement.$attrs.statusId
          // console.log(toelement.$attrs,'toelement.$attrs.statusId')
        }
        if(item[this.goupname]&&toelement.$attrs.groupid!=''){
          fields[this.goupname] = toelement.$attrs.groupid
        }
        this.saveitem(fields,item.ActivityId)
        .then(()=>{
          this.reloadlist()
        })
      }
      
    },
    footclick() {
      //alert(1)
    },
    savesort(data){
      return TransitionAndRankJWMBoardView(data)
    },
    saveitem(fields,id){
      return commonapi.entitysaverecord(fields,'4200',id)
    },
    openitemview(item) {
      this.detaildialog = true;
      this.detailitem = item;
    },
    itemhandleCommand(command,item,list) {
      // console.log(command);
      //  console.log(list);
      // if (command == 4) {
      //   this.longstorydialog = true;
      // }
      // if (command == 3) {
      //   this.tagdialog = true;
      // }
      if(command=='delete'){
        this.entitydelete(4200,item.ActivityId).then(()=>{
            this.reloadlist()
        })
      }
      if(command=='movetop'){
        let dragoption = {
          issueIds:[item.ActivityId],
          beforeIssueId:list[0].ActivityId
        }
        this.savesort(dragoption).then(()=>{
          this.reloadlist()
        })
      }
      if(command=='movebottom'){
        let dragoption = {
          issueIds:[item.ActivityId],
          afterIssueId:list[list.length-1].ActivityId
        }
        this.savesort(dragoption).then(()=>{
          this.reloadlist()
        })
      }
      if(command='copy'){
      //  console.log(item);
        
      }
    },
    reloadlist(){
      this.$emit('reloadlist')
    },
  },
};
</script>
<style scoped>
.list-item-btn {
  cursor: pointer;
}
.contentlist {
  display: flex;
  flex-wrap: nowrap;
}
.contentlist-item {
  width: 270px;
  background-color: rgb(244, 245, 247);
  border-radius: 4px;
  margin-right: 15px;
  flex: none;
  padding-bottom: 60px;
}
.contentlist-item.edit {
  padding-bottom: 100px;
}
.list-item-head {
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  z-index: 1;
  top: 0;
  background-color: rgb(244, 245, 247);
  width: 270px;
  box-sizing: border-box;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid #dedede;
  height: 46px;
  line-height: 46px;
}
.list-item-head .el-dropdown {
  margin-right: 10px;
}
.item-title {
  color: rgb(23, 43, 77);
}
.item-subject{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: calc(100% - 30px);
}
.item-footer {
  color: #666;
  margin-top: 8px;
  overflow: hidden;
}
.item-footer>div{
  display: flex;
  align-items: center;
}
.item-type {
  margin-top: 1px;
}
.item-type,
.item-number {
  float: left;
  margin-right: 5px;
}
.item-owneruser {
  background-color: #8993a4;
  color: #fff;
  width: 24px;
  height: 24px;
  float: right;
  border-radius: 50%;
}
/*定义要拖拽元素的样式*/
.ghostClass {
  background-color: rgb(196, 219, 253) !important;
}
.chosenClass {
  background-color: rgb(196, 219, 253) !important;
  opacity: 1 !important;
}
.dragClass {
  background-color: rgb(222, 235, 255) !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}
.title {
  padding: 6px 12px;
}
.item.active {
  background-color: rgb(196, 219, 253) !important;
}
.item {
  padding: 12px;
  border: solid 1px #eee;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 1px 1px #ddd;
  cursor: pointer !important;
}
.item:hover {
  background-color: rgb(222, 235, 255);
  cursor: move;
}
.item + .item {
  border-top: none;
  margin-top: 5px;
}
.list-item-body {
  position: relative;
  height: calc(100% - 45px);
  padding-bottom: 60px;
}
.list-item-body.edit {
  padding-bottom: 100px;
}
.draggablecontent {
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
}
.draggablecontent > span {
  display: block;
  height: 100%;
  width: 100%;
}
.itxst {
  display: flex;
}
.newlist-btn {
  width: 32px;
  height: 32px;
  line-height: 32px;
  background-color: rgb(244, 245, 247);
  border-radius: 4px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  position: sticky;
  top: 0;
}
.newlist-btn:hover {
  color: #fff;
  background-color: #5cb6ff;
}
.newitem-btn {
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 4px;
  visibility: hidden;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
}
.contentlist-item.active .newitem-btn {
  visibility: initial;
}
.contentlist-item:hover .newitem-btn {
  visibility: initial;
}
.newitem-btn i {
  font-weight: 700;
  margin-right: 5px;
}
.newitem-btn:hover {
  background-color: rgba(9, 30, 66, 0.08);
}
.edit-box {
  padding: 5px;
  box-shadow: rgb(76 154 255) 0px 0px 0px 2px inset;
  border-radius: 4px;
  background-color: white;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
}
.edit-box textarea,
.list-item-name-edit input {
  border: 0;
  width: 100%;
  outline: none;
  resize: none;
}
.list-item-name-edit {
  width: 100%;
  box-shadow: rgb(76 154 255) 0px 0px 0px 2px inset;
  border-radius: 4px;
  padding: 2px;
  background-color: white;
  height: 34px;
  margin-top: 4px;
}
.list-item-name-edit input {
  height: 34px;
  line-height: 34px;
  flex: 1;
  text-indent: 5px;
  margin-top: 0px;
  float: left;
}
.editbox-foot {
  overflow: hidden;
}
.editbox-foot {
  padding: 10px 5px;
}
.editbox-foot img {
  float: left;
  margin-top: 1px;
  margin-right: 5px;
}
.editbox-foot i {
  font-weight: 700;
}
.list-item-name {
  margin-left: 10px;
}
.contentlist.firstgroup .draggablecontent {
  margin-top: 30px;
}
.group-head {
  position: sticky;
  width: 500px;
  left: 35px;
  display: flex;
  align-items: center;
  padding: 0 5px;
}
.group-head-box {
  position: sticky;
  top: 45px;
  z-index: 1;
  cursor: pointer;
  background-color: #fff;
}
.main-container-body > div > div.contentlist {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: white;
}
.group-head:focus {
  box-shadow: rgb(76 154 255) 0px 0px 0px 2px inset;
  outline: none;
}
.group-head > div {
  line-height: 32px;
  margin: 0 10px;
  height: 32px;
  width: 32px;
}
.group-head i {
  cursor: pointer;
}
.group-head i:hover {
  color: #5cb6ff;
}
.group-head {
  height: 50px;
  line-height: 50px;
}
.group-contentlist {
  padding-bottom: 0 !important;
}
.contentlist-item {
  position: relative;
}
.el-dialog__wrapper >>> .el-dialog__body {
  padding: 0;
}
.el-dialog__wrapper >>> .detail-body {
  height: calc(95vh - 100px);
}
.item-title {
  display: flex;
  justify-content: space-between;
}
.list-item-head .el-dropdown {
  display: none;
}
.list-item-head:hover .el-dropdown {
  display: block;
}
.item-title .item-edit {
  display: none;
}
.item:hover .item-edit {
  display: block;
}
.item-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.subtasknumber{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 3px 5px;
  background: rgba(9, 30, 66, 0.04);
}
.item-subtask{
  padding: 0 5px;
}
.subtasknumber>>>svg{
  width: 16px;
  height: 16px;
}
.subtasknumber>span{
  margin: 0 2px;
}
.item-status>>>svg{
  width: 18px;
  height: 18px;
}
.statusCategoryId{
  box-sizing: border-box;
  font-size: 12px;
}
.item-time>>>svg{
  width: 16px;
  height: 16px;
}
.item-time.overtime>>>svg{
  color:#DE350B;
}
.item-time{
  display: flex;
  align-items: center;
  font-size: 12px;
  background-color: #F4F5F7;
  padding: 2px;
  width: 85px;
  border-radius: 4px;
  margin: 8px 0;
}
.item-parent{
  background-color: #F4F5F7;
  padding: 2px;
  border-radius: 4px;
  display: inline-block;
}
.item-time.overtime{
  background-color: #FFEBE6 !important;
}
.item:hover .item-time{
  background-color:  transparent;
}
.item:hover .item-parent{
  background-color:  transparent;
}
.item-footer img{
  width: 18px;
}
</style>