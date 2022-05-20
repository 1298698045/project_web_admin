<template>
<div class="main-container">
        <div class="head">
            <div class="head-name">项目</div>
            <div class="head-btn">
              <el-button @click="createdproject" size="small" type="primary">
                创建项目
              </el-button>
            </div>
        </div>
        <div class="container">
            <div class="container-flexbox">
                <div class="leftshelterbox"></div>
                <div class="main-container-body">
                  <div class="search-container">
                    <div class="item-container">
                    <el-input size="small"
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search" 
                    @change="searchtable" v-model="searchtext">
                    </el-input>
                    </div>
                    <div class="item-container">
                      <!-- <checkboxdrop 
                      @change="(value,label)=>{searchtable(item,value,label)}"
                      :picklistValues="['所有类别']"
                      v-model="ruleForm.Category"
                      :filterdata="options">
                      <span></span>
                      </checkboxdrop> -->
                      <el-select
                      @change="searchtable"
                      clearable
                      size="small"
                      v-model="ruleForm.ProjectCategoryId.Id"
                      filterable
                      remote
                      @visible-change="getlookup(20311,'ProjectCategoryId')"
                      :remote-method="function (query) {
                        searchlookup(query,20311,'ProjectCategoryId');
                        }"
                      placeholder="所有类型"
                    >
                      <el-option
                        v-for="item in search.ProjectCategoryId"
                        :key="item.ID"
                        :label="item.Name"
                        :value="item.ID"
                      >
                      </el-option>
                    </el-select>

                    </div>
                  </div>
                  <!-- <div class="table-container">
                    
                    <commontable ref="table" :searchtable="searchtable" entityType='10A' :config="tableconfig">
                      <template v-slot:editbox>
<el-table-column
        fixed
        label="操作"
        width="150">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
        </template>
        </el-table-column>
                      </template>
                    </commontable>
                  </div> -->
                    <el-table :data="tableData" style="width: 100%">
    <el-table-column width="50">
      <template slot="header" slot-scope="scope" >
        <i class="el-icon-star-on"></i>
      </template>
      <template slot-scope="scope">
        <div class="starbtn" @click="projectfavor('on',scope.row)" v-if="!scope.row.IsStar">
          <i class="el-icon-star-off"></i>
        </div>
        <div class="starbtn" @click="projectfavor('off',scope.row)" v-if="scope.row.IsStar">
          <i class="el-icon-star-on"></i>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="Name" sortable label="名称"> 
      <template slot-scope="scope">
        <div class="toview" @click="toprojectdetail(scope.row.ProjectCategoryIdName)">
          <router-link tag="div" 
          :to="{path:'/projects/board/'+scope.row.Name,query:{id:scope.row.ProjectId}}">
            {{scope.row.Name}}
          </router-link>
        </div>
      </template>

    </el-table-column>
    <el-table-column prop="ProjectKey" sortable label="键" width="200">
    </el-table-column>
    <el-table-column prop="ProjectCategoryIdName" sortable label="类型" width="200">
    </el-table-column>
    <el-table-column prop="OwningUserName" sortable label="负责人" width="200">
      <template slot-scope="scope">   
        <div class="flexbox">
          <Userhead :popover="true" :userid='scope.row.OwningUser'>
            <span class="item-name">{{scope.row.OwningUserName}}</span>
          </Userhead>
        </div>
        
      </template>
        </el-table-column>
        <el-table-column prop="address" sortable label="类别" width="200">
        </el-table-column>
        <el-table-column prop="address" width="100">
          <template slot-scope="scope">
            <el-dropdown @command="(command)=>{projectCommand(command,scope.row.ProjectId,scope.row.Name)}">
              <div class="editbtn el-dropdown-link">
                <i class="el-icon-more"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="set">项目设置</el-dropdown-item>
                <el-dropdown-item command="delete">移动到回收站</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
                </div>
                <div class="rightshelterbox"></div>
            </div>
        </div>
    </div>
  
