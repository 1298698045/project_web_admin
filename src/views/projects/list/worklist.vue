<template>
  <div class="main-container">
    <boardhead :name="$route.params.projectname" title="列表">
      <template slot="rightbtn">
        <!-- <checkboxdrop 
         v-if="showtablecolumncheckboxdrop"
         v-model="tablecolumnchecklist"
         :shownumber="false"
         :filterdata="tablecolumndata.list" class="setcol">
          <span style="display:flex"><i class="el-icon-setting" style="font-size:18px;margin-right:5px"></i>
          <span>设置显示列</span>
          </span>
        </checkboxdrop> -->
        <div class="usercontent">
          <div class="item-container">
                <filteruser @search="userchose" />
            </div>
            <div class="item-container">
                <adduser />
            </div>
        </div>
        <sharepopup></sharepopup>
        <heightfilter 
        :columndata="tablecolumn"
         @change="filterchange" 
         style="margin-right: 10px"></heightfilter>
         <div class="hoverbtn">导出</div>
      </template>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <el-switch  v-model="showClosedItem" inactive-text="显示已完成的项目"></el-switch>
        </el-dropdown-item>
      </el-dropdown-menu>
    </boardhead>
    <div class="container">
      <div class="container-flexbox">
        <div class="leftshelterbox"></div>
        <div class="main-container-body">
          <div class="tablecolumncheckcontainer">
            <checkboxdrop 
              :showicon="true"
              v-if="showtablecolumncheckboxdrop"
              v-model="tablecolumnchecklist"
              :shownumber="false"
              :filterdata="tablecolumndata.list" class="setcol">
                <span class="tablecolumncheckcontainer-btn">
                  <svgicon name="add" />
                </span>
              </checkboxdrop>
          </div>
          <el-skeleton
          :loading="loading"
            animated
          >
      <template slot="template">
        <tableskeleton />
      </template>
      <template>
          <el-table
            @cell-mouse-enter="(row)=>{this.hoverrowid = row.id}"
            height="calc(100vh - 280px)"
            :border="true"
            v-if="showtable"
            ref="dragTable"
            row-key="id"
            :data="tableData"
            :header-cell-class-name="headercellclassname"
            @cell-click="cellclick"
            @expand-change="expandchange"
            @sort-change="sortchange"
            style="width: 100%">
          >
            <el-table-column
              :class-name="item.type"
              v-for="(item,index) in tablecolumnchecked"
              :key="item.fieldId"
              :prop="item.fieldId"
              :sortable="item.fieldId!='IssueType'?'custom':false"
              :label="item.name"
              :width="item.width"
              :min-width="item.fieldId=='Subject'?400:
              item.fieldId=='IssueType'?100:
              item.fieldId=='IssueKey'?150
              :150"
            >
              <template slot-scope="scope">
                <div v-if="scope.row[item.fieldId]">
                <div v-if="item.type=='issuetype'" class="col-head" :rowid="scope.row.id" :parentrowid="scope.row.parentid">
                  <div>
                    <span class="sorthandle" v-if="hoverrowid==scope.row.id">
                    ⠿
                  </span>
                  <div class="paddingbox" :class="{'children':scope.row.parentid}"></div>
                  <div>
                    <img class="issuetypeimg" :src='"/static/img"+scope.row[item.fieldId].iconUrl' alt="">
                  </div>
                  <div 
                  v-if="scope.row.children" 
                  v-show="hoverrowid==scope.row.id"
                  @click="addchidren(scope.row,scope.$index)" 
                  class="addchildren"><i class="el-icon-plus"></i></div>
                  <div class="newbox" v-if="scope.row.newrow==true">
                  <img src="/static/img/images/icons/issuetypes/subtask.png" alt="" class="issuetypeimg">
                    <input placeholder="需要做些什么" 
                      @blur="finishednewchildren('blur')" 

                      @keydown="e=>{finishednewchildren(e)}" ref="newbox" 
                      v-model="scope.row.text"/>
                  </div>
               </div>
                </div>
                <div v-else>
                  <!-- <div v-if="scope.row.edit==item.prop"> -->
                  <div v-if="item.fieldConfig.isEditable==true">
                  <div v-if="item.type == 'status'" class="statuscol" :class="{'active':statusindex==scope.$index}">
                    <div @click="$set(scope.row[item.fieldId],'edit',true);statusindex=scope.$index"  :class="'statusCategoryId hover statusCategoryId'+scope.row[item.fieldId].statusCategoryId">                
                      <choosestatus 
                          @visiblechange="visiblechange"
                          @change="(statusId,name,statusCategoryId)=>statuschange(statusId,name,statusCategoryId,scope.row[item.fieldId])"
                          :rowid="scope.row.id" 
                          :label="scope.row[item.fieldId].name" 
                          :statusdata="item.statuss.nodes"/>
                    </div>
                  </div>
                <div v-else-if="item.type == 'priority'" class="prioritycontainer">
                  <researchelselect 
                  @change="(val)=>{celldatachange(val,scope.row.id,item.fieldId)}"
                  :selectoptions="item.priorities.nodes"
                  v-model="scope.row[item.fieldId].id"
                  :name="item.fieldId" />
                </div>

                <div v-else-if="item.type == 'date'">
                  <el-date-picker
                    @change="(val)=>{celldatachange(val,scope.row.id,item.fieldId)}"
                    ref="editcell"
                    v-model="scope.row[item.fieldId].date"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>
                <div v-else-if="item.type == 'dateTime'">
                  <el-date-picker
                    ref="editcell"
                    @change="(val)=>{celldatachange(val,scope.row.id,item.fieldId)}"
                    v-model="scope.row[item.fieldId].dateTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>

                <div v-else-if="item.type == 'selects'">
                  <el-select
                    reftype="selects"
                    :collapse-tags='true'
                    multiple
                    filterable
                    ref="editcell"
                    v-model="scope.row[item.prop]"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="options in options"
                      :key="options.value"
                      :label="options.label"
                      :value="options.value"
                    >
                    </el-option>
                  </el-select>
                 </div>
                <div v-else-if="item.type=='user'">
                  <researchelselect 
                  @change="(val)=>{celldatachange(val,scope.row.id,item.fieldId,2)}"
                  :filterables="true"
                  v-model="scope.row[item.fieldId].userValue.accountId"
                  :defaultdata="[{
                    ID:scope.row[item.fieldId].userValue.accountId,
                    Name:scope.row[item.fieldId].userValue.displayName,
                    Icon:scope.row[item.fieldId].userValue.avatarUrl!=null?scope.row[item.fieldId].userValue.avatarUrl:''
                  }]"
                  :borderradius="true"
                  optionsize="medium"
                  :name="item.fieldId"
                  objtypecode="8" />
                    <!-- <div>
                        <Userhead :popover="true" 
                            :url="scope.row[item.fieldId].userValue.avatarUrl"
                            :userid="scope.row[item.fieldId].userValue.accountId" />
                    </div>
                    <div>
                        {{scope.row[item.fieldId].userValue.displayName}}
                    </div> -->
                </div>
                <div v-else-if="item.type=='summary'">
                    <el-input  
                      @change="(val)=>{celldatachange(val,scope.row.id,item.fieldId)}"
                      ref="editcell" v-model="scope.row[item.fieldId].textValue"></el-input>
                </div>
                <div v-else-if="item.fieldId=='TimeOriginalEstimate'">
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
                    <el-input
                    :class="{'error':scope.row.error}"
                    @change="(val)=>{celldatachange(val,scope.row.id,item.fieldId,'',scope.row)}"
                    ref="editcell" v-model="scope.row[item.fieldId].originalEstimate"></el-input>
                    </el-tooltip>
                </div>
                <div v-else>
                    <el-input  
                      @change="(val)=>{celldatachange(val,scope.row.id,item.fieldId)}"
                      ref="editcell" v-model="scope.row[item.fieldId].textValue"></el-input>
                </div>
                  </div>
                  <div v-else class="cell-value">
                    <div v-if="item.type=='date'">
                      {{scope.row[item.fieldId].date}}
                    </div>
                    <div v-else-if="item.type=='datetime'">
                      {{scope.row[item.fieldId].dateTime}}
                    </div>
                    <div v-else-if="item.fieldId=='IssueKey'">
                      <div class="opendetail">
                        <span class="keytext" @click="opendetail(scope.row.id)">{{scope.row[item.fieldId].stringValue}}</span>
                        <span><copylink :copy="scope.row.id"/></span>
                      </div>
                    </div>
                    <!-- <div v-if="item.templatetype == 'tag'">
                      <el-tag type="success" size="mini">{{scope.row[item.fieldId]}}</el-tag>
                    </div>
                    <div v-else-if="item.templatetype == 'time'">
                      <span class="timetemplate tagtemplate">{{scope.row[item.fieldId]}}</span>
                    </div>
                    <div v-else-if="item.templatetype == 'tags'" class="tagscontainer">
                      <span class="tagtemplate" v-for="tag in scope.row[item.fieldId]" :key="tag">
                        <span>{{tag}}</span>
                      </span>
                    </div> -->
                    <div v-else-if="item.fieldId=='TimeOriginalEstimate'">
                      {{scope.row[item.fieldId].originalEstimate}}
                    </div>
                    <div v-else>
                      {{scope.row[item.fieldId]}}
                    </div>
                  </div>
                </div>
                </div>
              </template>
              <template slot="header" slot-scope="scope">
                <span class="table-col-box">
                  <span v-if="!item.notsortcol" class="sorthandle">
                    <span>⠿</span>
                  </span>
                  <span v-if="item.fieldId=='IssueKey'"><svgicon class="colicon" name="number" /></span>
                  <span v-else><svgicon class="colicon" :name="item.type" /></span>
                  <span class="col-title">{{ item.name }}</span>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <el-button v-if="!newrow" class="addrows" size="small" @click="addrows">
            <i class="el-icon-plus"></i>
            <span>创建</span>
          </el-button>
          </template>
    </el-skeleton>
          <div class="newrow-container" v-if="newrow">
            <img src="/static/img/images/icons/issuetypes/task.svg" alt="" class="newtasktype issuetypeimg">
            <input @blur="finishadd('blur')" @keydown="finishadd"  ref="newrow" v-model='newrowvalue' placeholder="请输入标题" />
          </div>
        </div>
        <div class="rightshelterbox"></div>
      </div>
    </div>
    <el-dialog title="任务详情" :visible.sync="detaildialog" width="80%" top="5vh">
        <itemdetail :itemid="detailtaskid" @close="detaildialog=false"></itemdetail>
    </el-dialog>
  </div>
