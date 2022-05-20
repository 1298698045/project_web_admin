<template>
    <div class="template-container">
        <div class="search-container">
        <div class="item-container">
            <el-input
                class="searchinput"
                @change="searchtextchange"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="searctext">
            </el-input>
        </div>
        <div class="item-container">
            <filteruser @search="userchose" ref="filteruser" />
        </div>
        <div class="item-container">
            <div class="adduser" @click="addpeople">
                <img src="/static/img/svg/addpeople.svg" alt="">
            </div>
        </div>

        <!-- <div class="item-container">
            <checkboxdrop v-model="checkedlist">
                <span>长篇故事</span>
            </checkboxdrop>
        </div> -->
        <!-- <div class="item-container">
            <div class="dropbtn">
                清除筛选
            </div>
        </div> -->
    </div>
    <div class="operate-container">
        <div class="operate-item">
            <selectdrop @valuechange='valuechange' :selectdata="grouplist" :value="grouptype">
                <span>分组方式</span>
            </selectdrop>
       </div>
    </div>
    <el-dialog :append-to-body="true" :show-close="false" :visible.sync="addpeopledialog" width="400px" top="10vh">
        <addpeople></addpeople>
    </el-dialog>
    </div>
    
</template>
<script>
import filteruser from '@/components/filteruser.vue'
import checkboxdrop from '@/components/dropbtn/checkboxdrop.vue'
import selectdrop from '@/components/dropbtn/selectdrop.vue'
import Addpeople from '@/alert/addpeople.vue'

export default {
    data(){
        return {
            checkedlist:[],
            checkList:[],
            searctext:'',
            grouptype:'无',
            choseuser:false,
            addpeopledialog:false,
            userid:''
        }
    },
    props:['grouplist'],
    components:{
        filteruser,checkboxdrop,selectdrop,
        Addpeople
    },
    methods:{
        searchtextchange(val){
            this.searctext = val
            this.search()
        },
        userchose(id){
            this.userid = id
            this.search()
        },
        valuechange(val){
            this.grouptype = val
            this.search()
        },
        search(){
            this.$emit('search',this.grouptype,this.searctext,this.userid)
        },
        addpeople(){
            this.addpeopledialog  = true
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
    .dropbtn .el-dropdown{
        color:  rgb(66, 82, 110) !important;        
    }
    
</style>