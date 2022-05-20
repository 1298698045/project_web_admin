<template>
  <div class="container">
    <div class="spaces-name">空间名称</div>
    <div class="container-head">
      <div class="container-title">页面</div>
    </div>
    <div class="container-search">
      <div class="search-item">
        <el-input
          size="small"
          placeholder="按标题搜索"
          prefix-icon="el-icon-search"
          v-model="input2"
        >
        </el-input>
      </div>
      <div class="operate-container">
        <div>
          <div class="operate-item">
            <selectdrop
              @valuechange="valuechange"
              :selectdata="selectdata"
              :value="grouptype"
            >
              <span>排序方式</span>
            </selectdrop>
          </div>
        </div>
        <div
          @click="listtype = 0"
          :class="{ active: listtype == 0 }"
          class="hover-iconbtn"
        >
          <svgicon name="viewkapian" />
        </div>
        <div
          @click="listtype = 1"
          :class="{ active: listtype == 1 }"
          class="hover-iconbtn"
        >
          <svgicon name="viewliebiao" />
        </div>
      </div>
    </div>
    <div class="container-search">
      <div class="tags">
        <div
          @click="index1 = index"
          :key="index"
          v-for="(item, index) in typelist"
        >
          <el-tag v-if="index1 == index" size="small">{{ item.name }} </el-tag>
          <el-tag v-else type="info" size="small">{{ item.name }} </el-tag>
        </div>
      </div>
    </div>
    <div class="container-body">
      <div :class="{'cardlist':listtype==0,'tablelist':listtype==1}">
        <el-card class="box-card" v-for="o in 10" :key="o">
          <div slot="header" class="clearfix">
            <div class="header-img">
              <svgicon name="yemiancard" />
            </div>
          </div>
          <div class="page-title">页面名称</div>
          <div  class="text item page-user">
              <div><Userhead /></div>
              <div>创建者:jackliu</div>
          </div>
          <div class="page-des">文章简介文章简介文章简介文章简介文章简介文章
              简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章
              简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章
              简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章
              简介文章简介文章简介文章简介文章简介文章简介文章简介</div>
          <div class="page-time">
                <i class="el-icon-time"></i>
                  <span>更新时间 : 2021年11月2日</span>
          </div>
          <div class="btns">
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="bottom"
              >
                <div class="hover-iconbtn"><svgicon name="bianji" /></div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="共享"
                placement="bottom"
              > 
              <div class="sharecontainer hover-iconbtn">
                <sharepopup></sharepopup>
                <div><svgicon name="gongxiang" /></div>
              </div>
               
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="取消关注"
                placement="bottom"
              >
                <div class="hover-iconbtn"><svgicon name="viewon" /></div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="关注"
                placement="bottom"
              >
                <div class="hover-iconbtn"><svgicon name="viewoff" /></div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="取消加星"
                placement="bottom"
              >
                <div class="hover-iconbtn">
                  <svgicon style="color: #ffab00" name="staron" />
                </div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="加星"
                placement="bottom"
              >
                <div class="hover-iconbtn"><svgicon name="staroff" /></div>
              </el-tooltip>
            </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import svgicon from "@/icon/icon.vue";
import Userhead from "@/components/Userheadphoto.vue";
import selectdrop from "@/components/dropbtn/selectdrop.vue";
import sharepopup from "@/components/popup/share.vue";

export default {
  data() {
    return {
        listtype:'cardlist',
      checkedlist: [],
      checkList: [],
      input2: "",
      grouptype: "无",
      choseuser: false,
      selectdata: ["最新的", "最旧的", "标题A-Z", "标题Z-A"],
      addpeopledialog: false,
      index1: 0,
      listtype: 0,
      typelist: [
        {
          name: "全部",
        },
        {
          name: "已处理",
        },
        {
          name: "已加星",
        },
      ],
    };
  },
  components: {
    selectdrop,
    svgicon,
    Userhead,
    sharepopup
  },
  methods: {
    userchose() {
      this.choseuser = !this.choseuser;
    },
    valuechange(val) {
      this.grouptype = val;
      this.$emit("search", this.grouptype);
    },
    addpeople() {
      this.addpeopledialog = true;
    },
  },
};
</script>
<style scoped>
.template-container {
  padding: 10px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-container {
  display: flex;
  align-items: center;
}
.item-container {
  margin-right: 10px;
}
.adduser {
  width: 32px !important;
  height: 32px !important;
  line-height: 32px;
  color: rgb(122, 134, 154);
  background-color: rgb(223, 225, 230);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.userchose {
  padding: 2px;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  border: 2px solid transparent;
}
.userchose.active {
  border: 2px solid rgb(0, 82, 204);
}
.dropbtn .el-dropdown {
  color: rgb(66, 82, 110) !important;
}
.container {
  padding: 40px 50px;
}
.container-title {
  font-size: 28px;
}
.container-head {
  padding: 20px 0;
}
.container-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.operate-container {
  display: flex;
}
.hover-iconbtn {
  margin-left: 10px;
}
.el-tag {
  border-radius: 12px;
  line-height: 26px;
  height: 28px;
  padding: 0 15px;
  cursor: pointer;
  margin-right: 5px;
}
.el-tag.el-tag--info {
  background-color: rgba(9, 30, 66, 0.04);
  border-color: #e9e9eb;
  color: rgb(66, 82, 110);
}
.el-tag.el-tag--info:hover {
  background-color: rgb(235, 236, 240);
}
.hover-iconbtn {
  color: #999 !important;
}
.hover-iconbtn.active {
  color: rgb(66, 82, 110) !important;
}
.tags {
  display: flex;
}
.container {
  height: calc(100vh - 56px);
  overflow: auto;
  box-sizing: border-box;
}
.cardlist {
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
.el-card {
  box-shadow: 0 0 1px #ccc;
}
.el-card:hover {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.cardlist>>>.el-card__header .clearfix{
    display: flex;
    justify-content: space-between;
}
.cardlist>>>.el-card__header{
    border-bottom: 0;
    padding-bottom: 0;
}
.btns{
    display: flex;
    visibility: hidden;
}
.el-card:hover .btns{
    visibility: inherit;
}
.btns>div{
    margin: 0;
}
.cardlist>>>.el-card__body{
    padding-top: 15px;
}
.page-title{
    font-size: 18px;
}
.page-user{
    display: flex;
    align-items: center;
    font-size: 12px;
    color: rgb(107, 119, 140);
    padding: 10px 0;
}
.page-user>div{
    margin-right: 10px;
}
.page-des{
    font-size: 12px;
    padding: 0 0 10px 0;
}
.page-time{
    font-size: 12px;
}
.sharecontainer>span{
    position: absolute;
    opacity: 0;
    width: 32px;
}
.sharecontainer{
    width: 32px;
    position: relative;
}
.el-card{
    position: relative;
}
.cardlist .btns{
    position: absolute;
    top: 10px;
    right: 10px;
}
.tablelist{
    border-bottom: 1px solid #eee;
}
.tablelist .el-card{
    box-shadow: none;
}
.tablelist >>>.el-card__header{
    border: 0;
    padding: 0 20px;
    display: flex;
    align-items: center;
}
.tablelist .el-card{
    display: flex;
    border-radius: 0;
    border-bottom: 0;
}
.tablelist>>>.el-card__body{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    padding: 0 20px;
}
.tablelist .page-des{
    display: none;
}
.tablelist .page-title{
    font-size: 14px;
}
</style>