</template>
<script>
import Userhead from "@/components/Userheadphoto.vue";
import tableskeleton from "@/components/skeleton/tableskeleton.vue";
import checkboxdrop from "@/components/dropbtn/checkboxdrop.vue";
import boardhead from "@/components/head/boardhead.vue";
import heightfilter from "@/components/filter/heightfilter.vue";
import sharepopup from "@/components/popup/share.vue";
import Sortable from "sortablejs";
import svgicon from '@/icon/icon.vue'
import commonapi from '@/api/commonapi'
import {getprojecttasklist,getavailablefields,
GlobalIssueListHeaderLoad,ListViewRankBefore,ListViewRankAfter} from '@/api/projectapi.js'

import researchelselect from '@/components/dropbtn/researchelselect.vue'
import choosestatus from '@/components/choosestatus.vue'
import itemdetail from "@/views/projects/detail/detail.vue"
import copylink from "@/components/copylink.vue";
import adduser from "@/components/adduser.vue";
import filteruser from '@/components/filteruser.vue'


export default {
  data() {
    return {
      detaildialog:false,
      detailtaskid:'',
      hoverrowid:null,
      statusindex:null,
      showtable: true,
      showClosedItem: false,
      newchildrenrow:null,
      newrow:false,
      newrowvalue:'',
      name: "132",
      newchildrenrowid:null,
      value1: [],
      tablecolumnchecklist:[],
      tablecolumn: [],
      options: [],
      tableData: [],
      showtablecolumncheckboxdrop:false,
      relatedid:null,
      filteroption:'',
      loading:true,
      sort:null,
      order:null
    };
  },
  watch:{
    showClosedItem(){
      this.gettask()
    }
  },
  components: {
    Userhead,
    checkboxdrop,
    boardhead,
    heightfilter,
    sharepopup,
    svgicon,
    researchelselect,
    choosestatus,
    tableskeleton,
    itemdetail,
    copylink,
    filteruser,
    adduser
  },
  created() {
    this.$store.state.showleftNavbar = false;
    this.getdata()
  },
  computed:{
    tablecolumndata(){
      return {
        name:'设置显示列',
        list:this.tablecolumn.filter((item)=>{
          return !item.notsortcol
        }).map((item)=>{
            item.label = item.name
            item.key = item.fieldId
            return item
        })
      }
    },
    tablecolumnchecked(){
       return this.tablecolumn.filter((item)=>{
         return this.tablecolumnchecklist.includes(item.name)
       })
    },
  },
  mounted() {
  },
  methods: {
    userchose(id){
      this.userfilter = id
      this.gettask()
    },
    opendetail(id){
      this.detaildialog=true
      this.detailtaskid=id
    },
    getdata(){
      this.getavailablefields().then(()=>{
        this.gettask()
      })
    },
    getchildren(parent){
      this.gettask(parent)
    },
    getavailablefields(){
      return GlobalIssueListHeaderLoad({
          projectId:this.$route.query.id
      }).then((data)=>{
          const res = data.data.issueListFields.fields.nodes
          this.tablecolumn = res
      }).then(()=>{
        this.tablecolumnchecklist = this.tablecolumn.map((item)=>{
          return item.name
        })
        this.showtablecolumncheckboxdrop = true
      })
      
    },
    filterchange(filteroption){
      this.filteroption = filteroption
      this.gettask()
    },
    gettask(parent){
      let tablesort = this.tablesort

      let filterQuery= this.filteroption 
      if(!this.showClosedItem){
        filterQuery +='\nStatusCategoryId\tneq\t3'
      }
      //默认显示未完成的

      return getprojecttasklist({
          projectId:this.$route.query.id,
          parent:parent,
          filterQuery:filterQuery,
          owningUser:this.userfilter,
          sort:this.sort,
          order:this.order
      }).then((data)=>{
          const res = data.data.list.nodes
          const tableData = []
          res.forEach((item,index)=>{
            const rowitem = {
            }
            item.fields.forEach((fields)=>{
              rowitem[fields.fieldKey] = fields
            })
            rowitem.id = item.id
            rowitem.index = index
            if(!parent){
              if(rowitem.subtasks.issues.length>0){
                rowitem.children = [{id:index}]
              }else{
                rowitem.children = []
              }
            }else{
              rowitem.parentid = parent
            }
            tableData.push(rowitem)
          })
          if(!parent){
            this.tableData = tableData
          }else{
            this.tableData.find((res)=>{return res.id==parent}).children = tableData
          }
          this.loading = false
          return tableData
          // console.log(this.tableData)
          // console.log(this.tablecolumnchecked)
      }).then(()=>{
          this.setSort();
      })
    },
    cellclick(row, column, cell, event){
      // console.log(row)
      // console.log(column)
      // console.log(cell)
      // console.log(event)
      // //if(column.canedit){
      // setTimeout(() => {
      //   this.$set(row,'edit',column.property)
      //   this.$nextTick(()=>{
      //     var dom = this.$refs.editcell[0]
      //     console.log(dom)
      //     if(dom.$attrs.reftype=='selects'){
      //       dom.$el.children[0].lastChild.focus()
      //       dom.$el.children[0].lastChild.addEventListener('blur',()=>{
      //         setTimeout(() => {
      //           if(!dom.$el.children[1].classList.contains('is-focus')){
      //           this.cellblur(row)
      //         }else{
      //           dom.$el.children[0].lastChild.focus()
      //         }
      //         },100);
      //       })
      //     }else{
      //       //dom.focus()
      //     }
      //   })
      // },200)
    },
    cellblur(row){
      setTimeout(() => {
        this.$set(row,'edit','')
      }, 100);
    },
    headercellclassname(row){
      if(row.columnIndex==0||row.columnIndex==1){
        return 'notsortcol'
      }
    },
    
    finishednewchildren(e,item){
      // console.log(item)
      if(e=='blur'){
        if(this.newchildrenrow.children.length>0){
          this.newchildrenrow.children.pop()}
       }else{
        if(e.keyCode==27){
            this.newchildrenrow.children.pop()
        }else if(e.keyCode==13){
          if(this.newchildrenrow.children[this.newchildrenrow.children.length-1].text!=''){
            //保存    
            commonapi.entitysaverecord({
              Subject:this.newchildrenrow.children[this.newchildrenrow.children.length-1].text,
              RegardingObjectId:{Id:this.$route.query.id},
              ActivityTypeCode:'4212',
              ParentActivityId:{Id:this.newchildrenrowid},
              IssueType:'10010'
            },'4200').then((res)=>{
              // this.gettask()
              this.newchildrenrow.children[this.newchildrenrow.children.length-1].newrow = false
            this.$nextTick(()=>{
              this.tableData.forEach((item)=>{
                if(item.id==this.newchildrenrowid){
                  this.addchidren(item)
                }
              })
            })
            })
          }
        }
      }
      if(this.newchildrenrow.children.length==0){
        this.tableData.forEach((item)=>{
          if(item.id==this.newchildrenrowid){
            item.notchildren=true
          }
        })
      }
    },
    expandchange(row,type){
      if(type==false){
        return
      }
      if(row.children[0].id==row.index){
       this.gettask(row.id)
      }
    },
    addchidren(item){
      this.gettask(item.id).then(()=>{
        item.notchildren = false
        const obj = {
          IssueType:{},
          Subject:{
            fieldKey: "Subject",
            textValue: "新建子任务",
            __typename: "TextField"
          },
          text:'',
          newrow:true,
          id:Math.round(Math.random()*10000),
        }
        item.children.push(obj)
        this.newchildrenrow = item
        this.newchildrenrowid = item.id
        this.$nextTick(()=>{
          this.$refs.dragTable.toggleRowExpansion(item,true)
          this.$nextTick(()=>{
             this.$refs.newbox[0].focus()
          })
        })
        });
    },
    finishadd(e){
      if(e=='blur'){
        this.newrow = false
      }
      if(e.keyCode==13){
        commonapi.entitysaverecord({
            Subject:this.newrowvalue,
            RegardingObjectId:{Id:this.$route.query.id},
            ActivityTypeCode:'4212'
        },'4200').then(()=>{
          this.gettask()
        })
        // this.tableData.push({
        //   date: "",
        //   name: this.newrowvalue,
        //   address: "",
        //   status:'',
        //   tags:[],
        //   showchildren:false,
        //   id:Math.round(Math.random()*10000),
        //   notchildren:true,
        //   children:[]
        // })
        this.newrowvalue = ''
      }
    },
    addrows(){
      this.newrow = true
      this.$nextTick(()=>{
        this.$refs.newrow.focus()
      })
    },
    setSort() {
      const rowel = this.$refs.dragTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortablerow = new Sortable(rowel, {
        ghostClass: "blue-background-class",
        handle:".sorthandle",
        setData: function (dataTransfer) {
          dataTransfer.setData("Text", "");
        },
        onStart:(evt)=>{
          const rowid = evt.item.querySelectorAll('.col-head')[0].getAttribute('rowid')
          this.$refs.dragTable.toggleRowExpansion({id:rowid},false)
        },
        onMove:(evt)=>{
          const draggedparentrowid = evt.dragged.querySelectorAll('.col-head')[0].getAttribute('parentrowid')
          const relatedparentrowid = evt.related.querySelectorAll('.col-head')[0].getAttribute('parentrowid')
          const relatedid = evt.related.querySelectorAll('.col-head')[0].getAttribute('rowid')
          this.relatedid = relatedid
          if(draggedparentrowid!=relatedparentrowid){
           return false
          }
        },
        onEnd: (evt) => {
          const rowid = evt.item.querySelectorAll('.col-head')[0].getAttribute('rowid')
          const parentrowid = evt.item.querySelectorAll('.col-head')[0].getAttribute('parentrowid')
          if(evt.newIndex>evt.oldIndex){
            ListViewRankAfter({relativeIssueId:this.relatedid,issueId:rowid}).then(()=>{
              if(parentrowid!=null){
                this.gettask(parentrowid)
              }else{
                this.gettask()
              }
            })
          }else{
            ListViewRankBefore({relativeIssueId:this.relatedid,issueId:rowid}).then(()=>{
              if(parentrowid!=null){
                this.gettask(parentrowid)
              }else{
                this.gettask()
              }
            })
          }
          // console.log(evt)
          // console.log(evt.newIndex)
          // console.log(this.tableData)
          // console.log(rowid)
          // const targetRow = this.tableData.splice(evt.oldIndex, 1)[0];
          // this.tableData.splice(evt.newIndex, 0, targetRow);
        },
      });

      const colel = this.$refs.dragTable.$el.querySelectorAll(
        ".el-table__header-wrapper > table > thead >tr"
      )[0];
      this.sortablecol = new Sortable(colel, {
        ghostClass: "blue-background-class",
        handle:".sorthandle",
        setData: function (dataTransfer) {
          dataTransfer.setData("Text", "");
          console.log(dataTransfer)
          return false
        },
        onEnd: (evt) => {
          const targetRow = this.tablecolumn.splice(evt.oldIndex, 1)[0];
          this.tablecolumn.splice(evt.newIndex, 0, targetRow);
          const tablecolumn = this.tablecolumn;
          this.tablecolumn = [];
          this.$nextTick(() => {
            this.tablecolumn = tablecolumn;
          });
        },
      });
    },
    celldatachange(val,id,filed,type,row){
      console.log(id)
      if(filed=='TimeOriginalEstimate'){
        const pattern = /^((\d+[w]\s)?|(\d+[w])\b)((\d+[d]\s)|(\d+[d])\b)?((\d+[h]\s)|(\d+[h])\b)?(\d+[m])?$/ 
        if(val&&!pattern.test(val)){
          this.$set(row,'error',true)
          return
        }else{
          this.$set(row,'error',false)
        }
      }
      let data = {
        
      }
      if(type==2){
        data[filed] = {Id:val}
      }else{
        data[filed] = val
      }
      commonapi.entitysaverecord(data,'4200',id).then(()=>{
      })
    },
    statuschange(statusId,name,statusCategoryId,item){
      this.statusindex = null
      item.name = name
      item.statusCategoryId = statusCategoryId
      item.statusId = statusId
    },
    visiblechange(val){
      if(val==false){
        this.statusindex = null
      }
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
      this.gettask()
      }
  },
};
</script>
<style  scoped>
.container >>> .blue-background-class {
  background-color: rgb(222, 235, 255) !important;
}
.toview {
  cursor: pointer;
  color: #108def;
}
.head-name {
  font-size: 22px;
  color: #172b4d;
  padding: 0px 10px 15px 5px;
}
.main-container {
  border-left: 0;
}
.container-flexbox {
  padding: 10px 40px;
}
.flexbox {
  display: flex;
}
.item-name {
  margin-left: 5px;
}
.search-container {
  display: flex;
}
.search-container > div {
  margin-right: 10px;
}
.el-select >>> .el-select__tags {
  width: fit-content !important;
  flex-wrap: nowrap !important;
  max-width: 1000px !important;
  position: relative;
  top: 4px;
  transform: none;
}
.el-select >>> .el-input {
  position: absolute;
  top: 0;
}
.el-select {
  min-width: 220px;
  padding-right: 30px;
  height: 28px;
}
.head {
  display: flex;
  justify-content: space-between;
}
.el-table >>> .el-input__inner {
  border-width: 0;
  background-color: transparent;
}
.el-table >>>.is-focus .el-input__inner{
  border-width: 2px;
}
.el-table >>>.el-input__inner:focus{
  border-width: 2px;
}
.el-table >>> .el-table__cell {
  padding: 0;
}

