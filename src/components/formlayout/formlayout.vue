<template>
    <div class="container" :styletype="styletype">
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-position="top"
            class="demo-ruleForm"
          >
          <div v-for="item in layoutdata" :key="item.fieldId">
            <el-form-item v-if="item.fieldId=='TimeOriginalEstimate'"
              class="col2"
              :key="item.fieldId"
              :label="item.name"
              :prop="item.fieldId">
              <el-tooltip class="item" effect="dark" placement="bottom">
                    <div slot="content" class="tipsli">
                        使用此格式：2w 4d 6h 45m<br/>
                        <ul>
                            <li>w = 周</li>
                            <li>d = 天</li>
                            <li>h = 小时</li>
                            <li>m = 分钟</li>
                        </ul>
                    </div>
                    <el-input :disabled="!item.fieldConfig.isEditable" :ref="item.fieldId" v-model="ruleForm[item.fieldId]"></el-input>
                    </el-tooltip>
            </el-form-item>
            <el-form-item v-else-if="item.type=='text'"
              :key="item.fieldId"
              :label="item.name"
              :prop="item.fieldId">
              <el-input :disabled="!item.fieldConfig.isEditable" :ref="item.fieldId" v-model="ruleForm[item.fieldId]"></el-input>
            </el-form-item>
            <el-form-item
              v-else-if="item.type=='project'"
              :key="item.fieldId"
              :label="item.name"
              :prop="item.fieldId+'.Id'"
            >
            <researchelselect 
              :disabled="!item.fieldConfig.isEditable"
              :filterables="true"
              :defaultdata="defaultdata[item.fieldId]"
              v-model="ruleForm[item.fieldId].Id"
              :name="item.fieldId"
              objtypecode="20290"
              type="group" />
            </el-form-item>
            <el-form-item 
              v-else-if="item.type=='date'"
              :key="item.fieldId"
              :prop="item.fieldId"
              :label="item.name">
                  <el-date-picker
                  :disabled="!item.fieldConfig.isEditable"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    v-model="ruleForm[item.fieldId]"
                  ></el-date-picker>
            </el-form-item>
            <el-form-item
              v-else-if="item.type=='issuetype'"
              :key="item.fieldId"
              :prop="item.fieldId"
              :label="item.name">
              <researchelselect 
              :disabled="!item.fieldConfig.isEditable"
               :selectoptions="item.issueTypes.nodes"
                v-model="ruleForm[item.fieldId]"
                :name="item.fieldId" />
              </el-form-item>
              <el-form-item
              v-else-if="item.type=='priority'"
              :key="item.fieldId"
              :prop="item.fieldId"
              :label="item.name">
              <researchelselect 
                :disabled="!item.fieldConfig.isEditable"
                :selectoptions="item.priorities.nodes"
                v-model="ruleForm[item.fieldId]"
                :name="item.fieldId" />
              </el-form-item>
              <el-form-item
              v-else-if="item.type=='picklist'"
              :key="item.fieldId"
              :prop="item.fieldId"
              :label="item.name">
              <researchelselect 
              :disabled="!item.fieldConfig.isEditable"
                :picklist="true"
                :showicon="false"
                :selectoptions="item.pickValues.nodes"
                v-model="ruleForm[item.fieldId]"
                :name="item.fieldId" />
              </el-form-item>
              <el-form-item 
              v-else-if="item.type=='description'"
              :key="item.fieldId"
              :prop="item.fieldId"
              :label="item.name">
                <Editor
                  v-model="ruleForm.Description"
                ></Editor>
              </el-form-item>
              <el-form-item
              v-else-if="item.type=='user'"
              :key="item.fieldId"
              :prop="item.fieldId+'.Id'"
              :label="item.name">
              <researchelselect 
              :disabled="!item.fieldConfig.isEditable"
              :filterables="true"
              v-model="ruleForm[item.fieldId].Id"
              :defaultdata="defaultdata[item.fieldId]"
              :borderradius="true"
              optionsize="medium"
              :name="item.fieldId"
              :parentid="ruleForm.RegardingObjectId.Id"
              objtypecode="8" />
              </el-form-item>
              <el-form-item
              v-else-if="item.type=='attachment'"
              :key="item.fieldId"
              :label="item.name">
              <fileupload @finish="$emit('finish')" ref="fileupload" :itemid="itemid" :autoupload="false" :disabled="true" />

              </el-form-item>
          </div>
          </el-form>
    </div>
</template>
<script>

import Editor from "@/components/editor.vue";
import researchelselect from '@/components/dropbtn/researchelselect.vue'
import icon from "@/icon/icon.vue";
import fileupload from '@/components/fileupload.vue'
import {takentimechange} from '@/utils/formatdate.js'

