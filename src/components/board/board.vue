<template>
  <div>
    <draggable
      handle=".list-item-head"
      class="contentlist"
      v-model="boarddata"
      group="content"
      animation="300"
      dragClass="dragClass"
      ghostClass="ghostClass"
      chosenClass="chosenClass"
      @start="onStart"
      @end="onEnd"
      :move="onMove"
    >
      <div
        :class="{ active: activecontent == index,'maxIssueCountlist':content.Tasks.length>content.maxIssueCount }"
        class="contentlist-item group-contentlist"
        v-for="(content, index) in boarddata"
        :key="index"
      >
        <div class="list-item-head">
          <div
            @click="editname(content, index)"
            v-show="!content.editname"
            class="list-item-name"
          >
          <span>{{ content.Name }}</span>
          <span v-if="content.Tasks.length>0">
            {{content.Tasks.length}}
            事务数
          </span>
          <span v-if="content.Tasks.length>content.maxIssueCount" 
            class="maxIssueCount">
            最大值
            {{content.maxIssueCount}}
          </span>
          </div>
          <div class="list-item-name-edit" 
          v-show="content.editname">
            <input
              v-model="content.Name"
              ref="editnameinput"
              @keydown.stop="(e) => finisheditname(e, content)"
              @blur="(e) => finisheditname(27, content)"
            />
          </div>
          <el-dropdown
            v-show="!content.editname"
            @command="(command) => listhandleCommand(command, content)"
          >
            <span class="el-dropdown-link list-item-btn">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="delete" v-if="$store.boardpermissions.find((item)=>{return item=='EDIT_BOARD_CONFIG'})">删除</el-dropdown-item>
              <el-dropdown-item command="setmaxIssueCount" v-if="$store.boardpermissions.find((item)=>{return item=='EDIT_BOARD_CONFIG'})">设置最大事务数</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
            
        <div v-if="grouptype=='无'" class="list-item-body" :class="{'edit':content.edit}">
        
        <itemdraggale 
        :goupname="goupname"
        :listid="content.ListId"
        :statusId="content.status[0].id"
        @reloadlist="reloadlist"
        :content="content.Tasks">
        </itemdraggale>
            <!-- :style="{'top':content.Tasks.length*85+10+'px'}" -->
          <div
            v-if="$store.boardpermissions.find((item)=>{return item=='CREATE_ISSUE'})"
            v-show="!content.edit&&!drag"
            class="newitem-btn"
            @click.stop="newitem(content, index)"
          >
            <i class="el-icon-plus"></i>
            创建事务
          </div>
            <!-- :style="{'top':content.Tasks.length*85+10+'px'}" -->

          <div class="edit-box" 
          v-show="content.edit">
            <textarea
            v-model="newlistitemtitle"
              ref="newitemtextarea"
              rows="2"
              @keydown="(e) => finishedit(e, content)"
              @keydown.13.stop.prevent="(e) => finishedit(e, content)"
              @blur="(e) => finishedit(27, content)"
            ></textarea>
            <div class="editbox-foot" @mousedown.stop.prevent="footclick">
              <img src="/static/img/svg/viewavatar.svg" alt="" />
              <i class="el-icon-arrow-down"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="newlist-btn" @click="newlist" v-if="$store.boardpermissions.find((item)=>{return item=='EDIT_BOARD_CONFIG'})">
        <i class="el-icon-plus"></i>
      </div>
    </draggable>
    <div v-if="grouptype!='无'">
    <div v-for="(group,groupindex) in grouplistformat(grouplist,grouptype)" :key="group.ListId">
        <div class="group-head-box" tabindex="0" @click="showgroup(group)">
          <div class="group-head">
                  <i class="el-icon-arrow-down" v-if="group.show"></i>
                  <i class="el-icon-arrow-up"  v-if="!group.show"></i>
                  <Userhead :height="'32px'" :width="'32px'" :url="false" v-if="grouptype=='被分配人'"/>
                  {{ group.name }}
          </div>
        </div>
      
      <div class="contentlist" v-if="group.show">
        <div
          :class="{ 'active': activecontent == groupindex*boarddata.length+index,'edit': activecontent == groupindex*boarddata.length+index&&content.edit}"
          class="contentlist-item"
          v-for="(content, index) in boarddata"
          :key="index"
        >
        <itemdraggale 
        :listid="content.ListId"
        :groupid="group.id"
        :statusId="content.status[0].id"
        :goupname="goupname"
        @reloadlist="reloadlist"
        :content="activecontentlist(content.Tasks,group.id)" 
        :group="group" 
        :groupindex="groupindex">
        </itemdraggale>
        <!-- :style="{'top':activecontentlist(content.Tasks,group.id).length*85+10+'px'}" -->
        <div
            v-if="$store.boardpermissions.find((item)=>{return item=='CREATE_ISSUE'})"
            v-show="!content.edit&&!drag"
            class="newitem-btn"
            @click.stop="newitem(content,groupindex*boarddata.length +index)"
          >
            <i class="el-icon-plus"></i>
            创建事务
          </div>
          <!-- :style="{'top':activecontentlist(content.Tasks,group.id).length*85+10+'px'}" -->

          <div class="edit-box" 
            v-show="content.edit&&activecontent==groupindex*boarddata.length +index">
            <textarea
              ref="newitemtextarea"
            v-model="newlistitemtitle"

              rows="2"
              @keydown="(e) => finishedit(e, content,group)"
              @keydown.13.stop.prevent="(e) => finishedit(e, content)"
              @blur="(e) => finishedit(27, content,group)"
            ></textarea>
            <div class="editbox-foot" @mousedown.stop.prevent="footclick">
              <img src="/static/img/svg/viewavatar.svg" alt="" />
              <i class="el-icon-arrow-down"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    <el-dialog title="添加长篇故事" :visible.sync="longstorydialog" width="40%" top="10vh">
        <longstory></longstory>
    </el-dialog>
    <el-dialog title="添加标签" :visible.sync="tagdialog" width="40%" top="10vh">
        <addtag></addtag>
    </el-dialog>
    <Columnlimit v-model="showsetmaxIssueCount"/>
    
  </div>
