<template>
    <div class="people-container">
        <div class="head-bg">
            <img src="/static/img/svg/bgsvg.svg" alt="">
            
        </div>
        <div class="body">
              <div class="body-main">
              <div class="body-left">
                  <div class="user-name">
                      OA团队
                    </div>
                    <div class="team-type">
                        <img src="/static/img/svg/show.svg" alt="">
                        <span>                        公开团队
</span>
                    </div>
                    <div class="team-dsc">分享您团队所做的事情</div>
                    <div class="btngroups">
                        <div class="btn">添加人员</div>
                        <el-dropdown>
  <div class="btn">
                            <i class="el-icon-more"></i>
                        </div>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>删除团队</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
                        

                    </div>
                  <div class="informmsg">
                      <div class="informmsg-title">成员</div>
                      <div class="informmsg-dsc">5 名成员</div>
                      <div class="teamcontainer">
                      <div class="informmsg-item" v-for="i in 5" :key="i">
                          <div class="item-row">
                              <div class="itemrow-icon">
                                  <userhead />
                              </div>
                              <div class="itemrow-value">
                                  <div class="itemrow-value-title">jackliu</div>
                                  <div class="itemrow-value-dsc">Systems administrtor</div>
                                </div>
                          </div>
                      </div>
                      </div>
                  </div>
              </div>
              <div class="body-right">
                  <div class="rightlist-group">
                      <div class="listgroup-title">已处理</div>
                      <div class="listgroup-body">
                          <div class="informmsg">
                              <div class="informmsg-item" v-for="i in 5" :key="i">
                          <div class="item-row">
                              <div class="itemrow-icon">
                                  <img src="/static/img/svg/team1.svg" alt="">
                              </div>
                              <div class="itemrow-value">
                                  <div class="itemrow-value-title">OA团队</div>
                                  <div class="itemrow-value-dsc">项目实施进度 · 您在2021年10月19日 时创建了此工作</div>
                                </div>
                          </div>
                      </div>
                      <div class="informmsg-footer">显示更多</div>
                          </div>
                          
                      </div>
                  </div>
                  <div class="rightlist-group">
                      <div class="listgroup-title">您的项目</div>
                      <div class="listgroup-body">
                          <div class="project-container">
                              <div class="project-item" v-for="i in 5" :key="i">
                                  
                                  <div class="project-item-body">
                                  <div class="project-item-left">
                                      <img src="/static/img/subjecttype/yewu.png" alt="">
                                  </div>
                                  <div class="project-item-right">OA开发</div>
                                      
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              </div>
        </div>
    </div>
</template>
<script>
import Userhead from '@/components/Userheadphoto.vue'

export default {
    data(){
        return{
            name:'Systems Administrator'
        }
    },
    components:{
        Userhead
  },
}
</script>
<style scoped>
.head-bg img{
    width: 100%;
    height: 192px;
    object-fit: cover;
}
.body{
    width: 950px;
    margin: 0 auto;
}
.userimg{
    position: absolute;
    margin-top: -90px;
}
.body-main{
    display: flex;
}
.user-name{
    font-weight: 700;
    font-size: 22px;
    margin-top: 25px;
}
.body-left{
    width: 280px;
}
.body-left .btn{
    width: 100%;
    text-align: center;
    box-sizing: border-box;
}
.informmsg{
    border: 1px solid #dedede;
    border-radius: 4px;
    padding: 20px;
    margin-top: 30px;
}
.informmsg-title{
    font-weight: 700;
    font-size: 16px;
    color: #333;
}
.informmsg-dsc{
    font-size: 12px;
    margin-top: 5px;
    color: #6B778C;
    border-bottom: 1px solid #dedede;
    padding-bottom: 10px;
}
.item-row{
    display: flex;
    align-items: center;
    margin: 10px 0;
}
.itemrow-icon{
    display: flex;
    align-items: center;
}
.itemrow-value{
    margin-left: 5px;
    font-size: 12px;

}
.itemrow-value>>>input{
    border-width: 0;
    padding-left: 10px;
}
.itemrow-value>>>input:focus{
    border-width: 2px;
}
.itemrow-icon img{
    height: 24px;
    width: 24px;
}
.itemrow-value-title,.itemrow-value-dsc{
    margin-left: 5px;
}
.itemrow-value-dsc{
    color: #777;
    margin-top: 1px;
}
.teamcontainer .item-row{
    cursor: pointer;
    padding: 3px;
    border-radius: 4px;
}
.teamcontainer .item-row:hover{
    background-color: rgb(247, 244, 244);
}
.body-right{
    flex: 1;
    margin-left: 40px;
}
.listgroup-title{
    font-size: 16px;
    font-weight: 700;
}
.body-right .informmsg{
    margin-top: 10px;
}
.informmsg-footer{
    cursor: pointer;
    color: #999;
    font-size: 12px;
    margin-top: 15px;
}
.rightlist-group{
    margin-top: 20px;
}
.project-container{
    background-color: #f2f2f2;
    overflow: hidden;
    margin-top: 10px;
}
.project-item{
    margin:10px;
    padding: 10px;
    background-color: #fff;
    box-shadow: rgb(9 30 66 / 25%) 0px 1px 1px, rgb(9 30 66 / 13%) 0px 0px 1px 1px;
    border-radius: 4px;
    cursor: pointer;
}
.project-item-left img{
    width: 32px;
    height: 32px;
}
.project-item-body{
    display: flex;
    align-items: center;
}
.project-item-left{
    display: flex;
    align-items: center;
}
.project-item-right{
    margin-left: 10px;
}
.btngroups{
    display: flex;
    margin-top: 20px;
}
.btngroups>.el-dropdown{
    margin-left: 5px;
}
.btngroups .btn i::before{
    margin-right: 0;
}
.team-type{
    display: flex;
    align-items: center;
    margin-top: 15px;
}
.team-type>span{
    margin-left: 10px;
}
.team-dsc{
    margin-top: 15px;
    color: #777;
}
</style>