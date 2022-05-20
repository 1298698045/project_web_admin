<template>
<div class="container">
    <el-dialog title="新建优先级" :visible.sync="show" top="50px" width="400px">
        <div class="popup">
    <div class="popup-head">
      <div class="popup-title">列限制</div>
    </div>
    <div class="popup-body">
      <div class="body-main">
        <div>如果此列中的事务数量超过此限制，我们将突出显示此列。</div>
       <div style="margin-top:20px">最大事务数</div>
       <div>
           <el-input>
           </el-input>
       </div>
      </div>
    </div>
    <div class="popup-bottom">
      <div class="popup-footer">
      <el-button size="small" @click="submitForm('ruleForm')" type="primary">保存</el-button>
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
    };
  },
  created(){
  },
  methods: {

    closepopup() {
        this.$emit('input',false)
    },
  },
};
</script>
<style scoped>
.popup-body{
  height: 220px !important;
}
</style>