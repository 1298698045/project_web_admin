<template>
    <div class="container">
        <div class="popup-body">
        <div class="popup-des">添加指向常用资源的链接，例如 Web 页面或 Confluence 中的其他页面。</div>
        <div class="popup-form">
            <div class="popup-form-item">
                <div class="form-label">Web地址</div>
                <div class="form-input">
                    <el-input size="small"></el-input>
                </div>
            </div>
            <div class="popup-form-item">
                <div class="form-label">名称(可选)</div>
                <div class="form-input">
                    <el-input size="small"></el-input>
                </div>
            </div>
            <div class="popup-form-item">
                <div class="form-label"></div>
                <div class="btn">添加快捷键</div>
            </div>
        </div>
        <div class="spaceshortcuts-list">
                <draggable
      handle=".spaceshortcuts-drag"
      class="contentlist"
      v-model="listdata"
      animation="300"
      dragClass="dragClass"
      ghostClass="ghostClass"
      chosenClass="chosenClass"
    >
    <div v-for="i in 10" :key="i" class="spaceshortcuts-item">
                <div class="spaceshortcuts-drag"><icon name="tuozhuai"/></div>
                <div><icon name="kuaijiefangshi"/></div>
                <div class="spaceshortcuts-name">快捷键1</div>
                <div class="spaceshortcuts-delete"><icon name="shanchu"/></div>
            </div>
    </draggable>
            
        </div>
      </div>
      <span  class="popup-footer">
        <el-button size="small" type="primary" @click="edittspaceshortcuts = false">保 存</el-button>
        <el-button size="small"  @click="edittspaceshortcuts = false">取 消</el-button>
      </span>
      <div style="clear:both"></div>
    </div>
</template>
<script>
import icon from "@/icon/icon.vue";
import draggable from "vuedraggable"

export default {
    components: {
    icon,draggable
  },
}
</script>
<style scoped>
.showhead .popup-body{
  height: auto;
  padding: 0;
}
.popup-footer{
    float: right;
}
.popup-form{
    display: flex;
    align-items: center;
}
.form-label{
    height: 20px;
    font-size: 12px;
}
.popup-form-item{
    margin-right: 10px;
}
.spaceshortcuts-list{
    height: 300px;
    overflow: auto;
}
.popup-des,.popup-form,.spaceshortcuts-list{
    padding: 10px 20px;
}
.spaceshortcuts-item{
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 4px;
}
.spaceshortcuts-item:hover{
    background-color: #f2f2f2;
}
.spaceshortcuts-drag{
    margin-right: 15px;
    cursor: pointer;
}
.spaceshortcuts-drag>>>svg{
    height: 32px;
    width: 32px;
    color: #333;
}
.spaceshortcuts-name{
    width: 400px;
    margin: 0 15px;
}
.spaceshortcuts-delete{
    cursor: pointer;
}
</style>