.el-table .col-head{
  display: inline-block;

}
.el-table>>>.el-table__expand-icon{
  float: left;
}
.el-table>>>.el-table__expand-icon i{

  font-weight: 700;
}
.el-table .col-head>div{
  display: flex;
  align-items: center;
  line-height: 20px;
  height: 20px;
}
.el-table .col-head>div>div{
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-items: center;
  cursor: pointer;
}
.el-table .col-head i{
  font-weight: 700;
}
.addchildren{
  background-color: #f2f2f2;  
  padding: 3px;
  border-radius: 4px;
  margin: 0 5px;
}
.el-table .el-select{
  width: 100%;
  min-width: 0px;
  height: 40px;
}
.el-table .el-date-editor{
  width: 100%;
  min-width: 0px;
}
.paddingbox{
  width: 36px;
}
.paddingbox.children{
  width: 60px;
}
.addrows i{
  font-weight: 700;
}
.addrows{
  margin-top: 10px;
}
.newrow-container{
  margin-top: 10px;
}
.newbox {
  width: calc(100vw - 400px);
  position: absolute;
  background-color: white;
  position: absolute;
  margin-top: -6px;
  z-index: 9;
  margin-left: -30px;
  height: 38px;
}
.newbox input{
  width: 100%;
  border: 2px solid #409EFF;
  margin-left: 80px;
  height: 38px;
  text-indent: 40px;
  outline: none;
}
.newbox .issuetypeimg{
  position: absolute;
  left: 95px;
}
.newrow-container input{
  width: 100%;
  border: 2px solid #409EFF;
  height: 40px;
  text-indent: 5px;
  outline: none;
}
.el-table>>>.head.el-table__cell{
  position: static ;
}
.table-col-box{
  font-weight: 400 !important;
  color: rgb(94, 108, 132) !important;
  display: flex;
  align-items: center;
  min-height: 16px;
}
.el-table>>>th .cell{
  display: flex !important;
}
.table-col-box i{
  margin-right: 5px;
}
.el-table>>>.cell{
  padding: 0 !important;
  line-height: 0 !important;
}
.el-table>>>.el-table__header-wrapper .cell{
  padding: 5px 5px !important;
}
th .sorthandle{
  display: none;
  margin-right: 10px;
  width: 14px;
}
th:hover .sorthandle{
  display: inline-block;
}
th:hover .typeicon{
  display: none;
}
td .sorthandle{
  display: flex;
  align-items: center;
  justify-items: center;
  margin-left: 5px;
  cursor: pointer;
  position: absolute;
  left: 0;
}
.el-table>>>.el-table__expand-icon{
  position: absolute;
  margin-left: 16px;
}
.el-table>>>.el-table__indent{
  padding-left: 8px !important;
}
.colicon{
  display: inline-block;
}
th:hover .colicon{
  display: none;
}
.col-title{
  margin-left: 5px;
}
.cell-value{
  line-height: 40px;
  padding:0 10px;
  font-size: 14px;
}
.timetemplate{
    background: rgb(244, 245, 247);
    color: rgb(66, 82, 110);
    border-radius: 3px;
    padding:5px;
}
.timetemplate{
  font-size: 14px;
}
.tagscontainer{
  display: flex;
  align-items: center;
}
.tagscontainer .tagtemplate{
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  box-sizing: border-box;
  background: rgb(244, 245, 247);
  color: rgb(66, 82, 110);
  border-radius: 3px;
  padding: 0 5px;
  display: flex;
}
.tagtemplate+.tagtemplate{
  margin-left: 5px;
}
.tagscontainer .tagtemplate>span{
  font-size: 14px;
    font-weight: normal;
    line-height: 1;
    padding: 2px 4px;
    border-radius: 3px;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.setcol>>>.el-icon-arrow-down{
  display: none;
}
.setcol>>>.checkListnumber{
  display: none;
}
.usercell{
  padding: 0 10px;
}
.el-table>>>td.el-table__cell div{
  white-space: nowrap;
}
.statuscol{
  padding:2px 10px;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  border:2px solid transparent;
  border-radius: 4px;
}
.statuscol.active{
  border-color: #409EFF;
}
.issuetypeimg{
  width: 16px;
  height: 16px;
}
.el-table>>>.el-icon-arrow-down{
  display: none;
}
.el-table>>>.el-input__icon.el-icon-arrow-up{
  display: none;
}
.prioritycontainer>>>.el-select{
  opacity: 0;
}
.container.user>>>.checkedimg{
  display: none;
}
.container.user:hover>>>.checkedimg{
  display: block;
}
.tablecolumncheckcontainer{
  position: absolute;
  right: 41px;
  z-index: 9;
  background-color: #fff;
  margin-top: 1px;
}
.tablecolumncheckcontainer>>>.dropbtn{
  padding:10px 5px;
  border-radius: 0;
  box-shadow: rgb(9 30 66 / 13%) 4px 0px 4px -4px inset;
}
.tablecolumncheckcontainer>>>svg{
  width: 20px;
  height: 20px;
}
.el-table>>>.el-date-editor .el-input__prefix{
  display: none;
}
.el-table>>>.el-date-editor:hover .el-input__prefix{
  display: block;
}
.opendetail{
  color: rgb(137, 147, 164);
}
.keytext{
  cursor: pointer;
}
.keytext:hover{
  text-decoration: underline;
}
.copylink{
    visibility: hidden;
    cursor: pointer;
    width: 18px;
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
  justify-content: space-between;
}
.copylink>>>.svgicon{
  width: 18px;
}
.usercontent{
display: flex;
align-items: center;
margin-right: 10px;
}
.usercontent .item-container+.item-container{
  margin-left: 20px;
}
.newtasktype{
  position: absolute;
  top: 14px;
  left: 42px;
}
.newrow-container{
  position: relative;
}
.newrow-container input{
  text-indent: 70px;
}
.el-input.error>>>input{
  border-color: red !important;
  border-width: 2px !important;
}
</style>