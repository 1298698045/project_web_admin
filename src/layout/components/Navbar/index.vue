<template>
  <div class="navbar">
    <div class="navbar-head" v-if="!onlyleftNavbarchildren">
      <div class="head-left-logo">
        <img :src="project.AvatarUrl" alt="" />
      </div>
      <div class="head-right">
        <div class="head-right-name">{{$route.params.projectname}}</div>
        <div class="head-right-describe" >{{project.ProjectType}}</div>
      </div>
    </div>
    <div
      class="navbar-body"
      :class="{ onlyleftNavbarchildren: onlyleftNavbarchildren }"
    >
      <div v-if="!childrennav && !onlyleftNavbarchildren">
        <el-menu
          v-if="projectname == 'renwuguanli'"
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="abstract">
            <span slot="title"
              ><router-link tag="div" :to="'/projects/abstract/'+torouterurl">
                <div class="iconcontainer">
                  <icon name="zhaiyao" class="icon" />
                  <span>摘要</span>
                </div>
              </router-link></span
            >
          </el-menu-item>
          <el-menu-item index="board">
            <span slot="title"
              ><router-link tag="div" :to="'/projects/board/' + torouterurl">
                <div class="iconcontainer">
                  <icon name="mianban" class="icon" />
                  <span>面板</span>
                </div>
              </router-link></span
            >
          </el-menu-item>
          <el-menu-item index="worklist">
            <span slot="title"
              ><router-link tag="div" :to="'/projects/worklist/' + torouterurl">
                <div class="iconcontainer">
                  <icon name="liebiao" class="icon" />
                  <span>列表</span>
                </div>
              </router-link></span
            >
          </el-menu-item>
          <el-menu-item index="ganttchart">
            <span slot="title">
              <router-link tag="div" :to="'/projects/ganttchart/' + torouterurl">
                <div class="iconcontainer">
                  <icon name="luxiantu" class="icon" />
                  <span>路线图</span>
                </div>
              </router-link></span
            >
          </el-menu-item>
          <el-menu-item index="calendar">
            <span slot="title">
              <router-link tag="div" :to="'/projects/calendar/' + torouterurl"
                ><div class="iconcontainer">
                  <icon name="rili" class="icon" />
                  <span>日历</span>
                </div></router-link
              ></span
            >
          </el-menu-item>
          <el-menu-item index="filter" @click="childrennav = 'projectsfilter'">
            <span slot="title">
              <router-link
                v-if="activeIndex != 'filter'"
                class="routerlink"
                tag="div"
                :to="
                  '/projects/filter/' +this.$route.params.projectname +'/firstfilterid?id=' +this.$route.query.id
                "
              >
                <div class="lefticon">
                  <div class="iconcontainer">
                    <icon name="shiwu" class="icon" />
                    <span>事务</span>
                  </div>
                </div>
                <div class="righticon">
                  <i class="el-icon-right"></i>
                </div>
              </router-link>
              <div v-else class="routerlink">
                <div class="lefticon">
                  <i class="el-icon-menu"></i>
                  <span>事务</span>
                </div>
                <div class="righticon">
                  <i class="el-icon-right"></i>
                </div>
              </div>
              
            </span>
          </el-menu-item>
          <el-menu-item index="file">
            <span slot="title">
              <router-link tag="div" :to="'/projects/file/' + torouterurl"
                ><div class="iconcontainer">
                  <icon name="file" class="icon" />
                  <span>文件</span>
                </div></router-link
              ></span
            >
          </el-menu-item>
          <el-menu-item index="seeting" @click="childrennav = 'seeting'">
            <span slot="title">
              <router-link
                v-if="activeIndex != 'seeting'"
                class="routerlink"
                tag="div"
                :to="'/projects/seeting/' + torouterurl"
              >
                <div class="lefticon">
                  <div class="iconcontainer">
                    <icon name="shezhi" class="icon" />
                    <span>项目设置</span>
                  </div>
                </div>
                <div class="righticon">
                  <i class="el-icon-right"></i>
                </div>
              </router-link>
              <div v-else class="routerlink">
                <div class="lefticon">
                  <i class="el-icon-setting"></i>
                  <span>项目设置</span>
                </div>
                <div class="righticon">
                  <i class="el-icon-right"></i>
                </div>
              </div>
            </span>
          </el-menu-item>
        </el-menu>

        <el-menu
          v-if="projectname == 'zhishiku'"
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
        >
          <el-menu-item @click="spaceblog = false" index="abstract">
            <span slot="title">
              <router-link
                tag="div"
                to="/knowledgebase/spacedetail/spacesummary"
              >
                <div class="iconcontainer">
                  <icon name="gaishu" class="icon" />
                  <span>概述</span>
                </div>
              </router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="spaceblog" @click="spaceblog = true">
            <span slot="title">
              <div class="iconcontainer">
                <div class="trcontainer">
                  <div>
                    <icon name="boke" class="icon" />
                    <span>博客</span>
                  </div>
                  <div>
                    <icon
                      name="add"
                      class="icon editicon svgiconbtn navsvgiconbtn"
                    />
                  </div>
                </div></div
            ></span>
          </el-menu-item>
          <div class="page-list" v-if="spaceblog">
            <el-tree
              :expand-on-click-node="false"
              :data="pagelist"
              node-key="id"
              draggable
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
              </span>
            </el-tree>
          </div>
          <el-menu-item
            index="spaceseeting"
            @click="
              childrennav = 'spaceseeting';
              spaceblog = false;
            "
          >
            <span slot="title">
              <router-link
                v-if="activeIndex != 'spaceseeting'"
                class="routerlink"
                tag="div"
                to="/knowledgebase/spacedetail/seetinginformation"
              >
                <div class="lefticon">
                  <div class="iconcontainer">
                    <icon name="shezhi" class="icon" />
                    <span>空间设置</span>
                  </div>
                </div>
                <div class="righticon">
                  <i class="el-icon-right"></i>
                </div>
              </router-link>
              <div v-else class="routerlink">
                <div class="lefticon">
                  <i class="el-icon-setting"></i>
                  <span>空间设置</span>
                </div>
                <div class="righticon">
                  <i class="el-icon-right"></i>
                </div>
              </div>
            </span>
          </el-menu-item>

          <div class="menu-item-des">
            <div>空间的快捷方式</div>
            <div class="svgiconbtn" @click="edittspaceshortcuts = true">
              <icon name="bianji"> </icon>
            </div>
          </div>
          <el-menu-item
            v-for="i in 2"
            :key="i"
            @click="spaceblog = false"
            :index="i"
          >
            <div class="menu-item-Shortcut">
              <div class="addShortcut">
                <icon name="kuaijiefangshi"> </icon>
                <span>快捷方式1</span>
              </div>
            </div>
          </el-menu-item>

          <div @click="spaceblog = false" class="menu-item-Shortcut">
            <div class="addShortcut" @click="edittspaceshortcuts = true">
              <icon name="add"> </icon>
              <span>添加快捷方式</span>
            </div>
          </div>

          <el-menu-item @click="spaceblog = false" index="spacepage">
            <span slot="title">
              <router-link tag="div" to="/knowledgebase/spacedetail/pagelist">
                <div class="iconcontainer">
                  <div class="trcontainer">
                    <div>
                      <icon name="yemian" class="icon" />
                      <span>页面</span>
                    </div>
                    <div>
                      <el-popover
                        popper-class="pagesorttype"
                        placement="bottom"
                        width="200"
                        trigger="click"
                      >
                        <div class="popup-des">查看</div>
                        <div
                          :class="{
                            active: chakanfangshicheckedindex == index,
                          }"
                          @click="chakanfangshicheckedindex = index"
                          class="popup-item"
                          v-for="(item, index) in chakanfangshi"
                          :key="index"
                        >
                          <div class="checked"><icon name="duihao" /></div>
                          <div>{{ item.name }}</div>
                          <div v-if="index == 0" class="chakanfangshitag">
                            <el-tag effect="dark" size="mini">默认</el-tag>
                          </div>
                        </div>
                        <icon
                          slot="reference"
                          name="gengduo"
                          class="icon editicon svgiconbtn navsvgiconbtn"
                        />
                      </el-popover>
                      <icon
                        name="add"
                        class="icon editicon svgiconbtn navsvgiconbtn"
                      />
                    </div>
                  </div>
                </div> </router-link
            ></span>
          </el-menu-item>
          <div class="page-list" @click="spaceblog = false">
            <el-tree
              :expand-on-click-node="false"
              :data="pagelist"
              node-key="id"
              draggable
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span class="pagenode-btn">
                  <el-popover
                    popper-class="pageedit"
                    placement="bottom"
                    width="200"
                    trigger="click"
                  >
                    <div class="pageedit-item">
                      <div>
                        <div><icon name="bianji"></icon></div>
                        <div>编辑</div>
                      </div>
                    </div>
                    <div class="pageedit-item">
                      <div>
                        <div>
                          <icon name="chongmingming"></icon>
                        </div>
                        <div>重命名</div>
                      </div>
                    </div>
                    <div class="pageedit-item">
                      <div>
                        <div><icon name="staroff"></icon></div>
                        <div>加星</div>
                      </div>
                    </div>
                    <div class="pageedit-item">
                      <div>
                        <div><icon name="staron"></icon></div>
                        <div>取消加星</div>
                      </div>
                    </div>
                    <div class="pageedit-item">
                      <div>
                        <div><icon name="lianjie"></icon></div>
                        <div>获取链接</div>
                      </div>
                    </div>
                    <div class="line"></div>
                    <div class="pageedit-item">
                      <div>
                        <div><icon name="fuzhi"></icon></div>
                        <div>复制</div>
                      </div>
                    </div>
                    <div class="pageedit-item">
                      <div>
                        <div><icon name="yidong"></icon></div>
                        <div>移动</div>
                      </div>
                    </div>
                    <div class="line"></div>
                    <div class="pageedit-item">
                      <div>
                        <div><icon name="guidang"></icon></div>
                        <div>归档</div>
                      </div>
                    </div>
                    <span slot="reference" class="navsvgiconbtn svgiconbtn">
                      <icon name="gengduo"></icon>
                    </span>
                  </el-popover>

                  <span class="navsvgiconbtn svgiconbtn">
                    <icon name="add"></icon>
                  </span>
                </span>
              </span>
            </el-tree>
          </div>
        </el-menu>
      </div>

      <div v-if="childrennav || onlyleftNavbarchildren" class="childrennav">
        <div class="el-menu-back" v-if="!onlyleftNavbarchildren">
          <div class="righticon" @click="childrennav = false">
            <i class="el-icon-back"></i>返回项目
          </div>
        </div>
        <div
          class="el-menu-filter"
          v-for="item in childrennavdata"
          :key="item.name"
        >
          <div class="el-menu-title">{{ item.title }}</div>
          <el-menu
            :class="{ notback: onlyleftNavbarchildren }"
            :default-active="activechildrenIndex"
            class="el-menu-vertical-demo"
          >
            <el-menu-item
              v-for="menu in item.list"
              :key="menu.routername"
              :index="menu.routername"
            >
              <span slot="title">
                <router-link class="routerlink" tag="div" :to="menu.url"
                  >
                  <div class="iconcontainer">
                    <span v-if="menu.icon" class="icon"><icon :name="menu.icon" ></icon></span>
                  <span>{{ menu.name }}</span>
                  </div>
                </router-link>
              </span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="navbar-footer">
      您是公司管理的项目的一员
    </div>
    <el-dialog
      custom-class="showhead"
      title="编辑空间快捷键"
      :visible.sync="edittspaceshortcuts"
      :close-on-click-modal="false"
      width="600px"
      :before-close="handleClose"
    >
      <edittspaceshortcuts />
    </el-dialog>
  </div>
