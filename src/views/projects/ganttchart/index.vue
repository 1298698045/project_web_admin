<template>
    <div>
        <boardhead :name='name' :title="'路线图'">
            <template slot="rightbtn">
                <sharepopup></sharepopup>
                <heightfilter 
                @change="filterdata" 
                style="margin-right: 10px"></heightfilter>
                <div class="hoverbtn">导出</div>
            </template>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <el-switch v-model="showClosedItem" inactive-text="显示已完成的项目"></el-switch>
                </el-dropdown-item>
            </el-dropdown-menu>
        </boardhead>
        <!-- <Searchcontainer @search="search"/> -->
        <div class="container">
            <Ganttchart 
            @getchildrendata="getlistdata" 
            @init="getlistdata"
            :data="tableData"/>
        </div>
    </div>
</template>

<script>
 import  {getlistdata} from './require'
import Ganttchart from '@/components/Ganttchart/ganttchart.vue'
import boardhead from '@/components/head/boardhead.vue';
import Searchcontainer from './search.vue'
import {getprojecttasklist} from '@/api/projectapi.js'
import heightfilter from "@/components/filter/heightfilter.vue";
import sharepopup from "@/components/popup/share.vue";
export default {
    data(){
        return {
            grouptype:'无',
            name:'',
            grouplist: [],
            tableData:[],
            datetype:'',
            datedata:[],
            showClosedItem:false,
            filteroption:''
        }
    },
    components:{
        Ganttchart,Searchcontainer,heightfilter,sharepopup,
        boardhead
    },
    created(){
        this.$store.state.showleftNavbar = true
        if(this.$route.params.projectname){
            this.name = this.$route.params.projectname
        }
        this.getlistdata()
    },
    computed:{
    },
    watch:{
        showClosedItem(){
            this.getlistdata()
        }
    },
    methods:{
        search(val){
            this.grouptype = val
        },
        filterdata(filter){
            this.filteroption = filter
            this.getlistdata()
        },
        getlistdata(parent){
            // this.tableData = getlistdata()
            // console.log(this.tableData)
            // return 
            let filterQuery= this.filteroption 
            if(!this.showClosedItem){
                filterQuery +='\nStatusCategoryId\tneq\t3'
            }
            //默认显示未完成的

        return getprojecttasklist({
          projectId:this.$route.query.id,
          parent:parent,
          showClosedItem:this.showClosedItem,
          filterQuery:filterQuery
      }).then((data)=>{
          const res = data.data.list.nodes
          let tableData = []
          res.forEach((item,index)=>{
            const rowitem = {
            }
            item.fields.forEach((fields)=>{
              rowitem[fields.fieldKey] = fields
            })
            rowitem.id = item.id
            rowitem.index = index
            if(!parent){
              if(rowitem.subtasks.issues.length>0){
                rowitem.children = [{id:index}]
              }else{
                rowitem.children = []
              }
            }else{
              rowitem.parentid = parent
            }
            tableData.push(rowitem)
          })
          if(!parent){
            this.tableData = tableData
          }else{
            this.tableData.find((res)=>{return res.id==parent}).children = tableData
          }
          
          return tableData
        })
        }
    }
};
</script>
<style scoped>
    .leftshelterbox,.rightshelterbox{
        position: sticky;
        width: 40px;
        background-color: #fff;
        z-index: 3;
    }
    .leftshelterbox{
        left: 0;
    }
    .rightshelterbox{
        right: 0;
    }
    .head{
        margin-top: 0px;
        padding: 0 40px;
    }
    .container{
        margin-left: 23px;
        position: relative;
        width: calc(100% - 23px);
        box-sizing: border-box;
    }
</style>