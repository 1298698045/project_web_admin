<template>
  <div class="top-nav">
    <div class="Appswitcher">
      <div title="切换到">
        <el-popover
        v-model="changeproject"
    placement="bottom"
    width="200"
    trigger="click"
    >
    <div class="switchercontainer">
      <div class="switcher-head">切换到</div>
      <div class="switcher-body">
        <a style="text-decoration:none" @click="tooa" >
        <div class="switcher-item" >
          <div class="switcher-img">
            <img src="/static/img/svg/renwuguanli.svg" alt="">
          </div>
          <div>OA系统</div>
        </div>
         </a>
          <router-link tag="div" to="/work" >
        <div class="switcher-item" @click="projectname='renwuguanli'">
          <div class="switcher-img">
            <img src="/static/img/svg/renwuguanli.svg" alt="">
          </div>
          <div>任务管理</div>
        </div>
          </router-link>

          <router-link  tag="div" to="/knowledgebase/index">

        <div class="switcher-item" @click="projectname='zhishiku'">
          <div  class="switcher-img">
            <img src="/static/img/svg/zhishiku.svg" alt="">
          </div>
          <div>知识库</div>

        </div>
          </router-link>

      </div>
    </div>
        <icon slot="reference" name="menu" />
  </el-popover>

      </div>
    </div>
    <div class="main-logo">
      <router-link tag="div" to="/work" v-if="projectname=='renwuguanli'">
        <img src="@/assets/logo.png" alt="" />Home
      </router-link>
      <router-link tag="div" to="/knowledgebase/index" v-else>
        <img src="@/assets/logo.png" alt="" />Home
      </router-link>
    </div>
    <el-menu
      ref="topnav"
      menu-trigger="click"
      mode="horizontal"
      @open="openmenu"
      :default-active="activeIndex"
      :unique-opened="true"
      class="el-menu-demo"
    >
      <el-submenu v-if="projectname=='renwuguanli'" index="work">
        <template slot="title">我的工作台</template>
        <el-menu-item index="work" class="hiddenitem"></el-menu-item>
        <div class="nav-popup-container">
          <div class="nav-popup-container-head">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="已分配给我" name="first"> </el-tab-pane>
              <el-tab-pane label="最近" name="second"> </el-tab-pane>
              <div class="nav-popup-container-body">
                <div class="nav-popup-group" v-for="i in 3" :key="i">
                  <div class="nav-popup-group-title">正在进行</div>
                  <div class="nav-popup-group-main">
                    <div class="nav-popup-item" v-for="i in 3" :key="i">
                      <router-link
                        style="display: flex"
                        tag="div"
                        to="/projects/board/王小虎?id=132"
                      >
                        <div class="nav-popup-item-left">
                          <img src="/static/img/svg/viewavatar.svg" alt="" />
                        </div>
                        <div class="nav-popup-item-right">
                          <div class="nav-popup-item-title">需求讨论</div>
                          <div class="nav-popup-item-project">OA1-4 · OA1</div>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </el-tabs>
          </div>
          <div class="nav-popup-container-footer">
            <router-link tag="div" to="/mytask">我的事务</router-link>
          </div>
          <div class="nav-popup-container-footer">
            <router-link tag="div" to="/mycalendar">个人日历</router-link>
          </div>
          <div class="nav-popup-container-footer">
            <router-link tag="div" to="/daily">日报</router-link>
          </div>
          <div class="nav-popup-container-footer">
            <router-link tag="div" to="/">转到"您的工作"页面</router-link>
          </div>
        </div>
      </el-submenu>
      <el-submenu v-if="projectname=='renwuguanli'" index="projects">
        <template slot="title">项目</template>
        <el-menu-item index="projects" class="hiddenitem"></el-menu-item>
        <div class="nav-popup-container">
          <div class="nav-popup-container-head">
            <div class="nav-popup-container-body">
              <div class="nav-popup-group" >
                <div class="nav-popup-group-title">最近使用</div>
                <div class="nav-popup-group-main">
                  <div class="nav-popup-item" @click="reload()" v-for="item in projectlatestdata" :key="item.id">
                    <router-link
                      style="display: flex"
                      tag="div"
                      :to="'/projects/board/'+item.Name+'?id='+item.ProjectId"
                    >
                      <div class="nav-popup-item-left">
                        <img :src="item.AvatarUrl" alt="" />
                      </div>
                      <div class="nav-popup-item-right">
                        <div class="nav-popup-item-title">{{item.Name}}</div>
                        <div class="nav-popup-item-project">{{item.ProjectType}}</div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="nav-popup-container-footer">
            <router-link tag="div" to="/projects/list"
              >查看所有项目</router-link
            >
          </div>
          <div class="nav-popup-container-footer">
            <div @click="createdproject">创建项目</div>
          </div>
        </div>
      </el-submenu>
      <el-submenu v-if="projectname=='renwuguanli'" index="filter">
        <template slot="title">筛选器</template>
        <el-menu-item index="filter" class="hiddenitem"></el-menu-item>
        <div class="nav-popup-container-body filterbody">
          <div class="nav-popup-group">
            <div class="nav-popup-group-title">已标星</div>
            <div class="nav-popup-group-main">
              <div class="nav-popup-item" v-for="i in 3" :key="i">
                <router-link
                  style="display: flex"
                  tag="div"
                  to="/projects/board/王小虎?id=132"
                >
                  <div class="nav-popup-item-left">
                    <img src="/static/img/svg/filter.svg" alt="" />
                  </div>
                  <div class="nav-popup-item-right">
                    <div class="nav-popup-item-title">
                      <span>需求讨论</span>
                      <i class="el-icon-star-on"></i>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="nav-popup-group">
            <div class="nav-popup-group-title">最近使用</div>
            <div class="nav-popup-group-main">
              <div class="nav-popup-item" v-for="i in 3" :key="i">
                <router-link
                  style="display: flex"
                  tag="div"
                  to="/projects/board/王小虎?id=132"
                >
                  <div class="nav-popup-item-left">
                    <img src="/static/img/svg/filter.svg" alt="" />
                  </div>
                  <div class="nav-popup-item-right">
                    <div class="nav-popup-item-title">
                      <span>需求讨论</span>
                      <i class="el-icon-star-off"></i>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="nav-popup-container-footer">
          <router-link tag="div" to="/filter/list">查看所有筛选器</router-link>
        </div>
        <div class="nav-popup-container-footer">
          <router-link tag="div" to="/filter/filter/1"
            >高级事务搜索</router-link
          >
        </div>
      </el-submenu>
      <!-- <el-submenu index="4">
        <template slot="title">仪表板</template>
        <el-menu-item index="4-1">1</el-menu-item>
      </el-submenu> -->
      <el-menu-item v-if="projectname=='zhishiku'" index="knowledgebase">
        <router-link
            tag="div"
            to="/knowledgebase/index"
          >
          主页
          </router-link>
      </el-menu-item>
      <el-menu-item v-if="projectname=='zhishiku'" index="space">
        <router-link
            tag="div"
            to="/knowledgebase/space"
          >
          空间
          </router-link>
      </el-menu-item>
      <el-submenu index="personnel">
        <template slot="title">人员</template>
        <el-menu-item index="personnel" class="hiddenitem"></el-menu-item>
        <div class="nav-popup-container-body filterbody">
          <div class="nav-popup-group">
            <div class="nav-popup-group-title">您的协作者</div>
            <div class="nav-popup-group-main">
              <div class="nav-popup-item" v-for="i in 3" :key="i">
                <router-link
                  class="navrouteritem"
                  tag="div"
                  to="/projects/board/王小虎?id=132"
                >
                  <div class="nav-popup-item-left">
                    <Userhead />
                  </div>
                  <div class="nav-popup-item-right">
                    <div class="nav-popup-item-title">
                      <span>撒兴瑞</span>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="nav-popup-group">
            <div class="nav-popup-group-title">您的团队</div>
            <div class="nav-popup-group-main">
              <div class="nav-popup-item" v-for="i in 3" :key="i">
                <router-link
                  class="navrouteritem"
                  tag="div"
                  to="/team/teamdetail"
                >
                  <div class="nav-popup-item-left">
                    <img src="/static/img/svg/team1.svg" alt="" />
                  </div>
                  <div class="nav-popup-item-right">
                    <div class="nav-popup-item-title">
                      <span>团队1</span>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="nav-popup-container-footer">
          <div @click="newteam">创建团队</div>
        </div>
        <div class="nav-popup-container-footer">
          <router-link tag="div" to="/team/teamsearch"
            >搜索人员和团队</router-link
          >
        </div>
      </el-submenu>
      <el-menu-item v-if="projectname=='zhishiku'" index="articletemplate">
        <router-link
            tag="div"
            to="/knowledgebase/articletemplate"
          >
          模板
          </router-link>
      </el-menu-item>
    </el-menu>
    <div v-if="projectname=='renwuguanli'" style="margin-left: 10px">
      <el-button type="primary" class="newwork" size="small" @click="newwork"
        >创建</el-button
      >
    </div>
    <div v-if="projectname=='zhishiku'" style="margin-left: 10px">
      <el-button type="primary" class="newwork" size="small" @click="newarticle"
        >创建</el-button
      >
    </div>
    <div class="top-nav-btns">
      <mynotice class="top-nav-btn"></mynotice>
      <router-link
        class="top-nav-btn el-icon-s-tools"
        tag="div"
        to="/seeting/tasksettings"
      >
      </router-link>
      <!-- <el-popover
                    popper-class="topnavpopup"
                    placement="bottom"
                    title=""
                    width="240"
                    trigger="click">
                    <div class="nav-popup-container-body filterbody">
                            <div class="nav-popup-group">
                                <div class="nav-popup-group-title">系统设置</div>
                                <div class="nav-popup-group-main">
                                    <div class="nav-popup-item">
                                     <router-link style="display:flex" tag="div" to="/projects/board/王小虎?id=132">
                                        <div class="nav-popup-item-right">
                                            <div class="nav-popup-item-title">
                                                <span>系统</span>
                                            </div>
                                        </div>
                                    </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="top-nav-btn el-icon-s-tools" slot="reference"></div>
                </el-popover> -->
      <el-dropdown trigger="click" @command="userhandleCommand">
        <div class="top-nav-btn usercontainer">
          <Userhead />
        </div>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item
            ><router-link
              style="display: flex"
              tag="div"
              to="/people/information"
            >
              个人资料
            </router-link></el-dropdown-item
          >
          <el-dropdown-item
            ><router-link style="display: flex" tag="div" to="/seeting/user">
              账户设置
            </router-link></el-dropdown-item
          >
          <el-dropdown-item command='logoff' divided >
              注销
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      :append-to-body="true"
      :show-close="false"
      :visible.sync="newworkdialog"
      :close-on-click-modal="false"
      width="55%"
      top="5vh"
    >
      <newworkpopup v-if="newworkdialog" @close="newworkdialog = false" @created="createdindex++"></newworkpopup>
    </el-dialog>
    <el-dialog
      :append-to-body="true"
      :show-close="false"
      :visible.sync="newteamdialog"
      width="55%"
      top="10vh"
    >
      <newteampopup ></newteampopup>
    </el-dialog>
  </div>
