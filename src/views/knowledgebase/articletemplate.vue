<template>
  <div class="container">
    <div class="articletemplate">
      <div class="articletemplate-head">
        <div class="articletemplate-title">
          <div class="articletemplate-name">模板</div>

          <div class="space-select">
            <div class="space-img">
                  <img src="/static/img/articletemplatetype/wendang.svg" alt="" />
            </div>
            <el-select v-model="value">
              <el-option
                :value="item.value"
                :label="item.label"
                v-for="item in typelist"
                :key="item.id"
              >
              <div class="select-item">
                <span>
                  <img src="/static/img/articletemplatetype/wendang.svg" alt="" />
                </span>
                <span>{{ item.label }}</span>             
              </div>
              </el-option>
            </el-select>
          </div>

        </div>
        <div class="articletemplate-filter">
          <div class="filter-container">
            <div class="filter-search">
              <div class="svgbtn" @click="opensearchcontainer" v-show="!showsearchcontainer">
                <svgicon name="sousuo"   />
              </div>
              <div>
                  <el-input class="searchinput" ref="searchinput" v-show="showsearchcontainer" @blur="showsearchcontainer=false">
                  </el-input>
              </div>
            </div>
            <div class="typelist">
              <div
                @click="typeindex = index"
                :class="{ active: typeindex == index }"
                v-for="(item, index) in typelist"
                :key="item.id"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
          <div class="filter-sort">
            <div class="space-select">
              <el-select v-model="value">
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="item in typelist"
                  :key="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div class="articletemplate-body">
        <div class="articletemplate-list">
          <div
            class="articletemplate-item"
            :class="{'active':i==1}"
            v-for="i in 20"
            :key="i"
            @click="opendetail"
          >
            <div class="card-img">
              <img src="/static/img/articletemplatetype/wendang.svg" alt="" />
              <svgicon name="staroff" v-if="i != 1" />
              <svgicon style="color: #ffab00" name="staron" v-else />
            </div>
            <div class="card-title">主项目文档</div>
            <div class="card-foot">
              <div class="card-type">文档和报告</div>
              <div class="card-btn">
                <el-button size="small" type="primary"> 使用 </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="articledetail" v-if="showdetail">
      <div class="detail-head">
        <div class="detail-detail-left">
          <el-tooltip
            class="item"
            effect="dark"
            content="上一个"
            placement="bottom"
          >
            <svgicon name="prev" class="headbtn" />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="下一个"
            placement="bottom"
          >
            <svgicon name="next" class="headbtn" />
          </el-tooltip>
        </div>
        <div class="detail-detail-right">
          <div @click="closedetail">
            <el-tooltip
              class="item"
              effect="dark"
              content="关闭"
              placement="bottom"
            >
              <svgicon name="close" class="headbtn" />
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="detail-body">
        <div class="detail-title">
          <div>
            <img src="/static/img/articletemplatetype/wendang.svg" alt="" />
          </div>
          <div class="detail-title-right">
            主项目文章
            <div>
              <svgicon name="staroff" />
            </div>
          </div>
        </div>
        <div class="detail-des">提供常见问题的解决方案。</div>
        <div class="detail-btn">
          <el-button size="small" type="primary"> 使用模板 </el-button>
        </div>
        <div class="detail-main"></div>
      </div>
    </div>
  </div>
