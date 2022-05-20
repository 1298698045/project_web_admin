<template>
    <div class="team-container">
        <div class="header">
            <el-button type="primary" size="small" @click="newteam">
                创建团队
            </el-button>
        </div>
        <div class="search-container">
            <el-input  suffix-icon="el-icon-search" placeholder="搜索人员或团队">
            </el-input>
        </div>
        <div class="main-container">
            <div class="cardlist">
                <div class="list-title">人员</div>
                <div class="list-container">
                    <div class="list-item" v-for="i in 10" :key="i">
                        <div class="people-card">
                            <div class="userhead">
                                <Userhead width="72px" height="72px" />
                            </div>
                            <div class="people-name">jackliu</div>
                            <div class="people-dec">Systems Administrator</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cardlist">
                <div class="list-title">您的团队</div>
                <div class="list-container">
                    <div class="list-item" v-for="i in 5" :key="i">
                        <div class="team-card">
                            <div class="team-bg">
                                <img src="/static/img/svg/bgsvg1.svg" />
                            </div>
                            <div class="team-name">oa团队</div>
                            <div class="team-ownuser">
                                <div class="userhead">
                                <Userhead />
                            </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :append-to-body="true" :show-close="false" :visible.sync="newteamdialog" width="55%" top="10vh">
            <newteampopup></newteampopup>
        </el-dialog>
    </div>
</template>
<script>
import Userhead from '@/components/Userheadphoto.vue'
import newteampopup from '@/alert/newteam.vue'

export default {
    data(){
        return {
            newteamdialog:false
        }
    },
    components:{
        Userhead,newteampopup
  },
  methods:{
      newteam(){
          this.newteamdialog = true
      }
  }
}
</script>
<style scoped>
    .team-container{
        width: 900px;
        margin: 50px auto;
    }
    .header{
        text-align: right;
    }
    .search-container{
        margin-top: 30px;
    }
    .cardlist{
        margin-top: 30px;
    }
    .list-title{
        font-weight: 700;
        font-size: 18px;
    }
    .list-container{
        display: flex;
        gap:8px;
        flex-wrap: wrap;
    }
    .list-item{
        width:calc(25% - 10px);
        height: 180px;
        border: 1px solid #dedede;
        border-radius: 4px;
        box-shadow: #eee 0px 1px 1px;
        text-align: center;
        font-size: 12px;
    }
    .list-container{
        margin-top: 20px;
    }
    .userhead{
        margin: 15px 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .people-dec{
        margin-top: 10px;
    }
    .team-bg img{
       width: 100%;
    height: 80px;
    object-fit: cover;
    }
    .team-name{
        margin-top: 20px;
        font-size: 14px;
    }
</style>