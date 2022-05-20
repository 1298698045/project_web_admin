<template>
  <div class="popup">
    <div class="popup-head">
      <div class="popup-title">创建事务</div>
      <div>
        <div class="btn">导入事务</div>
        <div class="btn">
          <div class="dropiconbtn">
            <i class="el-icon-s-tools"></i>
            <span>配置字段</span>
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="popup-body">
      <div class="body-main">
        <div class="popup-form">
          <formlayout @finish="submitFormfinish" ref="formlayout" :request="requestformlayout"/>
        </div>
      </div>
    </div>
    <div class="popup-bottom">
      <div class="createdagain">
        <el-checkbox v-model="createdagain">创建其他事务</el-checkbox>
        <div v-if="index>0" class="creatednumber">
          <span>
            <icon name="success"/>
          </span>
          <div>
            {{index}}

          个事务已创建
          </div>
          
        </div>
      </div>
      <div class="popup-footer">
      <el-button size="small" @click="closepopup">取消</el-button>
      <el-button size="small" @click="submitForm('ruleForm')" type="primary">创建事务</el-button>
    </div>
    </div>
    
  </div>
</template>
<script>

import commonapi from '@/api/commonapi.js'
import {GlobalIssueCreateModalLoad} from '@/api/projectapi.js'
import formlayout from '@/components/formlayout/formlayout.vue'
import icon from "@/icon/icon.vue";
export default {
  inject:['reload'],
  popup:['newworkdialog'],
  components: {
    icon,formlayout
  },
  mounted() {
  },
  watch:{
  },
  data() {
    return {
      itemid:'',
      index:0,
      createdagain:false,
    };
  },
  created(){

  },
  methods: {
    requestformlayout(){
      return GlobalIssueCreateModalLoad(this.$route.query.id)
    },
    submitForm() {
      const formdata = this.$refs.formlayout.getformdata()
      const filelength = this.$refs.formlayout.getfile()
      console.log(formdata)
      if(formdata){
        commonapi.entitysaverecord(formdata,4200).then((res)=>{
            if(filelength>0){
              this.$refs.formlayout.submitfile(res.recordRep.id)
            }else{
              this.submitFormfinish()
            }
          })
      }
    },
    submitFormfinish(){
      console.log('finish')
      if(!this.createdagain){
        this.reload()
      }else{
        this.$refs.formlayout.createdagain()
        this.$message.success('创建成功')
        this.index++;
        this.$emit('created')
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    closepopup() {
      this.$confirm('如果您离开此页面，我们将无法保存您的数据。?', '您的更改将不会保存', {
          confirmButtonText: '放弃事务',
          cancelButtonText: '返回',
          type: 'warning'
        }).then(() => {
          this.$emit('close')
          this.$parent.$parent.newworkdialog = false;
        }).catch(() => {
                   
        });

    },
  },
};
</script>
<style scoped>
.popup-title {
  font-size: 18px;
  color: #000;
}
.popup-head {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.popup-body {
  height: calc(95vh - 195px);
  overflow: auto;
  padding: 10px 25px;
  box-sizing: border-box;
}
.popup-footer {
  text-align: right;
  padding: 20px;
}
.popup-bottom{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.createdagain{
  margin: 0 20px;
  display: flex;
}
.popup-body{
  border-top: 2px solid #dedede;
  border-bottom: 2px solid #dedede;
}
.createdagain .el-checkbox{
  margin-right: 20px;
}
.creatednumber{
  display: flex;
  align-items: center;
}

</style>