</template>
<script>
import svgicon from "@/icon/icon.vue";
export default {
  components: {
    svgicon,
  },
  data() {
    return {
        showsearchcontainer:false,
      showdetail: false,
      typeindex: 0,
      typelist: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "关注",
          label: "关注",
        },
        {
          value: "已标星",
          label: "已标星",
        },
        {
          value: "共有",
          label: "共有",
        },
        {
          value: "个人",
          label: "个人",
        },
        {
          value: "已归档",
          label: "已归档",
        },
      ],
      value: "",
    };
  },
  methods: {
    closedetail() {
      this.showdetail = false;
    },
    opendetail() {
      this.showdetail = true;
    },
    opensearchcontainer(){
        this.showsearchcontainer = true
        this.$nextTick(()=>{
        this.$refs.searchinput.focus()

        })
    }
  },
};
</script>
<style scoped>
.typelist {
  display: flex;
}
.typelist > div {
  padding: 4px 8px;
  border-radius: 13px;
  background-color: rgba(9, 30, 66, 0.04);
  color: rgb(66, 82, 110);
  font-size: 12px;
  margin-left: 5px;
  cursor: pointer;
}
.typelist > div.active,
.typelist > div:hover {
  background-color: rgb(222, 235, 255);
  color: rgb(0, 82, 204);
}
.articletemplate-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(264px, 1fr));
  grid-auto-rows: 180px;
  gap: 16px;
  padding: 1px;
  justify-items: center;
}
.articletemplate-item {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  background-color: rgb(255, 255, 255);
  padding: 18px;
  cursor: pointer;
  box-shadow: rgb(179 186 197) 0px 0px 1px 0px, rgb(193 199 208) 0px 1px 1px 0px;
}
.articletemplate-item:hover {
  box-shadow: rgb(9 30 66 / 25%) 0px 8px 16px -4px,
    rgb(9 30 66 / 31%) 0px 0px 1px;
  transition: box-shadow 300ms ease 0s;
}
.articletemplate {
  padding: 40px;
}
.articletemplate-title {
  font-size: 28px;
  font-weight: 700;
  display: flex;
  color: #222;
  align-items: center;
}
.space-select {
  margin-left: 10px;
}
.space-select >>> .el-input__inner {
  border-width: 0;
}
.space-select >>> .el-input__inner:focus {
  border-width: 2px;
}
.filter-search {
  margin-right: 5px;
}
.filter-container {
  display: flex;
  align-items: center;
}
.svgbtn >>> .svgicon {
  width: 18px;
  height: 18px;
}
.articletemplate-body {
  margin-top: 30px;
}
.articletemplate-filter {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
.space-select >>> i {
  font-weight: 700;
  color: #333 !important;
}
.card-img img {
  width: 40px;
  height: 40px;
}
.card-title {
  font-size: 20px;
  margin-top: 10px;
}
.card-type {
  color: #172b4d;
}
.card-foot {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
.card-img {
  display: flex;
  justify-content: space-between;
}
.card-img > span,
.card-btn {
  display: none;
}
.articletemplate-item:hover .card-img > span,
.articletemplate-item:hover .card-btn {
  display: block;
}
.container {
  display: flex;
  height: calc(100vh - 56px);
}
.articletemplate {
  flex: 1;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.articledetail {
  width: 30%;
  overflow: auto;
  box-sizing: border-box;
  background-color: rgb(244, 245, 247);
}
.detail-head .headbtn {
  cursor: pointer;
}
.detail-head {
  padding: 15px;
}
.detail-head,
.detail-detail-left {
  display: flex;
  justify-content: space-between;
}
.detail-detail-left .headbtn {
  margin-right: 15px;
}
.detail-title img {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}
.detail-body {
  padding: 0 25px 25px 25px;
}
.detail-title > div {
  display: flex;
  justify-content: space-between;
}
.detail-title {
  display: flex;
  align-items: center;
  font-size: 20px;
}
.detail-title-right {
  flex: 1;
}
.detail-des {
  margin: 15px 0;
}
.detail-title-right >>> .svgicon {
  cursor: pointer;
}
.searchinput>>>.el-input__inner{
  border-width: 2px;
}
.articletemplate-item.active{
  background-color: rgba(222, 235, 255, 0.5);
  border: 2px solid rgb(0, 101, 255);
}
.select-item img,.space-img img{
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}
.select-item{
  display: flex;
  align-items: center;
}
.space-select .el-select-dropdown__item{
  border-left: 2px solid transparent;
}
.space-select .el-select-dropdown__item.selected,.space-select .el-select-dropdown__item:hover{
  border-left: 2px solid rgb(0, 101, 255);
}
.space-img img{
  position: absolute;
  z-index: 2;
  margin: 17px 10px;
}
.space-select>>>.el-input__inner{
  text-indent: 20px;
}
</style>
