<template>
    <div class="filter-container" ref='filtercontainer'>
        <boardhead :hiddenbread="$route.name=='mytask'" :name="$route.params.projectname" title="事务">
            <template slot="rightbtn">
                <div class="head-operate-item btn">导出</div>
                <div :class="{'active':itemactive=='list'}" class="head-operate-item btn" @click="itemactive='list';itemactivechange()">
                    列表视图
                </div>
                <div :class="{'active':itemactive=='detail'}" class="head-operate-item btn" @click="itemactive='detail';itemactivechange()">
                    详情视图
                </div>
            </template>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>导出</el-dropdown-item>
            </el-dropdown-menu>
        </boardhead>
        <div class="filter-search" ref='filtersearch' >
            <filtersearch @reload="getfilter" :filterdata="filterdata" @search="valuechange"></filtersearch>
        </div>
        <div class="detailcontiner" v-show="itemactive=='detail'">
            <div v-show="nodata"></div>
            <div v-show="!nodata">
                <div class="detail-left">
                <div class="detail-left-head">
                    <!-- <selectdrop @valuechange='valuechange' :selectdata="selectdata" :value="sortcol">
                        <span></span>
                    </selectdrop>
                    <i @click="sorttype='up'" class="hover-iconbtn el-icon-sort-up" v-if="sorttype=='down'"></i>
                    <i @click="sorttype='down'" class="hover-iconbtn el-icon-sort-down" v-if="sorttype=='up'"></i>
                     -->
                    <i @click="reloadtable" class="hover-iconbtn el-icon-refresh-right"></i>
                </div>
                <div class="detail-left-body">
                    <div class="detail-left-list" :style="{height:tableheight-100+'px'}">
                        <div @click="detailclick(item.id)" class="left-list-item" 
                        v-for="item in tableData" 
                        :key="item.id"
                        :class="{'active':item.id==detailid}">
                            <div class="list-item-title" v-html="item.Subject.textValue"></div>
                            <div class="list-item-body">
                                <div class="list-item-provect">
                                    <img src='/static/img/svg/issuetype.svg'>
                                    {{item.CreatedOn.dateTime.split(' ')[0]}}
                                </div>
                                    <span>{{item.CreatedBy.userValue.displayName}}</span>
                                <div class="list-item-user">
                                    <Userhead :url="item.CreatedBy.userValue.avatarUrl"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="detail-left-page">
                        <el-pagination
                        small
                        :page-size="10"
                        @current-change="handleCurrentChange"
                        :current-page="pageNumber"
                        layout="total,prev, pager, next"
                        :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="detail-right">
                <detail :popup="false" :itemid="detailid" :detailheight='tableheight-15+"px"'></detail>
            </div>
            </div>
            
        </div>
        <div class="list-container" v-show="itemactive=='list'">
            <commontable 
            ref="commontable" 
            :filterQuery="filterQuery"
            :defautfilterQuery="defautfilterQuery" 
            entityType="00U" 
            :filterId="$route.params.itemname" 
            :config="{
                height:tableheight-30
            }">
            <template v-slot:editbox>
                <el-table-column
        fixed="right"
        label="操作"
        width="50">
            <template slot-scope="scope">
                <el-dropdown trigger="click" @command="(common)=>{tableitemCommand(common,scope.row.id)}">
                <span class="el-dropdown-link">
                    <icon name="gengduo"/>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="detail">查看</el-dropdown-item>
                    <el-dropdown-item command="delete">删除</el-dropdown-item>
                    <el-dropdown-item command="pinglun">评论</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
                
         </template>
        </el-table-column>
            </template>
            

        </commontable>
        </div>
    </div>
</template>
<script>
import boardhead from '@/components/head/boardhead.vue';
import filtersearch from '@/components/filter/filter.vue'
import Userhead from '@/components/Userheadphoto.vue'
import detail from '@/views/projects/detail/detail.vue'
import selectdrop from '@/components/dropbtn/selectdrop.vue'
import commonapi from '@/api/commonapi'
import commontable from '@/components/table/commontable.vue'
import icon from '@/icon/icon.vue'
import {IssueListQuery} from '@/api/projectapi.js'