</template>
<script>
import Userhead from "../../../components/Userheadphoto.vue";
import newworkpopup from "@/alert/newwork.vue";
import newteampopup from "@/alert/newteam.vue";
import icon from "@/icon/icon.vue";
import mynotice from "@/components/popup/mynotice.vue";
import {removeToken} from '@/utils/auth.js'
import {logout} from '@/api/article.js'
import {projectlatestgetlist} from '@/api/projectapi.js'

export default {
  data() {
    return {
      createdindex:0,
      changeproject:false,
      activeName: "first",
      menuIndex: "",
      newworkdialog: false,
      newteamdialog: false,
      projectname:'',
      projectlatestdata:[]
    };
  },
  inject:['reload'],
  components: {
    Userhead,
    newworkpopup,
    newteampopup,
    icon,
    mynotice
  },
  computed: {
    activeIndex() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeTopNav) {
        return meta.activeTopNav;
      }
      return path;
    },
  },
  watch: {
    newworkdialog(){
      console.log(this.newworkdialog)
      if(this.createdindex>0){
        this.reload()
      }
    },
    $route(to, from) {
      this.$refs.topnav.close(from.meta.activeTopNav);
      this.$refs.topnav.close(to.meta.activeTopNav);
      this.menuIndex = "";
      this.changeproject = false

    },
    projectname(){
      this.$emit('projectnamechange',this.projectname)
    }
  },
  methods: {
    getnavdata(){
      projectlatestgetlist().then((res)=>{
        this.projectlatestdata = res.actions[0].returnValue.Data
      })
    },
    userhandleCommand(command){
      if(command=='logoff'){
        logout().then(()=>{
          removeToken()
          this.$router.push('/login')
        })
        removeToken()
          this.$router.push('/login')
      }
    },
    newteam() {
      this.newteamdialog = true;
    },
    newwork() {
      this.newworkdialog = true;
    },
    createdproject() {
      this.$parent.showpopup = true;
      this.$refs.topnav.close("projects");
    },
    handleClick() {},
    handleSelect(key, keyPath) {},
    handleclick() {},
    openmenu(index, indexPath) {
      setTimeout(() => {
        this.menuIndex = index;
      }, 0);
    },
    tooa(){
      window.location.href="/home/home.aspx?tsid=02u90000001&pageName=oa"
    }
  },
  created() {
    this.changeproject = false
    if(this.$route.matched[0].path=='/knowledgebase'){
      this.projectname = 'zhishiku'
    }else{
      this.projectname = 'renwuguanli'
    }
    document.addEventListener("click", () => {
      if (this.menuIndex != "") {
        this.$refs.topnav.close(this.menuIndex);
      }
      this.menuIndex = "";
    });
    this.getnavdata()
    },
  newarticle(){

  },
};
</script>

