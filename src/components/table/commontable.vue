<template>
      <div class="commontable-container">
          
    <el-table
     ref="table"
     highlight-current-row
     v-loading="loading"
    element-loading-text="正在加载，请稍后"
    element-loading-spinner="el-icon-loading"
    :data="tableData"
    v-bind="config"
    @sort-change="sortchange"
    style="width: 100%">
    <slot name="editbox">
    <el-table-column
        fixed="right"
        label="操作"
        width="100">
            <template slot-scope="scope">
            <el-button type="text" size="small" @click="edititem(scope.row.LIST_RECORD_ID)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteitem(scope.row.LIST_RECORD_ID)">删除</el-button>
        </template>
        </el-table-column>
     </slot>
    <el-table-column
      sortable="custom"
      v-for="item in tablecolumns" :key="item.fieldId"
      :width="item.width"
      :min-width="item.fieldId=='Subject'?400:
      item.fieldId=='IssueType'?80:
      item.fieldId=='IssueKey'?150
      :150"
      :prop="item.fieldId"
      :show-overflow-tooltip="true"
      :label="item.name">
      <template slot-scope="scope">
          <div v-if="scope.row[item.fieldId]">
            <div v-if="item.fieldId=='IssueKey'">
              <div class="opendetail">
                <span class="keytext" @click="opendetail(scope.row.id)">{{scope.row[item.fieldId].stringValue}}</span>
                <span><copylink :copy="scope.row.id"/></span>
              </div>
            </div>
            <div class="table-cell" v-else-if="scope.row[item.fieldId].__typename=='TextField'">
                <span v-if="item.fieldId=='Subject'" class="keytext Subject" @click="opendetail(scope.row.id)">{{scope.row[item.fieldId].textValue}}</span>
                <span v-else>{{scope.row[item.fieldId].textValue}}</span>
            </div>
            <div class="table-cell" v-else-if="scope.row[item.fieldId].__typename=='StatusField'">
                <div @click="$set(scope.row[item.fieldId],'edit',true)"  :class="'statusCategoryId hover statusCategoryId'+scope.row[item.fieldId].statusCategoryId">                
                    <choosestatus 
                        @change="(statusId,name,statusCategoryId)=>statuschange(statusId,name,statusCategoryId,scope.row[item.fieldId])"
                        :rowid="scope.row.id" 
                        :label="scope.row[item.fieldId].name" 
                        :statusdata="item.statuss.nodes"/>
                </div>
            </div>
            <div class="table-cell" v-else-if="scope.row[item.fieldId].__typename=='DateTimeField'">{{scope.row[item.fieldId].dateTime}}</div>
            <div class="table-cell" v-else-if="scope.row[item.fieldId].__typename=='IssueTypeField'">
                <el-tooltip class="item" effect="dark" :content="scope.row[item.fieldId].name" placement="top">
                    <img class="iconsvg" :src="scope.row[item.fieldId].iconUrl!=null?'/static/img'+scope.row[item.fieldId].iconUrl:'task.svg'" alt="">
                </el-tooltip>
            </div>
            <div class="table-cell" v-else-if="scope.row[item.fieldId].__typename=='UserField'">
                <div class="svgfieldcontainer">
                    <div>
                        <Userhead :popover="true" 
                            :url="scope.row[item.fieldId].userValue.avatarUrl"
                            :userid="scope.row[item.fieldId].userValue.accountId" />
                    </div>
                    <div>
                        {{scope.row[item.fieldId].userValue.displayName}}
                    </div>
                </div>
            </div>
            <div class="table-cell" v-else-if="scope.row[item.fieldId].__typename=='PriorityField'">
                <div class="svgfieldcontainer">
                    <div>
                        <img class="iconsvg" :src="scope.row[item.fieldId].iconUrl!=null?'/static/img'+scope.row[item.fieldId].iconUrl:'task.svg'" alt="">
                    </div>
                    <div>
                        {{scope.row[item.fieldId].name}}
                    </div>
                </div>
            </div>
          </div>
      </template>
    </el-table-column>    
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNumber"
      :page-sizes="[10, 20, 30, 50, 100, 200]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    <el-dialog title="任务详情" :visible.sync="detaildialog" width="80%" top="5vh">
        <itemdetail @close="detaildialog=false" :itemid="detailid"></itemdetail>
    </el-dialog>
    </div>
</template>
<script>
import Userhead from '@/components/Userheadphoto.vue'
import commonapi from '@/api/commonapi.js'
import itemdetail from "@/views/projects/detail/detail.vue"
import choosestatus from '@/components/choosestatus.vue'
import {IssueListQuery,GlobalIssueListHeaderLoad} from '@/api/projectapi.js'
import copylink from "@/components/copylink.vue";

