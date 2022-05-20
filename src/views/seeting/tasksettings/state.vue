<template>
<div class="main-container">
        <div class="head">
            <div class="head-name">状态</div>
            <div class="head-btn">
              <el-button @click="createdpriority()" size="small">
                创建状态
              </el-button>
            </div>
        </div>
        <div class="container">
            <div class="container-flexbox">
                <div class="leftshelterbox"></div>
                <div class="main-container-body">
                    <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="Name" sortable label="名称"></el-table-column>
                    <el-table-column prop="ProjectCategoryIdName" sortable label="描述" width="300"></el-table-column>
                    <el-table-column prop="ProjectCategoryIdName" sortable label="类别" width="100"></el-table-column>
                    <el-table-column prop="ProjectCategoryIdName" sortable label="工作流" width="100"></el-table-column>
                    <el-table-column
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="edititem(scope.row.LIST_RECORD_ID)">编辑</el-button>
                            <el-button type="text" size="small" @click="deleteitem(scope.row.LIST_RECORD_ID)">删除</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                </div>
                <div class="rightshelterbox"></div>
            </div>
        </div>
        <newstatus v-model="dialogFormVisible" :itemid="itemid"></newstatus>
    </div>
</template>
<script>
import '@/style/liststyle.css'
import Userhead from '@/components/Userheadphoto.vue'
import checkboxdrop from '@/components/dropbtn/checkboxdrop.vue'
import selectdrop from '@/components/dropbtn/selectdrop.vue'
import commontable from '@/components/table/commontable.vue'
import commonapi from '@/api/commonapi.js'
import newstatus from '@/alert/newstatus.vue'
export default {
  data() {
    return {
      dialogFormVisible:false,
      itemid:'',
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
        Userhead,checkboxdrop,commontable,selectdrop,newstatus
  },
  created(){
    this.$store.state.showleftNavbar = false
    this.entitygridsearch()
  },
  methods:{
    toprojectdetail(name){
      this.$store.state.projecttype = name
    },
    deleteitem(id){
        commonapi.entitydelete(20313,id).then(()=>{
            this.$message.success('操作成功')
            this.entitygridsearch()
        })
    },
    entitygridsearch(){
      commonapi.entitygridsearch('0PP').then(res=>{
        this.tableData = res.rows
      })
    },
    createdpriority() {
      this.dialogFormVisible = true;
    },
    edititem(id){
      this.itemid = id;
      this.dialogFormVisible = true;
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
</style>