</template>
<script>
import '@/style/liststyle.css'
import Userhead from '@/components/Userheadphoto.vue'
import checkboxdrop from '@/components/dropbtn/checkboxdrop.vue'
import selectdrop from '@/components/dropbtn/selectdrop.vue'
import commontable from '@/components/table/commontable.vue'
import {projectminesearch} from '@/api/projectapi.js'
import commonapi from '@/api/commonapi.js'
export default {
  data() {
    return {
      tableconfig:{
        border:false,
        stripe:false,
        height:'calc(100vh - 240px)'
      },
      searchtext:'',
      search:{
        ProjectCategoryId:[]
      },
      ruleForm:{
        ProjectCategoryId:{Id:''}
      },
      tableData:[],
      defaultsearch:{}
    };
  },
  components:{
        Userhead,checkboxdrop,commontable,selectdrop
  },
  created(){
    this.$store.state.showleftNavbar = false
    this.projectminesearch()
  },
  methods:{
    toprojectdetail(name){
      this.$store.state.projecttype = name
    },
    projectCommand(command,id,name){
      if(command=='delete'){
        commonapi.entitydelete(20290,id).then(()=>{
        this.$message.success('操作成功')
        this.projectminesearch()
      })
      }else if(command=='set'){
        this.$router.push('/projects/seeting/'+name+'/seetinginformation?id='+id)
      }
    },
    projectminesearch(){
      var filterquery = ''
      for(var item in this.ruleForm){
        console.log(item)
        console.log(this.ruleForm[item])
        var value = typeof this.ruleForm[item]=='object'?this.ruleForm[item].Id:this.ruleForm[item]
        if(value!=''){
          filterquery += item+'\teq\t'+value
        }
      }
      projectminesearch({
        search:this.searchtext,
        filterquery:filterquery
      }).then(res=>{
        this.tableData = res.rows
      })
    },
    handleClick(row){
      this.$router.push({
        path:'/projects/board/'+row.Name,
        query:{
          id:row.LIST_RECORD_ID
        }
      })
    },
    createdproject() {
      this.$parent.showpopup = true;
    },
    searchtable(){
      this.projectminesearch()
      // console.log(this.$refs.table)
      // this.$refs.table.getlist({
      //   search:this.ruleForm.search,
      //   Category:this.ruleForm.Category.join(',')
      // })
    },
    projectfavor(type,row){
      commonapi.entitysaverecord({
        IsStar:!row.IsStar
      },20290,row.LIST_RECORD_ID).then(()=>{
        this.$set(row,'IsStar',!row.IsStar)
      })
    }
  }
};
</script>
<style  scoped>
.toview{
  cursor: pointer;
  color: #108def;
}
.head-name{
        font-size: 22px;
        color: #172b4d;
        padding: 0px 10px 15px 5px;
    }
    .main-container{
        border-left: 0;
        padding:25px 35px 35px 35px;
    }
    .flexbox{
      display: flex;
    }
    .item-name{
      margin-left: 5px;
    }
    .search-container{
      display: flex;
        margin-bottom: 10px;

    }
    .search-container>div{
      margin-right: 10px;
    }
    .el-select>>>.el-select__tags{
      width: fit-content !important;
      flex-wrap: nowrap !important;
      max-width: 1000px !important;
      position: relative;
      top: 4px;
      transform: none;
    }
    .el-select>>>.el-input{
      position: absolute;
      top: 0;
    }
    .el-select{
      min-width: 220px;
      padding-right: 30px;
      height: 28px;
    }
    .head{
      display: flex;
      justify-content: space-between;
    }
    .table-container{
      margin-top: 10px;
    }
    .el-table>>>.el-icon-star-on{
      color: rgb(255,170,0);
      font-size: 18px;
      font-weight: 700;
    }
    .el-table>>>.el-icon-star-off:hover{
      color: #172b4d;
    }
    .starbtn{
      font-size: 18px;
      font-weight: 700;
      color: #999;
    }
</style>