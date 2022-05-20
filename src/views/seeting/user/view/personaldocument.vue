<template>
    <div class="information">
        <div class="information-head">
            <div class="information-title">个人资料和可见性</div>
            <div class="information-description">管理您的个人信息，并控制可供其他人查看和应用访问的信息。</div>
        </div>
        <div class="information-body">
            <div class="information-item-title">个人资料照片</div>
            <div class="user-head">
              <div class="userimg">
                <el-upload
            :show-file-list="false"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/">
            <Userhead :url="false" height='100px'  width='100px'/>
            </el-upload>
              </div>
              <div class="userhead-top">
                <img src="/static/img/svg/bgsvg.svg" alt="">
              </div>
              <div class="userhead-bottom">
                <div class="sharebox">
                  <div class="sharebox-label">哪些人可以查看您的个人资料照片？</div>
                  <div class="sharebox-value disbled">
                    <div class="sharebox-value-left">
                    <img src="/static/img/svg/shareshow.svg" alt="">
                    <span>任何人</span>
                    </div>
                    <div class="sharebox-value-right">
                    <i class="el-icon-arrow-down selecticon"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="information-item-title">您的个人信息</div>
            <div class="information-main">
               <div class="information-form-item">
                 <div class="information-form-item-left">
                   <div class="form-item-label">全名</div>
                   <div class="form-item-value">
                     jack liu
                   </div>
                 </div>
                 <div class="information-form-item-right">
                   <div class="sharebox">
                  <div class="sharebox-label">谁可以查看此项？</div>
                  <div class="sharebox-value">
                    <div class="sharebox-value-left">
                    <img src="/static/img/svg/shareshow.svg" alt="">
                    <span>任何人</span>
                    </div>
                    <div class="sharebox-value-right">
                    <i class="el-icon-arrow-down selecticon"></i>
                    </div>
                  </div>
                </div>
                 </div>
               </div>
               <div class="information-form-item">
                 <div class="information-form-item-left">
                   <div class="form-item-label">公开名称</div>
                   <div class="form-item-value">
                     jack liu
                   </div>
                 </div>
                 <div class="information-form-item-right">
                   <div class="sharebox">
                  <div class="sharebox-value bottom">
                    <div class="sharebox-value-left">
                    <img src="/static/img/svg/shareshow.svg" alt="">
                    <span>任何人</span>
                    </div>
                    <div class="sharebox-value-right">
                    <i class="el-icon-arrow-down selecticon"></i>
                    </div>
                  </div>
                </div>
                 </div>
               </div>
               <div class="information-form-item">
                 <div class="information-form-item-left">
                   <div class="form-item-label">部门</div>
                   <div class="form-item-value">
                     产品研发部
                   </div>
                 </div>
                 <div class="information-form-item-right">
                   <div class="sharebox">
                  <div class="sharebox-value bottom">
                    <div class="sharebox-value-left">
                    <img src="/static/img/svg/shareshow.svg" alt="">
                    <span>任何人</span>
                    </div>
                    <div class="sharebox-value-right">
                    <i class="el-icon-arrow-down selecticon"></i>
                    </div>
                  </div>
                </div>
                 </div>
               </div>
               <div class="information-form-item">
                 <div class="information-form-item-left">
                   <div class="form-item-label">组织</div>
                   <div class="form-item-value">
                     前端研发组
                   </div>
                 </div>
                 <div class="information-form-item-right">
                   <div class="sharebox">
                  <div class="sharebox-value bottom">
                    <div class="sharebox-value-left">
                    <img src="/static/img/svg/shareshow.svg" alt="">
                    <span>任何人</span>
                    </div>
                    <div class="sharebox-value-right">
                    <i class="el-icon-arrow-down selecticon"></i>
                    </div>
                  </div>
                </div>
                 </div>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
import Userhead from '@/components/Userheadphoto.vue'

  export default {
    data() {
      return {
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
      };
    },
    components:{
        Userhead
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
    }
  }
</script>
<style scoped>
    .information{
        width: 600px;
        margin: 0 auto;
        padding-bottom: 50px;
    }
    .information-title{
      font-size: 24px;
      line-height: 80px;
    }
    .information-item-title{
      font-size: 16px;
      line-height: 40px;
      color: #000;
      font-weight: 700;
      margin-top: 20px;

    }
    .userhead-top img{
      width: 100%;
      height: 112px;
      object-fit: cover;
    }
    .userhead-bottom{
      height: 112px;
    }
    .user-head{
      border:1px solid #dedede ;
      position: relative;
    }
    .userimg{
      position: absolute;
      top: 50px;
      left: 50px;
    }
    .userimg>>>.item-img{
      width: 100px;
      height: 100px;
    }
    .userhead-bottom .sharebox{
      position: absolute;
      right: 20px;
      font-size: 12px;
      color: #666;
      margin-top: 15px;
    }
    .sharebox-label{
      margin-bottom: 10px;
    }
    .sharebox-value{
      display: flex;
      align-items: center;
      width: 150px;
      color: #000;
      opacity: 0.8;
      padding: 5px;
      justify-content: space-between;
    }
    .sharebox-value.disbled{
      background: none !important;
      cursor: not-allowed !important;
      opacity: 0.5 !important;
    }
    .sharebox-value.disbled .selecticon{
      display: none !important;
    }
    .sharebox-value-left{
      display: flex;
      align-items: center;
    }
    .sharebox-value:hover{
      background-color: #ccc;
      cursor: pointer;
      border-radius: 4px;
    }
    .sharebox-value .selecticon{
      display: none;
      margin-right: 5px;
    }
    .sharebox-value:hover .selecticon{
      display: inline-block;
    }
    .sharebox-value img{
      margin-right: 10px;
    }
    .information-main{
      border: 1px solid #dedede;
      padding: 20px;
    }
    .information-form-item{
      display: flex;
      justify-content: space-between;
    }
    .form-item-value{
      padding: 9px;
      width: 250px;
      margin-top: 10px;
      font-size: 12px;
      border-radius: 4px;
    }
    .form-item-value:hover{
      background-color: #ddd;
      cursor: pointer;
    }
    .form-item-label{
      padding-left: 6px;
      font-weight: 700;
      font-size: 12px;
    }
    .information-form-item{
      margin-bottom: 30px;
    }
    .sharebox-value.bottom{
      margin-top: 28px;
    }
</style>