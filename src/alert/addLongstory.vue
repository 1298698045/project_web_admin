<template>
    <div class="popup">
        <div class="popup-head">
            <div class="popup-title">添加长篇故事</div>
        </div>
            <div class="popup-des">为这些事务选择一个父事务。事务一次只能属于一项父事务。</div>

        <div class="popup-body">
            <div class="body-main">
            <div class="popup-form">
            <div class="item-title">长篇故事</div>
            <el-select  v-model="value2"  placeholder="请选择">
                <el-option
                v-for="item in options"
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
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value1: [],
        value2: ''
      }
    },
    methods: {
     
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
.popup-des{
    padding:5px 20px;
}
</style>