export default {
  props:['request','styletype'],
  components: {
    Editor,researchelselect,icon,fileupload
  },
  mounted() {
  },
  watch:{
    
  },
  data() {
    return {
      itemid:'',
      layoutdata:{},
      ruleForm: {
        "ActivityTypeCode":"4212"
      },
      rules: {
        
      },
      search:{RegardingObjectId:[],OwningUser:[],IssueType:[]},
      select:{},
      defaultdata:{}
    };
  },
  created(){
    this.getdetail(4200)
      this.getlayout(this.$route.query.id).then(res=>{
        this.layoutdata = res.data.issueCreateFields.fields.nodes
        this.layoutdata.forEach((item)=>{
          if(item.type=='project'||item.type=='user'){
            this.$set(this.search,item.fieldId,{})
            this.$set(this.defaultdata,item.fieldId,[])
            this.$set(this.ruleForm,item.fieldId,{})
            if(item.fieldConfig.isRequired){
              this.rules[item.fieldId] = {Id:[{ required: true, message: "请输入"+item.name, trigger: "blur" }]}
            } 
          }else if(item.fieldId=='TimeOriginalEstimate'){
            this.rules[item.fieldId] = [{ validator: (rule, value, callback)=>{
              const pattern = /^((\d+[w]\s)?|(\d+[w])\b)((\d+[d]\s)|(\d+[d])\b)?((\d+[h]\s)|(\d+[h])\b)?(\d+[m])?$/ 
              if(value&&!pattern.test(value)){
                   callback('')
              }else{
                this.ruleForm[item.fieldId] = takentimechange(value)
                callback()
              }
            }, message: "请输入正确的格式 例：2w 4d 6h 45m", trigger: "blur" }]
            if(item.fieldConfig.isRequired){
              this.rules[item.fieldId].push({ required: true, message: "请输入"+item.name, trigger: "blur" })
            }
          }
          else{
            this.$set(this.ruleForm,item.fieldId,'')
            if(item.fieldConfig.isRequired){
              this.rules[item.fieldId] = [{ required: true, message: "请输入"+item.name, trigger: "blur" }]
            }
          }
          if(item.type=='project'){
            if(item.project.id!=null){
              this.ruleForm[item.fieldId] = {
                Id:item.project.id,
                Name:item.project.name,
              }
              this.defaultdata.RegardingObjectId.push({
                id:item.project.id,
                name:item.project.name,
                avatarValue:{
                  large: item.project.avatar.large,
                }
              })
            }else{
                  if(this.$route.params.projectname!=''){
                  this.ruleForm.RegardingObjectId = {
                    Id:this.$route.query.id,
                    Name:this.$route.params.projectname
                  }
                this.getdetail(20290,this.$route.query.id).then((res)=>{
                  this.defaultdata.RegardingObjectId.push({
                  id:this.$route.query.id,
                  name:this.$route.params.projectname,
                  avatarValue:{
                    large: res.record.Logo
                  }
                })
              })
              }
            }
          }
          if(item.type=='user'){
            if(item.user.accountId!=null){
              this.ruleForm[item.fieldId] = {
                Id:item.user.accountId,
                Name:item.user.name,
              }
              this.defaultdata[item.fieldId].push({
                ID:item.user.accountId,
                Name:item.user.name,
                Icon:item.user.picture!=null?item.user.picture:''
              })
            }
          }
          if(item.type=='issuetype'){
            if(item.issueType.id!=null){
              this.ruleForm[item.fieldId] = item.issueType.id
            }
          }
          if(item.type=='priority'){
            if(item.priority.id!=null){
              this.ruleForm[item.fieldId] = item.priority.id
            }
          }
          if(item.type=='picklist'){
            if(item.pickValue.value!=null){
              this.ruleForm[item.fieldId] = item.pickValue.value
            }
          }
          if(item.type=='date'){
            if(item.date!=null){
              this.ruleForm[item.fieldId] = item.date
            }
          }
          if(item.type=='description'){
            if(item.description!=null){
              this.ruleForm[item.fieldId] = item.description
            }
          }
          if(item.type=='text'){
            if(item.text!=null){
               this.ruleForm[item.fieldId] = item.text
            }
          }
          if(item.type=='avatarpicker'){
            if(item.Avatar.large!=null){
              this.$emit('createdavatarpicker',item.Avatar.large)
            }
          }
        })
        console.log(this.ruleForm.RegardingObjectId)
        if(!this.ruleForm.RegardingObjectId){
          this.ruleForm.RegardingObjectId={
            Id:this.$route.query.id,
            Name:this.$route.params.projectname
          }
        }
        //     if(this.$route.params.projectname!=''){
        //     this.ruleForm.RegardingObjectId = {
        //       Id:this.$route.query.id,
        //       Name:this.$route.params.projectname
        //     }
        //   this.getdetail(20290,this.$route.query.id).then((res)=>{
        //     this.defaultdata.RegardingObjectId.push({
        //     id:this.$route.query.id,
        //     name:this.$route.params.projectname,
        //     avatarValue:{
        //       large: res.record.Logo
        //     }
        //   })
          
        // })
        // }

      })
    
  },
  methods: {
    
    getlayout(){
        return this.request()
    },
    getfile(){
      console.log(this.$refs.fileupload)
      return this.$refs.fileupload[0].getfilelength()
    },
    submitfile(id){
      this.itemid = id
      return this.$refs.fileupload[0].submit()
    },
    getformdata(){
        var ruleForm = false
        this.$refs.ruleForm.validate((valid) => {
          console.log(valid,'valid')
            if (valid) {
                ruleForm =  this.ruleForm
            } 
            else {
                this.$message.error('请输入所有必填项')
                return false;
            }
        })
      return ruleForm
    },
    createdagain(){
        this.ruleForm.Subject = ''
        this.$refs.Subject[0].focus()
    }
  },
};
</script>
<style scoped>
.el-form--label-top >>> .el-form-item__label {
  padding-bottom: 0;
  line-height: 30px;
}
.line {
  text-align: center;
}
.el-form-item>>>.el-date-editor,.el-form-item>>>.el-select{
  width: 50%;
}
.col2{
  width: 50%;
}
</style>