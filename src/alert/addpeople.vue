<template>
    <div class="popup">
        <div class="popup-head">
            <div class="popup-title">添加人员</div>
        </div>
        <div class="popup-body">
            <div class="body-main">
            <div class="popup-form">
                <el-select
                v-model="formdata.EmployeeId.Id"
                filterable
                remote
                @visible-change="getlookup(30020,'EmployeeId')"
                :remote-method="function (query) {
                  searchlookup(query,30020,'EmployeeId');
                  }"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in search.EmployeeId"
                  :key="item.ID"
                  :label="item.Name"
                  :value="item.ID"
                >
                </el-option>
              </el-select>
            <div class="item-title">角色</div>
            <el-select  v-model="formdata.RoleCode"  placeholder="请选择">
                <el-option
                v-for="item in select.RoleCode"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </div>
        </div>
        
        </div>
        <div class="popup-footer">
            <el-button size="small" @click="closepopup">取消</el-button>
            <el-button size="small" type="primary" @click="save">添加</el-button>
        </div>
    </div>
</template>
<script>
import commonapi from '@/api/commonapi.js'
  export default {
    inject:['reload'],
    components:{
    },
    created(){
      this.getdetail(20292)
    },
    mounted() {
    },
    data() {
      return {
        options: [],
        formdata:{
          EmployeeId:{},
          RoleCode:'',
        },
        select:{

        },
        search:{
          EmployeeId:[]
        }
      }
    },
    methods: {
     save(){
        const formdata = this.formdata
        formdata.ProjectId = {
          Id:this.$route.query.id
        }
        var Name = this.search.EmployeeId.find(item=>item.ID==this.formdata.EmployeeId.Id).Name
        formdata.Name = Name
        commonapi.entitysaverecord(formdata,20292).then(()=>{
            this.$message.success('添加成功')
            // this.$emit('reload')
            this.closepopup()
            this.reload()
        })
     },
      closepopup(){
          this.$parent.$parent.addpeopledialog = false
      }
    }
  }
</script>
<style scoped>
.popup-title{
    font-size: 18px;
    color: #000;
}
.popup-head{
    padding: 20px;
    display: flex;
    justify-content: space-between;
}
.popup-body{
    height: 200px;
    overflow: auto;
    padding:0 25px;
    box-sizing: border-box;
}
.popup-footer{
    text-align: right;
    padding: 20px;
}
.item-title{
    margin: 20px 0 10px 0;
}
.el-select{
    width: 100%;
}
</style>