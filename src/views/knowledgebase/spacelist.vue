<template>
    <div class="space-container">
        <header>
            <div class="header-title">空间</div>
            <div class="header-btn">
                <div class="btn">创建空间</div>
            </div>
        </header>
        <div class="myspaces">
            <div class="myspaces-title">您的空间</div>
            <div class="knowledgespace-list">
                 <div @click="toview" class="knowledgespace-item" v-for="i in 5" :key="i">
                     <div class="item-top"></div>
                     <div class="item-bottom">
                         <div class="item-img">
                             <img src="/static/img/subjecttype/yewu.png" alt="">
                         </div>
                         <div class="star" v-if="i==1">
                            <svgicon name="staron"  style="color:#FFAB00 !important;"></svgicon>
                         </div>
                         <div class="item-title">设备保修</div>
                     </div>
                 </div>
             </div>
        </div>
        <div class="allspaces">
            <div class="header-title">所有空间</div>
            <div class="allspaces-title">按标题筛选</div>
            <div class="search-container">
                <div class="left">
                    <el-input size="small">
                </el-input>
                <el-select size="small" v-model="value" placeholder="请选择分类">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </div>
                <div class="right">
                    <div class="typelist">
                        <div @click="typeindex=index" :class="{'active':typeindex==index}" v-for="(item,index) in typelist" :key="item.id">{{item.label}}</div>
                    </div>
                </div>
            </div>
            <div class="spaces-list">
                <div class="spaces-list-item" v-for="i in 10" :key="i">
                    <div class="item-title">
                        <div class="item-img">
                            <img src="/static/img/subjecttype/yewu.png" alt="">
                        </div>
                        <div>hr开发</div>
                    </div>
                    <div>
                        <div class="item-type">knowledge-bases</div>
                    </div>
                    <div class="item-btns">
                        <div class="hover-iconbtn viewoff">
                            <el-tooltip v-if="i!=1" class="item" effect="dark" 
                            content="关注" placement="bottom">
                            <svgicon name="viewoff" ></svgicon>
                            </el-tooltip>
                            <el-tooltip v-else class="item" effect="dark" 
                            content="取消关注" placement="bottom">
                            <svgicon name="viewon"></svgicon>
                            </el-tooltip>
                        </div>
                        <div class="hover-iconbtn staroff">
                            <el-tooltip v-if="i!=1" class="item" effect="dark" 
                            content="收藏" placement="bottom">
                            <svgicon name="staroff"></svgicon>
                            </el-tooltip>
                            <el-tooltip v-else class="item" effect="dark" 
                            content="取消收藏" placement="bottom">
                            <svgicon name="staron"  style="color:#FFAB00 !important;"></svgicon>
                            </el-tooltip>
                        </div>
                        <div class="hover-iconbtn">
                            <el-tooltip class="item" effect="dark" 
                            content="更多" placement="bottom">
                            <svgicon name="gengduo"></svgicon>
                            </el-tooltip>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
 import svgicon from '@/icon/icon.vue'
  export default {
      components:{
          svgicon
    },
    data() {
      return {
          typeindex:0,
          typelist:[{
            value: '全部',
            label: '全部'
          },{
            value: '关注',
            label: '关注'
          },{
            value: '已标星',
            label: '已标星'
          },{
            value: '共有',
            label: '共有'
          },{
            value: '个人',
            label: '个人'
          },{
            value: '已归档',
            label: '已归档'
          }],
        options: [{
          value: '选项10',
          label: '所有分类'
        },{
          value: '选项1',
          label: '黄金糕'
        },{
          value: '选项2',
          label: '双皮奶'
        },{
          value: '选项3',
          label: '蚵仔煎'
        },{
          value: '选项4',
          label: '龙须面'
        },{
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods:{
        toview(){
            this.$router.push('/knowledgebase/spacedetail')
        }
    }
  }
</script>
<style scoped>
.space-container{
    padding: 30px;
    width: 920px;
    margin: 0 auto;
}
header{
    display: flex;
    justify-content: space-between;
}
.header-title{
    font-size: 28px;
}
.knowledgespace-list{
    display: flex;
    overflow: auto;
    padding-bottom: 20px;
}
.knowledgespace-item{
    width: 160px;
    min-width: 160px;
    height: 125px;
    box-shadow: rgb(9 30 66 / 31%) 0px 0px 1px 0px, rgb(9 30 66 / 25%) 0px 1px 1px 0px;
    margin-right:10px;
    margin-top:10px;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
}
.knowledgespace-item:hover{
    box-shadow: rgb(9 30 66 / 31%) 0px 2px 4px 0px, 
    rgb(9 30 66 / 25%) 0px 2px 4px 0px;
}
.item-top{
    height: 40px;
    width: 100%;
    background-color: rgb(244, 245, 247) ;
    position: absolute;
    z-index: -1;
}
.item-bottom{
    margin: 20px 15px;
}
.item-title{
    margin-top: 8px;
}
.myspaces,.allspaces{
    margin-top: 20px;
}
.allspaces-title{
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 3px;
}
.el-input{
    width: 200px;
}
.search-container{
    display: flex;
    justify-content: space-between;
}
.typelist{
    display: flex;
}
.typelist>div{
    padding: 4px 8px;
    border-radius: 13px;
    background-color: rgba(9, 30, 66, 0.04);
    color: rgb(66, 82, 110);
    font-size: 12px;
    margin-left: 5px;
    cursor: pointer;
}
.typelist>div.active,.typelist>div:hover{
    background-color: rgb(222, 235, 255);
    color: rgb(0, 82, 204);
}
.item-img img{
    width: 32px;
    height: 32px;
    border-radius: 4px;
}
.spaces-list{
    margin-top: 15px;
}
.spaces-list-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:4px 10px;
    border-radius: 4px;
}
.spaces-list-item:hover{
    background-color: rgb(244, 245, 247);
}
.item-title{
    display: flex;
    align-items: center;
}
.item-img{
    margin-right: 10px;
}
.item-btns{
    display: flex;
}
.item-type{
    padding: 4px 8px;
    background-color: rgb(239, 239, 240);
    border-radius: 8px;
    font-size: 12px;
}
.hover-iconbtn{
    color: #999 !important;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hover-iconbtn:hover{
    color: rgb(66, 82, 110) !important;
}
.star{
    float: right;
    margin-top: -10px;
}
</style>