</template>
<script>
import { childrennavdata } from "./childrennavdata.js";
import edittspaceshortcuts from "@/alert/edittspaceshortcuts.vue";
import commonapi from "@/api/commonapi.js";
import {GlobalProjectCreateModalLoad} from "@/api/projectapi.js"
export default {
  data() {
    return {
      project:{
        ProjectType:'',
        AvatarUrl:''
      },
      torouterurl: "",
      value1: "",
      spaceblog: false,
      pagelist: [
      ],
      chakanfangshicheckedindex: 0,
      chakanfangshi: [
        {
          name: "树状查看",
        },
        {
          name: "我的访问",
        },
        {
          name: "最后更新",
        },
        {
          name: "标题 - A 到 Z",
        },
      ],
      edittspaceshortcuts: false,
      childrennav: false,
      defchildrennavdata:[]
    };
  },
  components: {
    edittspaceshortcuts,
  },
  props: ["projectname"],
  watch: {
    $route(to, from) {
      if (to.name !== from.name && !to.meta.activechildrenLeftNav) {
        this.childrennav = false;
      }
    },
    childrennav(val) {
      if (val == "projectsfilter") {
        this.getfilter();
      }
    },
  },
  computed: {
    childrennavdata() {
      const list = this.defchildrennavdata.filter((item) => {
        return item.name == this.childrennav;
      });
      list.forEach((item) => {
        item.list.forEach((menu) => {
          // console.log(item)
          if(item.type=='url'){
            
          }
        else if(item.type=='direct'){
            menu.url =item.url +menu.routername
        }else{
            menu.url =
            item.url +
            this.$route.params[item.params] +
            "/" +
            menu.routername +
            "?" +
            item.query +
            "=" +
            this.$route.query[item.query];
        }
          
        });
      });
      return list;
    },
    onlyleftNavbarchildren() {
      const onlyleftNavbarchildren = this.$route.meta.onlyleftNavbarchildren;
      if (onlyleftNavbarchildren) {
        this.childrennav = this.$route.meta.activeLeftNav;
      }
      return onlyleftNavbarchildren;
    },
    activeIndex() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeLeftNav) {
        return meta.activeLeftNav;
      }
      return path;
    },
    activechildrenIndex() {
      const route = this.$route;
      const { meta, path, params } = route;
      if (meta.activechildrenLeftNav&&meta.activechildrenLeftNav!='firstitem') {
        return meta.activechildrenLeftNav;
      } else if (params.itemname) {
        return params.itemname;
      }
      return path;
    },
  },
  created() {
    this.torouterurl = this.$route.params.projectname + "?id=" + this.$route.query.id;
    this.defchildrennavdata = childrennavdata
    if(this.$route.query.id){
      GlobalProjectCreateModalLoad(this.$route.query.id).then((res)=>{
        let project = {}
        res.data.issueCreateFields.fields.nodes.forEach((item)=>{
          project[item.fieldId] = item
        })
        this.project.ProjectType = project.ProjectType.pickValues.nodes.find((item)=>{return item.value==project.ProjectType.pickValue.value}).label
        this.project.AvatarUrl = project.AvatarUrl.Avatar.large
      })
    }
  },
  mounted(){
    // if(this.$route.name=='mytask'){
    //     this.childrennav = "projectsfilter";
    // }
  },
  methods: {
    handleClose() {},
    getfilter() {
      return commonapi.entityfiltergetlist("00U").then((res) => {
        const list = [];
        res.listData.forEach((item) => {
          list.push({
            name: item.Name,
            routername: item.FilterId,
          });
        });
        if (!this.defchildrennavdata.find((item) => item.name == "projectsfilter")) {
          if(this.$route.name=='mytask'){}else{
            this.defchildrennavdata.push({
            name: "projectsfilter",
            title: "筛选器",
            params: "projectname",
            query: "id",
            url: "/projects/filter/",
            list: list,
          });
          }
        }
        this.defchildrennavdata.find((item) => item.name == "projectsfilter").list = list;
        this.$store.state.firstprojectfilterid = res.listData[0].FilterId;
        if(this.$route.params.itemname=='firstfilterid'||!this.$route.params.itemname){
          this.$router.push('/projects/filter/'+this.$route.params.projectname+'/'+res.listData[0].FilterId+'?id='+this.$route.query.id)
        }
      });
    },
  },
};
</script>
<style scoped>
.navbar {
  white-space: nowrap;
}
.navbar-head {
  padding: 30px 10px 15px 10px;
  margin: 0 10px;
  display: flex;
}
.head-left-logo img {
  width: 24px;
  height: 24px;
  margin-top: 8px;
}
.head-right {
  margin-left: 15px;
}
.head-right-name {
  font-weight: 700;
  color: rgb(23, 43, 77);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 160px;
}
.head-right-describe {
  font-size: 12px;
  margin-top: 3px;
}
.el-menu-item {
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  padding-left: 10px !important;
}
.el-menu-item:hover {
  background-color: rgb(235, 236, 240);
  color: rgb(0, 82, 204);
}
.el-menu-item.is-active>>>.svgicon{
  color: rgb(0, 82, 204);
}
.el-menu-item.is-active::before{
  content: '';
  display: block;
  position: absolute;
  width: 4px;
  height: 16px;
  top: 12px;
  left: 0;
  background-color: rgb(0, 82, 204);
  border-radius: 0 2px 2px 0;
}
.el-menu-item.is-active {
  background-color: rgb(235, 236, 240);
  color: rgb(0, 82, 204);
}

