<template>
    <div class="container">
<boardhead :name='name' :title="title" 
            childrenname="空间设置" 
            childrenurl="/projects/seeting/seetinginformation">
            <slot><div></div></slot>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>移动到回收站</el-dropdown-item>
            </el-dropdown-menu>
        </boardhead>
    <div class="information">
      
        <div class="information-head">
            <img src="/static/img/subjecttype/yewu.png" alt="">
            <el-upload
            :show-file-list="false"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/">
            <div class="btn">更改图标</div>
            </el-upload>
        </div>
        <div class="information-body">
            <el-form 
            :model="ruleForm" :rules="rules" 
            ref="ruleForm" 
            label-position="top"
            class="demo-ruleForm">
  <el-form-item label="名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
   <el-form-item label="键" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="描述" prop="name">
    <el-input type="textarea" :rows="3" v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="类别" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择类别">
      <el-option label="类别一" value="shanghai"></el-option>
      <el-option label="类别二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="管理员" prop="region">
    <el-select multiple="" v-model="ruleForm.region" placeholder="请选择项目负责人">
      <el-option label="1" value="shanghai"></el-option>
      <el-option label="2" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button size="small" type="primary" @click="submitForm('ruleForm')">保存</el-button>
  </el-form-item>
</el-form>
        </div>
    </div>
    </div>

</template>
<script>
import boardhead from '@/components/head/boardhead.vue';

  export default {
    data() {
      return {
        name:'123',
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '为项目命名（至少 2 个字符）。', trigger: 'blur' },
            { min: 2, message: '为项目命名（至少 2 个字符）。', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择类别', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    components:{
        boardhead
    },
    computed:{
        title(){
            return this.$route.meta.title
        }
    },
  }
</script>
<style scoped>
    .information{
        width: 350px;
        margin: 0 auto;
    }
    .el-form-item>>>.el-form-item__label{
        padding: 0 !important;
        line-height: 30px !important;
    }
    .el-select{
        width: 100%;
    }
    .information-head{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .information-head img{
        width: 125px;
        height: 125px;
        display: block;
        margin-bottom: 15px;
    }
    .el-form-item{
        margin-bottom: 18px;
    }
    .container{
        overflow: auto;
        height: calc(100vh - 56px);
    }
</style>