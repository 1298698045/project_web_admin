<template>
    <div class="template-container">
        <div class="search-container">
        <div class="item-container">
            <el-input
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="input2">
            </el-input>
        </div>
        <div class="item-container">
            <div :class="{'active':choseuser}" class="userchose" @click="userchose">
                <Userhead :url="false" :width="'32px'" :height="'32px'" />
            </div>
        </div>
        <div class="item-container">
            <div class="adduser">
                <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fill-rule="evenodd"><rect x="18" y="5" width="2" height="6" rx="1"></rect><rect x="16" y="7" width="6" height="2" rx="1"></rect><path d="M5 14c0-1.105.902-2 2.009-2h7.982c1.11 0 2.009.894 2.009 2.006v4.44c0 3.405-12 3.405-12 0V14z"></path><circle cx="11" cy="7" r="4"></circle></g></svg>
            </div>
        </div>
        <div class="item-container">
            
        </div>
        <div class="item-container">
            <div class="dropbtn">
                清除筛选
            </div>
        </div>
    </div>
    <div class="operate-container">
        <div class="operate-item">
            <selectdrop @valuechange='valuechange' :selectdata="selectdata" :value="grouptype">
                <span>分组方式</span>
            </selectdrop>
       </div>
    </div>
    </div>
    
</template>
<script>
import Userhead from '../../../components/Userheadphoto.vue'
import checkboxdrop from '../../../components/dropbtn/checkboxdrop.vue'
import selectdrop from '../../../components/dropbtn/selectdrop.vue'

export default {
    data(){
        return {
            checkList:[],
            input2:'',
            grouptype:'无',
            choseuser:false,
            selectdata:['无','被分配人','长篇故事']
        }
    },
    components:{
        Userhead,checkboxdrop,selectdrop
    },
    methods:{
        userchose(){
            this.choseuser = !this.choseuser
        },
        valuechange(val){
            this.grouptype = val
            this.$emit('search',this.grouptype)
        }
    }
}
</script>
<style scoped>
    .template-container{
        padding: 10px 40px;
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .search-container{
        display: flex;
        align-items: center;   
    }
    .item-container{
        margin-right: 10px;
    }
    .adduser{
        width: 32px !important;
        height: 32px !important;
        line-height: 32px;
        color: rgb(122, 134, 154);
        background-color: rgb(223, 225, 230);
        border-radius: 50%;
        display: flex;
        align-items: center;   
        justify-content: center;
        cursor: pointer;
    }
    .userchose{
        padding: 2px;
        border-radius: 50%;
        height: 32px;
        width: 32px;
        border: 2px solid transparent;
    }
    .userchose.active{
        border: 2px solid rgb(0, 82, 204);
    }
    .dropbtn .el-dropdown{
        color:  rgb(66, 82, 110) !important;        
    }
    
</style>