export default {
  data() {
    return {
        detaildialog:false,
        tableconfig:{DataSet:{Columns:[]}},
        tablecolumns:[],
        tableData:[],
        totalCount:0,
        pageNumber:1,
        pageSize:20,
        filterid:'',
        searchtext:'',
        detailid:'',
        ObjectTypeCode:4200,
        loading:true,
        sort:null,
        order:null
    };
  },
  props:['entityType','objtypecode','config','filterQuery','defautfilterQuery'],
  components:{
      Userhead,itemdetail,choosestatus,copylink
  },
  created(){
    //   this.init()
  },
  methods:{
      opendetail(id){
        this.detaildialog=true
        this.detailid=id
        },
      statuschange(statusId,name,statusCategoryId,item){
          item.name = name
          item.statusCategoryId = statusCategoryId
          item.statusId = statusId
      },
      edititem(id){
          this.detaildialog = true
          this.detailid = id
      },
      deleteitem(id){
          this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
            }).then(() => {
                commonapi.entitydelete(this.ObjectTypeCode,id).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getlist()
                })
            }).catch(() => {
                
            });
          
      },
      handleClick(){},
      init(filterid,searchtext){
          this.filterid = filterid 
          this.searchtext = searchtext 
          this.getconfig().then(()=>{
            this.getlist()
          })
      },
      getconfig(){
        //   return commonapi.getentitygridconfig(this.entityType).then((data)=>{
        //       this.tableconfig = data
        //   })
        return GlobalIssueListHeaderLoad(this.filterid).then((data)=>{
            this.tablecolumns = data.data.issueListFields.fields.nodes
            // this.tableconfig = {
            //     DataSet:{
            //         Columns:data.data.issues.nodes
            //     },
            //     ObjectTypeCode:4200
            // }
        })
      },
      getlist(){
        this.loading = true
        var query = {
              pageNumber:this.pageNumber,
              pageSize:this.pageSize,
              search:this.searchtext,
              sort:this.sort,
              order:this.order
        }
        // commonapi.entitygridsearch(this.entityType,this.filterQuery,this.filterid,query).then((data)=>{
        //     this.tableData = data
        //     this.$emit('created',data)
        //     this.tableresize()
        // })
        this.$nextTick(()=>{
            let filterQuery = this.filterQuery 
            filterQuery += this.defautfilterQuery
            IssueListQuery(this.entityType,filterQuery,this.filterid,query).then((data)=>{
                this.tableData = data.data.issues.nodes
                this.totalCount = data.data.totalCount
                this.$emit('created',data)
                this.tableresize()
            })
        })
      },
      handleSizeChange(val) {
          this.pageNumber = 1
          this.pageSize = val
          this.getlist()
      },
      handleCurrentChange(val) {
          this.pageNumber = val
          this.getlist()
      },
      tableresize(){
        this.$refs.table.doLayout()
        this.loading = false
      },
      sortchange(object){
            let order = object.order
            if(order!=null){
                if(order=='ascending'){
                order = 'asc'
                }else{
                order = 'desc'
                }
                this.order=order
                this.sort = object.prop
            }else{
               this.order=null
                this.sort = null
            }
            this.getlist()
      }
  }
};
</script>
<style scoped>
.el-table>>>.cell{
    white-space: nowrap;
}
.el-pagination{
    margin-top: 10px;
}
.svgfieldcontainer{
    display: flex;
    align-items: center;
    text-align: left;
}
.svgfieldcontainer>div:first-child{
    margin-right : 5px;
    display: flex;
    align-items: center;
}
.iconsvg{
    width: 16px;
    height: 16px;
}
.statusCategoryId>>>.el-dropdown-link{
    font-size: 14px;
}
.statusCategoryId>>>.el-icon--right{
    margin-left: 0;
}
.el-table>>>.el-table__row.current-row{
    box-shadow: inset 2px 0 rgb(13 20 36 / 63%);
    margin-left: 2px
}
.copylink{
    visibility: hidden;
    cursor: pointer;
    width: 18px;
}
.keytext{
  cursor: pointer;
}
.opendetail{
  color: rgb(137, 147, 164);
}
.keytext:hover{
  text-decoration: underline;
}
.opendetail>span{
  display: flex;
  align-items: center;
}
.opendetail:hover .copylink{
    visibility: initial;
}
.opendetail{
  display: flex;
}
.copylink>>>.svgicon{
  width: 18px;
}
.Subject{
    color: #108def;
}
</style>