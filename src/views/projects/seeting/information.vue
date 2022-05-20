<template>
    <div class="popup">
<boardhead :name='name' :title="title" 
@commandclick="commandclick"
            childrenname="项目设置" 
            :childrenurl='"/projects/seeting/"+this.$route.params.projectname+"/seetinginformation?id="+this.$route.query.id'>
            <slot><div></div></slot>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="delete">移动到回收站</el-dropdown-item>
            </el-dropdown-menu>
        </boardhead>
    <div class="information">
        <div class="information-head">
            <img :src="projectimg" alt="">
            <div class="btn" @click="dialogVisible = true">更改图标</div>
        </div>
        <div class="information-body">
          <formlayout @createdavatarpicker="createdavatarpicker" styletype="childrencontainer" ref="formlayout" :request="requestformlayout"/>
          <el-button size="small" type="primary" @click="submitForm()">保存</el-button>
        </div>
    </div>
    <el-dialog
    :visible.sync="dialogVisible"
    width="50%">
    <div class="popup">
      <div class="popup-head">
        <div data-v-00a7ee16="" class="popup-title">选择一个图标</div>
      </div>
      <div class="popup-body">
        <div class="imgcontainer">
          <div class="img-item" v-for="i in 26" :key="i">
            <img @click="choseimg('/static/img/images/icons/project/project'+(Array(5).join(0) + i).slice(-5)+'.svg')" :src="'/static/img/images/icons/project/project'+(Array(5).join(0) + i).slice(-5)+'.svg'" alt="">
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <div @click="dialogVisible = false" class="closebtn">关闭</div>
    </span>
  </el-dialog>
    </div>

</template>
<script>
import boardhead from '@/components/head/boardhead.vue';
import commonapi from '@/api/commonapi.js'
import formlayout from '@/components/formlayout/formlayout.vue'
import {GlobalProjectCreateModalLoad} from '@/api/projectapi.js'
  export default {
    data() {
      return {
        dialogVisible:false,
        projectimg:'/static/img/subjecttype/yewu.png',
        name:'123',
        ruleForm: {
          OwningUser: {},
        },
        rules: {
          Name: [
            { required: true, message: '为项目命名（至少 2 个字符）。', trigger: 'blur' },
            { min: 2, message: '为项目命名（至少 2 个字符）。', trigger: 'blur' }
          ],
          ProjectNumber:[
            { required: true, message: '输入键', trigger: 'blur' },
            { min: 2, message: '输入键', trigger: 'blur' }
          ],
          SubjectBranch: [
            { required: true, message: '请选择类别', trigger: 'change' }
          ],
        },
        select:{},
        search:{OwningUser:[]}
      };
    },
    methods: {
      createdavatarpicker(val){
        this.projectimg = val
      },
       choseimg(url){
        this.projectimg = url
        this.dialogVisible = false
        },
      requestformlayout(){
        return GlobalProjectCreateModalLoad(this.$route.query.id)
      },
      submitForm() {
        const formdata = this.$refs.formlayout.getformdata()
        formdata.AvatarUrl = this.projectimg
        if(formdata){
          console.log(this.$route)
          commonapi.entitysaverecord(formdata,20290,this.$route.query.id).then(()=>{
                this.$message.success('保存成功')
            })
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      commandclick(common){
        alert(1)
        if(common=='delete'){
          commonapi.entitydelete(20290,this.$route.query.id).then((res)=>{
            this.$message('删除成功')
            this.$router.push('/projects/list')
          })
        }
      }
    },
    components:{
        boardhead,formlayout
    },
    computed:{
        title(){
            return this.$route.meta.title
        }
    },
    created(){
      this.name = this.$route.params.projectname
      this.getdetail(20290,this.$route.query.id).then((res)=>{
        this.ruleForm = res.record
        for (var item in this.search) {
          const name = item
          const ID = res.record[name].Id
          const Name = res.record[name].Name
          const newlist = {
              ID: ID,
              Name: Name
          }
          this.search[name].push(newlist)
        }
      })
    },
  }
</script>
<style scoped>
    .information{
        width: 600px;
        margin: 0 auto;
    }
    .el-form-item>>>.el-form-item__label{
        padding: 0 !important;
        line-height: 30px !important;
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
    .information-body>>>.el-input{
      width: 50%;
    }
    .information-body>>>.el-select .el-input{
      width: 100%;
    }
    .closebtn{
      color: #0052cc;
    }
    .closebtn:hover{
      text-decoration: underline;
      cursor: pointer;
    }
    .imgcontainer{
      display: flex;
      flex-wrap: wrap;
    }
    .img-item{
      width: 56px;
      height: 56px;
      border: 2px solid transparent;
      padding: 2px;
      margin: 2px;
    }
    .img-item:hover{
      border-color: #000;
      cursor: pointer;
    }
    .img-item img{
      width: 56px;
      height: 56px;
    }
    .information-body{
      padding-bottom: 30px;
    }
</style>