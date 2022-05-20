<template>
<div class="container">
    <el-dialog title="新建状态" :visible.sync="show" top="50px">
        <div class="popup">
    <div class="popup-head">
      <div class="popup-title">新建状态</div>
    </div>
    <div class="popup-body">
      <div class="body-main">
        <div class="popup-form">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-position="top"
            class="demo-ruleForm"
          >
            <el-form-item
              label="名称"
              prop="Subject"
            >
              <el-input style="width:232px"  ref="IssueType" v-model="ruleForm.IssueType"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input type="textarea" ref="Subject" v-model="ruleForm.Subject"></el-input>
            </el-form-item>
            
            <el-form-item
              label="类别"
              prop="Subject"
            >
            <div class="checkedcolor" :class="'color'+ruleForm.value"></div>
              <el-select class="colorcheck" v-model="ruleForm.value" placeholder="请选择">
                <el-option
                  key="1"
                  label="待办"
                  value="1">
                  <span class="color color1"></span>
                  <span>待办</span>
                </el-option>
                <el-option
                  key="2"
                  label="正在进行"
                  value="2">
                  <span class="color color2"></span>
                  <span>正在进行</span>
                </el-option>
                <el-option
                  key="3"
                  label="已完成"
                  value="3">
                  <span class="color color3"></span>
                  <span>已完成</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="popup-bottom">
      <div class="popup-footer">
      <el-button size="small" @click="submitForm('ruleForm')" type="primary">添加</el-button>
      <el-button size="small" @click="closepopup">取消</el-button>
    </div>
    </div>
    
  </div>
  </el-dialog>
</div>
  
</template>
<script>
import commonapi from '@/api/commonapi.js'
import researchelselect from '@/components/dropbtn/researchelselect.vue'
import icon from "@/icon/icon.vue";
import '@/style/popupstyle.css'
export default {
  inject:['reload'],
  props:['value'],
  components: {
    researchelselect,icon
  },
  mounted() {
  },
  computed:{
      show:{
          get(){
            return this.value
          },
          set(val){
              this.$emit('input',val)
          }
      }
  },
  watch:{
    
  },
  data() {
    return {
        index:0,
        createdagain:false,
      ruleForm: {
        Subject:'',
        ScheduledStart:'',
        ScheduledEnd:'',
        RegardingObjectId:{Id:''},
        IssueType:'',
        OwningUser:{Id:''},
        "ActivityTypeCode":"4212",
      },
      rules: {
        Subject: [{ required: true, message: "请输入事务标题", trigger: "blur" }],
        RegardingObjectId:{
          Id:[{ required: true, message: "请选择项目", trigger: "change" }]
        } ,
        ScheduledStart: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        ScheduledEnd: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },
      search:{RegardingObjectId:[],OwningUser:[],IssueType:[]},
      select:{},
      defaultdata:{RegardingObjectId:[]},
      
    };
  },
  created(){
    if(this.$route.params.projectname!=''){
      this.defaultdata.RegardingObjectId.push({
        ID:this.$route.query.id,
        Name:this.$route.params.projectname
      })
      this.ruleForm.RegardingObjectId = {
        Id:this.$route.query.id,
        Name:this.$route.params.projectname
      }
    }
    this.getdetail(4200)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          commonapi.entitysaverecord(this.ruleForm,4200).then(()=>{
            if(!this.createdagain){
              this.reload()
            }else{
              this.$message.success('创建成功')
              this.ruleForm.Subject = ''
              this.index++
              this.$refs.Subject.focus()
              this.$emit('created')
            }
          })
        } else {
          this.$message.error('请输入所有必填项')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    closepopup() {
        this.$emit('input',false)
    },
  },
};
</script>
<style scoped>
.popup-body{
  border-bottom: 2px solid #dedede;
  height: calc(95vh - 220px) !important;
}
.color{
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  margin-right: 5px;
}
.checkedcolor{
  width: 16px;
  height: 16px;
  border-radius: 4px;
  position: absolute;
  z-index: 2;
  margin-top: 12px;
  margin-left: 10px;
}
.colorcheck>>>.el-input__inner{
padding-left: 30px;
}
.color1{
  background-color: #dfe1e6;
}
.color2{
  background-color: #0052cc;
}
.color3{
  background-color: #14892c;
}
.el-select-dropdown__item{
  display: flex;
  align-items: center;
}
</style>