<template>
    <div class="knowledgebase-container">
        <div class="knowledgebase-left">
            <div class="knowledgespace">
                <div class="knowledgespace-head">
                    <div class="container-title">空间</div>
                    <div class="knowledgespace-bun">
                        <router-link tag="div" to="/knowledgebase/space">
              查看所有
            </router-link>
                        
                    </div>
                </div>
                <div class="knowledgespace-body">
                    <div class="knowledgespace-list">
                        <div class="knowledgespace-item" v-for="i in 5" :key="i">
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
            </div>
            <div class="articlecontainer">
                <div class="container-title">最近</div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="已访问" name="first">
                    </el-tab-pane>
                    <el-tab-pane label="已处理" name="second"></el-tab-pane>
                    <el-tab-pane label="草稿" name="third"></el-tab-pane>
                    <el-tab-pane label="已标星" name="fourth"></el-tab-pane>
                </el-tabs>
                <div class="article-group">
                    <div class="article-group-title">今天</div>
                <div class="article-list">
                    <div class="article-item" v-for="i in 5" :key="i">
                        <div class="article-left">
                            <div class="article-img">
                                <svgicon name="wenzhang"></svgicon>
                            </div>
                            <div class="article-msg">
                                <div class="article-title">故障排除文章</div>
                                <div class="article-des">OA</div>
                            </div>
                        </div>
                        <div class="article-mi">
                            <div class="article-time">15分钟前</div>
                        </div>
                        <div class="article-right">
                            <div class="article-btns">
                                <div class="hover-iconbtn">
                                    <i class="el-icon-edit"></i>
                                </div>
                                <div class="hover-iconbtn" :class="{'active':i==1}">
                                    <i v-if="i==1" class="el-icon-star-on" style="color:#FFAB00"></i>
                                    <i v-else class="el-icon-star-off"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
</div>
            </div>
        </div>
        <div class="knowledgebase-right">
            <el-collapse v-model="activeNames" >
  <el-collapse-item title="公告" name="1">
      <el-empty description="暂无公告"></el-empty>
  </el-collapse-item>
  <el-collapse-item title="源" name="2">
      <div class="article-main">
<el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部更新" name="first">
            </el-tab-pane>
            <el-tab-pane label="热门" name="second"></el-tab-pane>
           </el-tabs>
      <div class="article-main-session">
          <div class="article-people">
                                <Userhead :width="'40px'" :height="'40px'" />

          </div>
          <div class="article-session">
<div class="article-session-item" v-for="i in 10" :key="i">
              <div class="articleitem-name">jackliu</div>
              <div class="articleitem-title">
                  <div>
                    <svgicon name="wenzhang"></svgicon>
                  </div>
                  <div class="article-link">主项目文档</div>
              </div>
              <div class="articleitem-time">创建于 2021年10月17日</div>
          </div>
          </div>
          
      </div>
      </div>
      
  </el-collapse-item>
 
</el-collapse>
        </div>
    </div>
</template>
<script>
 import svgicon from '@/icon/icon.vue'
import Userhead from '@/components/Userheadphoto.vue'

export default {
    data(){
        return {
            activeName:'first',
            activeNames:''
        }
    },
    methods:{
        handleClick(){

        }
    },
    components: {
        svgicon,Userhead
  },
}
</script>
<style scoped>
.knowledgebase-container{
    display: flex;
}
.knowledgebase-left{
    width: 60%;
    padding: 30px;
}
.knowledgebase-right{
    width: 40%;
    background-color: #f2f2f2;
    padding: 10px;
}
.knowledgebase-left,.knowledgebase-right{
    height: calc(100vh - 56px);
    overflow: auto;
    box-sizing: border-box;
}
.knowledgespace-head{
    display: flex;
    justify-content: space-between;
}
.container-title{
    font-size: 20px;
}
.knowledgespace-bun{
    cursor: pointer;
    color: rgb(0, 82, 204);
}
.knowledgespace-body{
    margin-top: 20px;
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
.item-img img{
    width: 40px;
    height: 40px;
    border-radius: 10px;
}
.item-bottom{
    margin: 20px 15px;
}
.item-title{
    margin-top: 8px;
}
.article-group-title{
    font-size: 12px;
    font-weight: 700;
    color: #777;
    margin-bottom: 10px;
}
.articlecontainer .container-title{
    margin: 20px 0 10px 0;
}
.article-group{
    padding: 5px;
}
.article-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
}
.article-btns{
    display: flex;
    justify-content: space-between;
}
.article-des{
    font-size: 12px;
    color: #999;
}
.article-left{
    display: flex;
    align-items: center;
}
.article-msg{
    margin-left: 10px;
}
.article-time{
    color: #666;
    font-size: 12px;

}
.hover-iconbtn{
    visibility: hidden;
}
.article-item:hover .hover-iconbtn{
    visibility:inherit;
}
.article-item:hover{
    background-color: #f2f2f2;
}
.hover-iconbtn.active{
    visibility:inherit !important;
}
.hover-iconbtn{
    font-size: 18px;
}
.el-collapse-item{
    margin-bottom: 15px;
    border-radius: 4px;
}
.el-collapse-item>>>.el-collapse-item__header{
    border-radius: 4px;
    border-bottom: 1px solid #dedede;
    padding: 0 10px;
    font-weight: 700;
}
.el-collapse-item>>>.el-collapse-item__header.is-active{
    border-radius: 4px 4px 0 0;
}
.el-collapse-item>>>.el-collapse-item__header i{
    font-weight: 700;
}
.article-main{
    padding: 5px 20px;
}
.article-main-session{
    display: flex;
}
.article-session-item{
    margin-left: 10px;
    margin-bottom: 5px;
}
.articleitem-name{
    font-weight: 700;
    color: #172b4d;
}
.articleitem-title{
    display: flex;
    align-items: center;
}
.articleitem-title>>>svg{
    width: 16px !important;
    height: 16px !important;
}
.articleitem-title>div{
    margin-right: 5px;
}
.article-link{
 cursor: pointer;   
}
.articleitem-time{
    font-size: 12px;
    color: #999;
}
.star{
    float: right;
    margin-top: -10px;
}
</style>