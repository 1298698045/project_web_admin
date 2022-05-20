<template>
      <div class="myworklist">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="待办" name="daiban"></el-tab-pane>
            <el-tab-pane label="已指派给我" name="owninguser"></el-tab-pane>
            <el-tab-pane label="我创建的" name="created"></el-tab-pane>
        </el-tabs>
        <div v-for="group in formatdata" :key="group.title">
            <div class="list-head">
                <span class="list-title">{{group.title}}</span>
            </div>
            <ul>
            <li class="item-row" v-for="item in group.rows" :key="item.id" @click="goview(item)">
                <div class="item-main">
                    <div class="item-logo">
                        <img class="sc-1setnfs-0 dpFaMq" 
                        :src="'/static/img'+item.IssueType.iconUrl">
                    </div>
                    <div class="item-msg">
                        <div class="item-title">{{item.Subject.textValue}}</div>
                        <div class="item-desction">{{item.IssueKey.stringValue}} · </div>
                    </div>
                </div>
                <div class="item-type">{{item.StateCode.name}}</div>
                <div class="item-user">
                    <el-tooltip effect="dark" :content="item.OwningUser.userValue.displayName" placement="bottom">
                        <Userhead :width="'32px'" :height="'32px'" :url="item.OwningUser.userValue.avatarUrl"/>
                    </el-tooltip>
                </div>
            </li>
        </ul>
        </div>
      </div>
</template>
<script>
import Userhead from '@/components/Userheadphoto.vue'
import {projectlatestgetlist} from '@/api/projectapi.js'
import {IssueListQuery} from '@/api/projectapi.js'

export default {
  data() {
    return {
      activeName:'daiban',
      listdata:[]
    };
  },
  components:{
      Userhead
  },
  created(){
      this.projectlatestgetlist()
  },
  computed:{
      filterQuery(){
          if(this.activeName=='daiban'){
            //   return 'OwningUser\teq-userid'
              return 'OwningUser\teq-userid\nStatusCategoryId\tneq\t3'
          }
           if(this.activeName=='owninguser'){
              return 'OwningUser\teq-userid'
          }
           if(this.activeName=='created'){
              return 'CreatedBy\teq-userid'
          }
      },
      formatdata(){
          if(this.activeName=='daiban'){
              return this.formatdatabytime(this.listdata)
          }
           if(this.activeName=='owninguser'){
              return this.formatdatabystatus(this.listdata)
          }
           if(this.activeName=='created'){
              return this.formatdatabystatus(this.listdata)
          }
      }
      
  },
  methods:{
      goview(item){
          const url = this.$router.resolve({
              path:'/projects/detail/'+item.RegardingObjectId.lookupValue.displayName,
              query:{
                  id:item.RegardingObjectId.lookupValue.value,
                  itemid:item.id
              }
          })
          window.open(url.href)
      },
      handleClick(){
          this.projectlatestgetlist()
      },
      projectlatestgetlist(){
          var query = {
            pageNumber:1,
            pageSize:999,
          }
          IssueListQuery('00U',this.filterQuery,'',query).then((data)=>{
              this.listdata = data.data.issues.nodes
          })
      },
      formatdatabytime(data){
          let group = {
              'today':{
                  title:'今天',
                  rows:[]
              },
              'yesterday':{
                  title:'昨天',
                  rows:[]
              },
              'lastweek':{
                  title:'本周',
                  rows:[]
              },
              'lastmonth':{
                  title:'本月',
                  rows:[]
              },
              'Earlier':{
                  title:'更早之前',
                  rows:[]
              }
          }
          data.forEach((item)=>{
              let time = item.CreatedOn.dateTime
              if(time==null){
                  group.Earlier.rows.push(item)
              }else{
                  time = new Date(time)
                  const today = new Date(new Date().toLocaleDateString())
                  const yesterday = new Date(new Date(today)-24*60*60*1000)
                  const lastweek = new Date(new Date(today)-24*60*60*1000*new Date().getDay())
                  const lastmonth = new Date(new Date(today)-24*60*60*1000*new Date().getDate())
                  if(time>today){
                    group.today.rows.push(item)
                  }else if(time>yesterday){
                    group.yesterday.rows.push(item)
                  }else if(time>lastweek){
                    group.lastweek.rows.push(item)
                  }else if(time>lastmonth){
                    group.lastmonth.rows.push(item)
                  }else{
                    group.Earlier.rows.push(item)
                  }
              }
          })
          Object.keys(group).forEach((item)=>{
              if(group[item].rows.length==0){
                  delete group[item]
              }
          })
          return group
      },
      formatdatabystatus(data){
          const group = {}
          data.forEach((item)=>{
              const status = item.StateCode.statusId
              if(!group[status]){
                  group[status] = {
                      title:item.StateCode.name,
                      rows:[]
                  }
              }
              group[status].rows.push(item)
          })
          return group
      },
  }
};
</script>
<style scoped>
    .myworklist >>> .el-tabs__header{
        margin-bottom: 0;
    }
    .myworklist{
        padding: 30px 40px;
    }
    .list-head{
        height: 50px;
        line-height: 50px;
        font-weight: 700;
        color: #444;
        font-size: 12px;
    }
    .item-row{
        display: flex;
        padding: 15px;
        cursor: pointer;
        align-items: center;
        font-size: 12px;
    }
    .item-row:hover{
        background-color: #f2f2f2;
    }
    .item-main{
        display: flex;
        width: 65%;
        align-items: center;
    }
    .item-main img{
        width: 24px;
        height: 24px;
    }
    .item-msg{
        margin-left: 10px;
    }
    .item-type{
        width: 30%;
    }
    .item-title{
        font-weight: 700;
    }
    .item-desction{
        color: #666;
        margin-top: 3px;
    }
    .list-title{
        color: #6B778C;
    }
</style>