<template>
<div>
<boardhead :name='name' :title="title" 
            childrenname="项目设置" 
            childrenurl="/projects/seeting/seetinginformation">
            <slot>
                <el-button size="small" type="primary" @click="addpeople">
                添加人员
              </el-button>
              <el-button size="small" type="primary">
                管理角色
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
                  <div class="search-container">
                    <div class="item-container">

                    <el-input size="small" placeholder="搜索名称">
                    </el-input>
                    </div>

                    <div class="item-container">
                      <el-select size="small" v-model="value1" multiple placeholder="所有角色">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    </div>
                  </div>
                    <el-table :data="tableData" style="width: 100%">
  
    <el-table-column prop="name" sortable label="名称" >
      <template slot-scope="scope"> 
        <div class="flexbox">
          <Userhead />
          <span class="item-name">{{scope.row.name}}</span>
        </div>
        
      </template>
    </el-table-column>
    <el-table-column prop="name" sortable label="电子邮件" >
    </el-table-column>
    <el-table-column prop="address" sortable label="角色" >
      <template slot-scope="scope">
          <el-select size="small">
              <el-option value="1" label="管理员"></el-option>
              <el-option value="2" label="用户"></el-option>
          </el-select>
      </template>

    </el-table-column>
    
    <el-table-column prop="address" width="100">
      <template slot-scope="scope">
        <el-dropdown>
          <div class="editbtn el-dropdown-link">
            <i class="el-icon-more"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
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
    <el-dialog :append-to-body="true" :show-close="false" :visible.sync="addpeopledialog" width="400px" top="10vh">
        <addpeople></addpeople>
    </el-dialog>
</div>

</template>
<script>
import '@/style/liststyle.css'
import Userhead from '@/components/Userheadphoto.vue'
import checkboxdrop from '@/components/dropbtn/checkboxdrop.vue'
import boardhead from '@/components/head/boardhead.vue';
import Addpeople from '@/alert/addpeople.vue'

export default {
  data() {
    return {
      name:'123',
addpeopledialog:false,
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
          name: "王小",
          address: "团队管理的软件",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "团队管理的软件",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "团队管理的软件",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "团队管理的软件",
        },
      ],
    };
  },
  components:{
        Userhead,checkboxdrop,boardhead,Addpeople
  },
  created(){
    this.$store.state.showleftNavbar = false
  },
    computed:{
        title(){
            return this.$route.meta.title
        }
    },
    methods:{
        addpeople(){
            this.addpeopledialog  = true
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