.el-menu {
  border: 0;
  padding: 10px;
}
.el-menu-item i {
  margin-top: -5px;
}
.routerlink {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-menu-item .lefticon span {
  vertical-align: top !important;
}
.el-menu-item.is-active .righticon {
  background-color: rgb(0, 82, 204);
}
.righticon {
  border-radius: 50%;
  background-color: rgb(58, 75, 99);
  height: 20px;
  line-height: 20px;
  width: 20px;
}
.righticon i {
  color: white !important;
  margin-right: 0;
  font-size: 16px;
  margin-top: -3px !important;
  width: 20px !important;
}
.el-menu-item .righticon {
  display: none;
}
.el-menu-item:hover .righticon {
  display: block;
}
.el-menu-back {
  padding: 10px 20px;
  border-bottom: 1px solid #dedede;
}
.el-menu-back:hover {
  cursor: pointer;
  background-color: rgb(235, 236, 240);
}
.el-menu-back .el-icon-back {
  margin-left: 1px;
  margin-top: 2px !important;
  margin-right: 10px !important;
}
.el-menu-title {
  padding: 10px 20px;
  font-weight: 700;
  color: rgb(66, 82, 110);
}
.childrennav .el-menu {
  height: calc(100vh - 288px);
  overflow: auto;
}
.childrennav .el-menu.notback {
  height: calc(100vh - 185px);
}
.onlyleftNavbarchildren {
  padding-top: 20px;
}
.navbar-body .iconcontainer .icon {
  margin-right: 10px;
  color: #42526e;
}
.menu-item-des {
  margin: 15px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menu-item-des:hover .svgiconbtn {
  visibility: inherit;
}
.navsvgiconbtn {
  padding: 0px 7px;
  color: #42526e;
  margin-right: 0 !important;
}
.navbar-body .navsvgiconbtn:hover {
  color: #42526e !important;
}
.navsvgiconbtn >>> svg {
  width: 18px;
  height: 18px;
}
.navsvgiconbtn:hover {
  background-color: rgb(219, 219, 219);
}
.menu-item-des .svgiconbtn {
  visibility: hidden;
  padding: 0px 5px;
}
.menu-item-des .svgiconbtn:hover {
  visibility: inherit;
  background-color: rgb(235, 235, 236);
}
.navbar-body {
  color: #42526e;
}
.navbar-body .el-menu-item {
  color: #42526e;
}
.addShortcut {
  display: flex;
  align-items: center;
}
.el-menu-item .menu-item-Shortcut {
  padding-left: 0px !important;
}
.menu-item-Shortcut {
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  padding-left: 10px !important;
}
.menu-item-Shortcut:hover {
  background-color: rgb(235, 236, 240);
  color: rgb(0, 82, 204);
  cursor: pointer;
}
.addShortcut > span {
  margin-right: 10px;
}
.menu-item-Shortcut {
  margin-bottom: 10px;
}
.navbar-body {
  height: calc(100vh - 188px);
  overflow: auto;
}
.trcontainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.trcontainer > div {
  display: flex;
  align-items: center;
}
.trcontainer .editicon {
  color: #999 !important;
}
.chakanfangshitag {
  margin-left: 30px;
}
.page-list {
  padding-left: 15px;
}
.page-list >>> .el-tree-node__content {
  height: 40px;
  line-height: 40px;
}
.page-list >>> .custom-tree-node {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding-right: 10px;
}
.page-list >>> .pagenode-btn {
  display: flex;
  align-items: center;
}
.page-list >>> .pagenode-btn {
  visibility: hidden;
}
.page-list >>> .custom-tree-node:hover .pagenode-btn {
  visibility: inherit;
}
.navbar-body.onlyleftNavbarchildren{
  height: calc(100vh - 76px);
}
.navbar-footer{
  text-align: center;
  font-size: 12px;
  line-height: 40px;
  margin: 0 10px;
  border-top: 2px solid #dedede;
}
</style>