export default {
    data(){
        return{
            detailid:'',
            name:'123',
            selectdata:['无','被分配人','长篇故事'],
            sortcol:'被分配人',
            sorttype:'up',
            filterdata:{
            },
            itemactive:'',
            tableheight:'',
            tableData: [],
            filterQuery:'',
            searchtext:'',
            filterid:'',
            pageNumber:1,
            pageSize:10,
            nodata:false,
            total:0,
            defautfilterQuery:''
        }
    },
    beforeCreate(){
        
    },
    created(){
        
    },
    computed:{
    },
    components:{
        filtersearch,
        boardhead,
        Userhead,
        detail,
        selectdrop,
        commontable,
        icon
    },
    mounted(){
        this.itemactive = 'list'
        if(this.$route.params.itemname!='firstfilterid'){
            this.getfilter()
        }
    },
    methods:{
        tableitemCommand(common,id){
            if(common=='delete'){
               this.$refs.commontable.deleteitem(id)
            }
            if(common=='detail'){
               this.$refs.commontable.edititem(id)
            }
        },
        detailclick(id){
            this.detailid = id
        },
        gettableheight(){
            setTimeout(() => {
            this.tableheight = this.$refs.filtercontainer.clientHeight-124 - this.$refs.filtersearch.clientHeight
                
            }, 0);
            
        },
        itemactivechange(){
            if(this.itemactive=='list'){
                this.$nextTick(()=>{
                    this.$refs.commontable.tableresize()
                })
            }
            this.gettable()
        },
        valuechange(val,searchtext){
            this.filterid = ''
            this.searchtext = searchtext
            this.setfilterquery(val)
            this.gettable()
        },
        getfilter(){
            if(this.$route.params.itemname){
                this.filterid = this.$route.params.itemname
            }else{
                this.defautfilterQuery = '\nOwningUser\teq-userid'
                this.filterid = '00000000-0000-0000-00aa-000010001902'
            }
            commonapi.entityfilterget(this.filterid).then((res)=>{
                console.log(res)
                this.filterdata = res
                this.setfilterquery()
                this.gettable()
            })
        },
        setfilterquery(val){
            var filterQuery = ''
            if(this.$route.query.id){ 
             filterQuery = 'RegardingObjectId\teq\t'+this.$route.query.id
            }
            if(val){
                if(val.length>0){
                val.forEach(item => {
                const value = typeof item.value=='object'?item.value.join(','):item.value
                filterQuery += '\n'+item.column+'\t'+item.operator+'\t'+value
                });
                }
            }
            this.filterQuery = filterQuery
        },
        gettable(){
            this.gettableheight()
            if(this.itemactive == 'list'){
                this.$refs.commontable.init(this.filterid,this.searchtext)
            }else{
                this.getdetailtabldelist()
            }
        },
        getdetailtabldelist(){
            var query = {
                pageNumber:this.pageNumber,
                pageSize:this.pageSize,
                search:this.searchtext
            }
            let filterquery = this.filterquery
            filterquery += this.defautfilterQuery
            IssueListQuery('00U',filterQuery,this.filterid,query).then((data)=>{
                this.tableData = data.data.issues.nodes
                this.total = data.data.totalCount
                if(this.tableData.length>0){
                    this.detailid = this.tableData[0].id
                    this.nodata = false
                }else{
                    this.nodata = true
                }
            })
        },
        reloadtable(){
            this.gettable()
        },
        handleCurrentChange(a){
            this.pageNumber = a
            this.gettable()
        }
    },
    watch:{
        '$store.state.firstprojectfilterid'(val){},
        $route(router){
            this.getfilter()
        }
    }
}
</script>
<style scoped>
.filter-container{
    height: 100%;
}
    .head-operate-item.active{
        color: #409eff !important;
        background: #ecf5ff;
    }
    .list-container{
        padding: 0 40px;
    }
    .flexbox{
        display: flex;
    }
    .item-name{
        margin-left: 5px;
    }
    .detailcontiner>div{
        display: flex;
    }
    .detail-left{
        min-width: 240px;
        flex:none;
    }
    .detail-left{
        background-color: #f2f2f2;
        border-radius: 4px;
        padding: 10px;
        margin: 20px 20px 0 40px;
    }
    .detail-left-head>div{
        display: inline-block;
    }
    .detail-left-head>i{
        margin-left: 5px !important;
        display: inline-block;

    }
    .detail-left-head>>>.dropbtn{
        padding: 5px 10px !important;
        margin-right: 50px;
    }
    .left-list-item{
        background-color: #fff;
        border-bottom: 1px solid #dedede;
        padding: 10px;
    }
    .left-list-item.active{
        background-color: rgb(222, 235, 255);
    }
    .list-item-body{
        display: flex;
        justify-content: space-between;
    }
    .list-item-title{
        padding: 5px 0 15px 0;
    }
    .list-item-provect img{
        float: left;
        margin-top: 2px;
        margin-right: 5px;
    }
    .detail-left-list{
        border-radius: 4px;
        overflow: auto;

    }
    .detail-left-body{
        box-sizing: border-box;
        margin-top: 10px;
    }
    .detail-left-page{
        margin-top: 15px;
    }
    .el-pagination>>>*{
        background-color: transparent;
    }
    .el-pagination>>>.number{
        color: #555;
    }
    .el-pagination>>>.number:hover,.el-pagination>>>.number.active{
            color: #409EFF;
    }
    .el-pagination>>>button:disabled{
        background-color: transparent;
    }
</style>