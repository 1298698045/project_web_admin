<template>
<div class="container">
    <div 
    :class="{'active':activeindex==index}" 
    class="userchose" 
    @click="activeindex=activeindex==index?null:index;chosechange(item.EmployeeId.userValue.value,item.EmployeeId.userValue.displayName)" 
    v-for="(item,index) in listdata" :key="item.id">
    <el-tooltip class="item" effect="dark" 
    :content="item.EmployeeId.userValue.displayName" placement="bottom">
              <Userhead :url="item.EmployeeId.userValue.avatarUrl==''?false:item.EmployeeId.userValue.avatarUrl" :width="'32px'" :height="'32px'" />
    </el-tooltip>
    
    </div>
    <div v-if="list.length>5" class="userchose" :class="{'active':activeindex>=5}">
    <el-popover
        placement="bottom"
        popper-class="nopadding"
        min-width="100"
        trigger="click">
        <div class="userpopup">
            <div @click="activeindex=index+5;chosechange(item.EmployeeId.userValue.value,item.EmployeeId.userValue.displayName)" 
            :class="{'active':index+5==activeindex}"
            v-for="(item,index) in morelist" :key="item.id" class="usercontainer">
                <div><Userhead :url="item.EmployeeId.userValue.avatarUrl==''?false:item.EmployeeId.userValue.avatarUrl" :width="'32px'" :height="'32px'" /></div>
                <div>{{item.EmployeeId.userValue.displayName}}</div>
            </div>
        </div>
        <div slot="reference" class="more">+{{list.length-5}}</div>
    </el-popover>
    </div>
    
</div>
        
</template>
<script>
import commonapi from '@/api/commonapi.js'
import Userhead from '@/components/Userheadphoto.vue'
import { projectmembersearch } from "@/api/projectapi.js";
import request from '@/utils/request.js'

export default {
    data(){
        return {
            activeindex:null,
            list:[]
        }
    },
    props:['lookupall'],
    components:{
        Userhead
    },
    computed:{
        listdata(){
            return this.list.slice(0,5)
        },
        morelist(){
            return this.list.slice(5,this.list.length)
        }
    },
    created(){
      this.getdata()
    },
    methods:{
      getdata(){
          if(this.lookupall){
             return request({
                url: '',
                method: 'get',
                params: {
                    cmd: 'entity.lookup',
                    lktp:8
                }
            })
            .then((data) => {
              this.list = data.listData.map((item)=>{
                  return {
                      EmployeeId:{
                          userValue:{
                              accountId:item.ID,
                              value:item.ID,
                              avatarUrl:item.IconUrl,
                              displayName:item.Name,
                          }
                      }
                  }
              });
            })
          }
          const filterQuery = 'projectId\teq\t'+this.$route.query.id
          projectmembersearch({
              filterQuery: filterQuery,
              entityType: "10B",
              search: this.Name,
          }).then((res) => {
              this.list = res.data.members.nodes;
          });

      },
      chosechange(id,name){
          if(this.activeindex==null){
            this.$emit('search','','')
          }else{
            this.$emit('search',id,name)
          }
      }
    }
}
</script>
<style scoped>
.container{
    display: flex;
}
.userchose{
    margin-right: -10px;
    position: relative;
}
.adduser{
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
    .userchose{
        padding: 2px;
        border-radius: 50%;
        height: 32px;
        width: 32px;
        border: 2px solid transparent;
        background-color: #fff;
    }
    .userchose.active{
        border: 2px solid rgb(0, 82, 204);
        z-index: 2;
    }
    .more{
        width: 32px;
        height: 32px;
        background-color: rgb(223, 225, 230);
        border-radius: 50%;
        line-height: 32px;
        text-align: center;
        color: #666;
    }
    .usercontainer{
        display: flex;
        justify-content: flex-start;
        cursor: pointer;
        padding: 5px 15px;
        border-left: 2px solid transparent;
    }
    .usercontainer:hover{
        background-color: #f2f2f2;
    }
    .usercontainer>div+div{
        margin-left: 15px;
    }
    .userpopup{
        padding: 10px 0;
    }
    .usercontainer.active{
        color: #0052cc;
        border-left: 2px solid #0052cc;
    }
</style>