<template>
    <div class="popup">
        <div class="popup-head">
            <div class="popup-title">添加通知</div>
            <div class="popup-des">下次发生此事件时，用户将会收到通知。</div>
        </div>
        <div class="popup-body">
            <div class="body-main">
            <div class="popup-form">
               
            <div class="item-title">发生此情况时</div>
            <el-select  v-model="value2"  placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>

            <div class="item-title">发送通知到</div>
            <el-checkbox-group v-model="checkList">
                <el-checkbox label="所有关注人"></el-checkbox>
                <el-checkbox label="当前经办人"></el-checkbox>
                <el-checkbox label="当前用户"></el-checkbox>
                <el-checkbox label="报告人"></el-checkbox>
                <el-checkbox label="项目负责人"></el-checkbox>
                <el-checkbox label="项目角色"></el-checkbox>
            </el-checkbox-group>
            </div>
        </div>
        
        </div>
        <div class="popup-footer">
            <el-button size="small" @click="closepopup">取消</el-button>
            <el-button size="small" type="primary">添加</el-button>
        </div>
    </div>
</template>
<script>

  export default {
      components:{
    },
    mounted() {

    },
    data() {
      return {
          checkList:[],
        options: [{
          value: '选项1',
          label: '创建事务'
        }, {
          value: '选项2',
          label: '删除事务'
        }, {
          value: '选项3',
          label: '完成事务'
        }, {
          value: '选项4',
          label: '问题已更新'
        }, {
          value: '选项5',
          label: '已添加事务评论'
        }],
        value1: [],
        value2: ''
      }
    },
    methods: {
     
      closepopup(){
          this.$parent.$parent.addnoticedialog = false
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
    padding-bottom: 0;

}
.popup-body{
    height: 300px;
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
.popup-head{
    display: block;
}
.popup-des{
    margin-top: 10px;
}
.el-checkbox{
    display: block;
    line-height: 25px;
}
</style>