</template>

<script>
import draggable from "vuedraggable"
import Userhead from "../Userheadphoto.vue"
import longstory from "@/alert/addLongstory.vue"
import addtag from "@/alert/addtag.vue"
import Columnlimit from "@/alert/Columnlimit.vue"
import itemdraggale from "./itemdraggale.vue"

export default {
  components: {
    draggable,
    Userhead,
    itemdraggale,
    longstory,
    addtag,
    Columnlimit
  },
  data() {
    return {
      newlistitemtitle:'',
      activecontent: 0,
      drag: false,
      detailitem:null,
      longstorydialog:null,
      tagdialog:null,
      throttlemessage:false,
      canmove:false,
      showsetmaxIssueCount:false
      //列表操作
    };
  },
  watch:{
    // listdata:{
    //   handler(a,b){
    //     this.boarddata = this.listdata
    //   },
    //   deep:true,
    // }
  },
  props:['listdata','grouplist','grouptype'],
  created(){
    // this.boarddata = this.listdata
  },
  computed: {
    boarddata:{
      get(){
        return this.listdata
      },
      set(){}
    },
    goupname(){
      return this.grouplist.find((item)=>{
        return item.label==this.grouptype
      }).name
    },
    grouplistformat(){
      return (list, key) => {
        if (list) {
          const arr = list.find((item) => {
            return item.label == key;
          })
          return arr.list;
        }
      };
    },
    activecontentlist() {
      return (list, key) => {
        const name = this.grouplist.find(item=>item.label==this.grouptype).name
        if (list) {
          return list.filter((item) => {
            return item[name] == key;
          });
        } else {
          return list;
        }
      };
    },
  },
  methods: {
    //开始拖拽事件
    onStart() {
      this.drag = true;
    },
    onMove(){
      this.canmove = true
      if(!this.$store.boardpermissions.find((item)=>{return item =='EDIT_BOARD_CONFIG'})){
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
    },
    //拖拽结束事件
    onEnd() {
      if(!this.canmove){
        return false
      }
      this.drag = false;
    },
    //新建事务
    newitem(item, index) {
      this.activecontent = index;
      this.$set(item, "edit", true);
      setTimeout(() => {
        this.$refs.newitemtextarea[index].focus();
      }, 0);
    },
    finishedit(e, item,group) {
      if (e == 27) {
        if (this.newlistitemtitle != "") {
            this.savetask(item.ListId,group)
        }
        item.edit = false;
      } else {
        if (e.keyCode == 27) {
          item.edit = false;
          this.newlistitemtitle = "";
        } else if (e.keyCode == 13 && this.newlistitemtitle != "") {
          this.savetask(item.ListId,group)
          item.edit = false;
        }
      }
    },
    savetask(ListId,group){
      this.$emit('savetask',{
        fields:{
          Subject:this.newlistitemtitle,
          ListId:{Id:ListId}
        }
      },group)
      this.newlistitemtitle = "";
    },
    savelist(Name,id){
      this.$emit('savelist',{
        fields:{Name:Name},
        id:id
      })
    },
    //重命名
    editname(item, index, type) {
      this.$set(item, "editname", true);
      // setTimeout(() => {
      //   this.$refs.editnameinput[index].focus();
      // }, 0);
    },
    finisheditname(e, item) {
      if ((e.keyCode == 13||e==27)&&item.Name!='') {
        if(item.editname){
          item.editname = false;
          item.newlist = false; 
          this.savelist(item.Name)
        }
      }
      if (item.newlist) {
        if(e==27&&item.Name==''){
            this.boarddata.pop();
        }
        else if (e.keyCode == 27) {
          item.editname = false;
          item.newlist = false;
            this.boarddata.pop();
        }
      } else {
        if (e.keyCode == 27 ) {
          item.editname = false;
        }
      }
    },
    
    //新建列表
    newlist() {
      this.boarddata.push({
        Name:'',
        editname: true,
        newlist: true,
        Tasks:[]
      });
      setTimeout(() => {
        this.$refs.editnameinput[this.$refs.editnameinput.length - 1].focus();
        document.querySelector(".main-container>div>.container").scrollLeft += 100;
      }, 0);
    },
    showgroup(item){
        console.log(item)
        item.show = !item.show
    },
    handleCommand(command, item) {
        console.log(command);
        console.log(item);
    },
    listhandleCommand(command, item) {
      if(command=='delete'){
        this.deletelist(item.ListId)
      }
      if(command=='setmaxIssueCount'){
        this.showsetmaxIssueCount = true
      }
    },
    deletelist(id){
      this.$emit('deletelist',id)
    },
    reloadlist(){
      this.$emit('reloadlist')
    }
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
.contentlist-item.edit{
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
.item-footer {
  color: #666;
  margin-top: 12px;
  overflow: hidden;
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
.list-item-body{
  position: relative;
  height: calc(100% - 45px);
  padding-bottom: 60px;
}
.list-item-body.edit{
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.group-head-box{
  position: sticky;
  top: 45px;
  z-index: 1;
  cursor: pointer;
  background-color: #fff;
}
.main-container-body>div>div.contentlist{
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: white;
}
.group-head:focus {
    box-shadow: rgb(76 154 255) 0px 0px 0px 2px inset;
    outline: none;
}
.group-head >div{
    line-height: 32px;
    margin: 0 10px;
    height: 32px;
    width: 32px;
}
.group-head i{
    cursor: pointer;
}
.group-head i:hover{
    color: #5cb6ff;
}
.group-head{
    height: 50px;
    line-height: 50px;
}
.group-contentlist{
  padding-bottom: 0 !important;
}
.contentlist-item{
  position: relative;
}
.el-dialog__wrapper>>>.el-dialog__body{
  padding: 0;
}
.el-dialog__wrapper>>>.detail-body{
      height: calc(95vh - 200px);
}
.item-title{
  display: flex;
  justify-content: space-between;
}
.list-item-head .el-dropdown{
  display: none;
}
.list-item-head:hover .el-dropdown{
  display: block;
}
.item-title .item-edit{
  display: none;
}
.item:hover .item-edit{
  display: block;
}
.list-item-name{
  color: #666;
  font-size: 12px;
}
.maxIssueCount{
  margin-left: 5px;
  background-color: rgb(226,138,0);
  color: #000;
  padding: 2px;
  border-radius: 4px;
  font-weight: 700;
}
.maxIssueCountlist{
  background-color: rgb(246,227,130);
}
.maxIssueCountlist .list-item-head{
  background-color: rgb(246,227,130);
}
</style>