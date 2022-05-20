<template>
<div>
<boardhead :name='name' 
            :title="title" 
            childrenname="项目设置" 
            :childrenurl='"/projects/seeting/"+this.$route.params.projectname+"/seetinginformation?id="+this.$route.query.id'>
            <slot slot="rightbtn">
                <el-button size="small" type="primary" @click="addnotice">
                添加通知
              </el-button>
            </slot>
            <el-dropdown-menu slot="dropdown">
            </el-dropdown-menu>
        </boardhead>
<div class="main-container">
        
        <div class="container">
            <div class="container-flexbox">
                <div class="leftshelterbox"></div>
                <div class="main-container-body">
                 
                    <el-table :data="tableData" style="width: 100%">
  
    <el-table-column prop="name" sortable label="事件" >
    </el-table-column>
    <el-table-column prop="address" sortable label="接收人" >
    </el-table-column>
    <el-table-column prop="address" width="100">
      <template slot-scope="scope">
        <el-dropdown>
          <div class="editbtn el-dropdown-link">
            <i class="el-icon-more"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>编辑</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
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
    <el-dialog :append-to-body="true" :show-close="false" :visible.sync="addnoticedialog" width="550px" top="10vh">
        <addnotic></addnotic>
    </el-dialog>
</div>

</template>
<script>
import '@/style/liststyle.css'
import Userhead from '@/components/Userheadphoto.vue'
import checkboxdrop from '@/components/dropbtn/checkboxdrop.vue'
import boardhead from '@/components/head/boardhead.vue';
import addnotic from '@/alert/addnotic.vue'

export default {
  data() {
    return {
      name:'123',
      addnoticedialog:false,
      value1:[],
      options: [{
          value: '选项1',
          label: '选项1'
        }, {
          value: '选项2',
          label: '选项2'
        }, {
          value: '选项3',
          label: '选项3'
        }, {
          value: '选项4',
          label: '选项4'
        }, {
          value: '选项5',
          label: '选项5'
        }],
      tableData: [
        {
          date: "2016-05-02",
          name: "问题已更新",
          address: "报告人, 当前经办人, 所有关注人",
        },
        {
          date: "2016-05-02",
          name: "问题已更新",
          address: "报告人, 当前经办人, 所有关注人",
        },
        {
          date: "2016-05-02",
          name: "问题已更新",
          address: "报告人, 当前经办人, 所有关注人",
        },
        {
          date: "2016-05-02",
          name: "问题已更新",
          address: "报告人, 当前经办人, 所有关注人",
        },
      ],
    };
  },
  components:{
        Userhead,checkboxdrop,boardhead,addnotic
  },
  created(){
    this.$store.state.showleftNavbar = false
    this.name = this.$route.params.projectname

  },
    computed:{
        title(){
            return this.$route.meta.title
        }
    },
    methods:{
        addnotice(){
            this.addnoticedialog  = true
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
    .head-container>>>.head-operate-item{
        display: none;
    }
</style>