<style>
#myCanvas {
  position: absolute;
  top: 100px;
  width: 500px;
  height: 300px;
  left: 500px;
  z-index: 999999999;
}
.top-nav {
  height: 56px;
  line-height: 56px;
  padding: 0 12px;
  box-shadow: 2px 2px 2px #ddd;
}
.top-nav > * {
  float: left;
  height: 56px;
  line-height: 56px;
}
.el-menu-demo {
  margin-left: 20px;
}
.Appswitcher{
  display: flex;
    align-items: center;
}
.Appswitcher,
.main-logo {
  margin-right: 10px;
}
.main-logo>div{
  display: flex;
    align-items: center;
}
.Appswitcher > div {
  border-radius: 50%;
  cursor: pointer;
  color: #333;
  display: inline-block;
  padding: 5px;
}
.Appswitcher i {
  font-size: 16px;
}
.Appswitcher > div:hover {
  color: rgb(0, 82, 204);
  background-color: rgba(222, 235, 255, 0.9);
}
.el-menu--horizontal > .el-menu-item,
.el-menu--horizontal > .el-submenu {
  height: 56px;
  line-height: 56px;
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 56px !important;
  line-height: 56px !important;
}
.main-logo {
  cursor: pointer;
}
.main-logo img {
  width: 25px;
  position: relative;
  margin-right: 5px;
}
.el-menu-item,.el-submenu {
  padding: 0 10px;
}
.el-menu.el-menu--horizontal {
  border: 0;
}
.el-submenu__title {
  padding: 0;
}
.top-nav-btns {
  float: right;
  font-size: 20px;
  color: rgb(23, 43, 77);
  display: flex;
  align-items: center;
}
.top-nav-btn {
  height: 36px;
  width: 36px;
  line-height: 36px !important;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 8px;
      display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
}
.top-nav-btn:hover {
  color: rgb(0, 82, 204);
  background-color: rgba(222, 235, 255, 0.9);
}
.usercontainer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.usercontainer .item-img {
  line-height: 32px;
}
.nav-popup-container-head .el-tabs__item {
  font-size: 12px;
  padding: 0 10px;
}
.el-menu--horizontal .el-tabs__header {
  margin-bottom: 0;
  padding: 0 20px;
}
.el-menu--horizontal .nav-popup-container-body {
  max-height: 300px;
  overflow: auto;
  /* border-bottom: 2px solid #ececec; */
}
.nav-popup-item {
  display: flex;
  align-items: center;
  padding: 8px 20px;
  cursor: pointer;
  width: 240px;
}
.nav-popup-item:hover {
  background-color: #f2f2f2;
}
.nav-popup-group-title {
  padding: 10px 20px 5px 20px;
}
.nav-popup-item-right {
  margin-left: 10px;
  font-size: 12px;
}
.nav-popup-item-left{
  display: flex;
  justify-content: center;
}
.nav-popup-item-left img {
  width: 24px;
  height: 24px;
}
.nav-popup-item-project {
  color: #666;
}
.nav-popup-container-footer {
  padding: 10px 20px;
  border-radius: 0 0 4px 4px;
}
.nav-popup-container-footer:hover {
  background-color: #f2f2f2;
  cursor: pointer;
}
.nav-popup-container-footer + .nav-popup-container-footer {
  border-top: 1px solid #dedede;
}
.hiddenitem {
  display: none;
}
.filterbody .nav-popup-item-title {
  font-size: 14px;
  line-height: 28px;
}
.nav-popup-item-right {
  flex: 1;
}
.filterbody .nav-popup-item-title {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}
.nav-popup-item-title{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
.filterbody .el-icon-star-on {
  color: rgb(255, 171, 0);
}
.filterbody .el-icon-star-on:hover {
  color: #e6a23c;
}
.nav-popup-item > div {
  flex: 1;
  align-items: center;
}
.filterbody .el-icon-star-off {
  color: #999;
}
.filterbody .el-icon-star-off:hover {
  color: #333;
}
.topnavpopup {
  padding: 10px 0 !important;
}
.topnavpopup .nav-popup-item {
  box-sizing: border-box;
}
.topnavpopup .nav-popup-item-right {
  margin-left: 0;
}
.nav-popup-container-footer {
  border-top: 2px solid #f5f3f3;
}
.topnavpopup .nav-popup-container-footer {
  padding-left: 22px;
}
.navrouteritem {
  display: flex;
  align-items: center;
}
.switcher-body{
  padding: 5px;
}
.switcher-img{
  width: 32px;
  height: 32px;
  border-radius: 8px;
  box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 13%) 0px 0px 1px 1px;
  background-color: rgb(0, 82, 204);
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.switcher-img img{
  width: 24px;
}
.switcher-head{
  font-size: 16px;
  font-weight: 600;
  padding: 10px;
  color: #172B4D;
}
.switcher-item{
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  color: rgb(9, 30, 66);
}
.switcher-item:hover{
  background: #f2f2f2;
}
</style>

